let play = document.getElementById('audio');
// let play = $('#audio')[0];

db.enablePersistence().catch(err => {
    console.log(err);
})

db.collection('chat').onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(change => {
        // console.log(change, change.doc.data());
        if (change.type === 'added') {
            renderPost(change.doc.data(), change.doc.id)
            Push.create("New message", {
                body: "You have a new message",
                icon: 'img/logo.jpeg',
                timeout: 2000,
                onClick: function() {
                    window.focus();
                    this.close();
                }
            });
            play.play();
        }
        if (change.type === 'removed') {
            removedPost(change.doc.id)
            Push.create("delete message", {
                body: "You have a new message",
                icon: 'img/logo.jpeg',
                timeout: 2000,
                onClick: function() {
                    window.focus();
                    this.close();
                }
            });
            play.play();
        }
    });
})


//adding
const form = document.querySelector('form');
form.addEventListener('submit', e => {
    e.preventDefault();

    const data = {
        message: form.message.value
    }

    db.collection('chat').add(data).catch(err => {
        console.log(err)
    })

})

//deleting
const deletePst = document.querySelector('.post');
deletePst.addEventListener('click', e => {
    console.log(e.target.tagName, e.target.getAttribute('data-id'));

    if (e.target.tagName === 'BUTTON') {
        const idButon = e.target.getAttribute('data-id');
        db.collection('chat').doc(idButon).delete();
    }

})