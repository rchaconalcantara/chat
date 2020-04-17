let menu = $('#menu');
let start = document.getElementById('start');
let stop = $('#stop');
let play = $('#audio')[0];
let running = false;

let recognition = new webkitSpeechRecognition() || new SpeechRecognition;
recognition.lang = 'es-ES';
recognition.continuou = true;
recognition.interimResults = false;

//estados de la grabacion
recognition.onstart = function() {
    running = true;
    // document.getElementsByName('body').style.backgroundColor = '#C0392B';
    start.classList.add('recording');

};

recognition.onend = function() {
    running = false;
    // document.getElementsByName('body').style.backgroundColor = '#AED6F1';
    start.classList.remove('recording');
    play.play();
    start.classList.add('bounceIn');
    setTimeout(function() {
        start.classList.remove('bounceIn');
    }, 100);
};

recognition.onerror = function(event) {
    running = false;
    // document.getElementsByName('body').style.backgroundColor = '#C0392B';
};

/////////////////funcion de grabar main////////////////////////////
recognition.onresult = (event) => {

    const results = event.results;
    let option = results[results.length - 1][0].transcript;
    console.log(option);


    if (option.indexOf('menú') > -1 || option.indexOf('opciones') > -1) {
        location.href = '#menu';
    } else if (option.indexOf('home') > -1 || option.indexOf('inicio') > -1) {
        location.href = '/tell-me/index.html';
    } else if (option.indexOf('noticias') > -1 || option.indexOf('post') > -1) {
        location.href = '/tell-me/pages/post.html';
    } else if (option.indexOf('personas') > -1 || option.indexOf('gente nueva') > -1) {
        location.href = '#people';
    } else if (option.indexOf('nuevo contenido') > -1 || option.indexOf('cotenido') > -1) {
        location.href = '#post';
    } else if (option.indexOf('configuración') > -1 || option.indexOf('ajustes') > -1) {
        location.href = '/tell-me/pages/config.html';
    } else if (option.indexOf('anuncios') > -1 || option.indexOf('anuncio') > -1) {
        location.href = '/tell-me/pages/notify.html';
    } else if (option.indexOf('basura') > -1 || option.indexOf('desechos') > -1) {
        location.href = '/tell-me/pages/trach.html';
    }


}

//escuchando audio
start.addEventListener('click', function() {

    play.play();

    start.classList.add('bounceIn');
    setTimeout(function() {
        start.classList.remove('bounceIn');
    }, 100);

    if (running === false) {
        recognition.start();
    }

})

$('#go_back').click(function(e) {
    // start.style.display = "block";
    // menu.style.display = "none";
    // $('#go_menu').style.display = "block";
})

$('#go_menu').click(function(e) {
    // start.style.display = "none";
    // menu.style.display = "block";
    // $('#go_menu').style.display = "none";
})