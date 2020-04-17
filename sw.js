"use strict";

function isFunction(obj) { return obj && {}.toString.call(obj) === "[object Function]" }

function runFunctionString(funcStr) { if (funcStr.trim().length > 0) { var func = new Function(funcStr); if (isFunction(func)) { func() } } }
self.addEventListener("message", function(event) { self.client = event.source });
self.onnotificationclose = function(event) {
    runFunctionString(event.notification.data.onClose);
    self.client.postMessage(JSON.stringify({ id: event.notification.data.id, action: "close" }))
};
self.onnotificationclick = function(event) {
    var link, origin, href;
    if (typeof event.notification.data.link !== "undefined" && event.notification.data.link !== null) {
        origin = event.notification.data.origin;
        link = event.notification.data.link;
        href = origin.substring(0, origin.indexOf("/", 8)) + "/";
        if (link[0] === "/") { link = link.length > 1 ? link.substring(1, link.length) : "" }
        event.notification.close();
        event.waitUntil(clients.matchAll({ type: "window" }).then(function(clientList) {
            var client, full_url;
            for (var i = 0; i < clientList.length; i++) {
                client = clientList[i];
                full_url = href + link;
                if (full_url[full_url.length - 1] !== "/" && client.url[client.url.length - 1] === "/") { full_url += "/" }
                if (client.url === full_url && "focus" in client) { return client.focus() }
            }
            if (clients.openWindow) { return clients.openWindow("/" + link) }
        }).catch(function(error) { throw new Error("A ServiceWorker error occurred: " + error.message) }))
    }
    runFunctionString(event.notification.data.onClick)
};


const cacheStatic = 'cacheStatics-v2';
const cacheDynamic = 'cacheDynamic-v2';
const assets = [
    '/chat/index.html',
    '/chat/js/app.js',
    '/chat/js/main.js',
    '/chat/js/jquery.min.js',
    '/chat/css/style.css',
    '/chat/css/animate.css',
    '/chat/css/bootstrap.min.css',
    '/chat/img/logo.jpeg',
    '/chat/img/loading.gif',
    '/chat/songs/click.wav',
]


self.addEventListener('install', event => {
    const cacheProm = caches.open(cacheStatic).then(cache => {
        return cache.addAll(assets)
    })
    event.waitUntil(cacheProm)
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== cacheStatic && key !== cacheDynamic)
                .map(key => caches.delete(key))
            )
        })
    )
});

self.addEventListener('fetch', event => {

    if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
        event.respondWith(
            caches.match(event.request).then(cache => {
                return cache || fetch(event.request).then(fetchRes => {
                    return caches.open(cacheDynamic).then(cache => {
                        cache.put(event.request.url, fetchRes.clone());
                        return fetchRes;
                    });
                });
            }).catch(() => {
                if (event.request.url.indexOf('.html') > -1) {
                    caches.match('/chat/pages/ups.html')
                }
            })
        )
    }

})