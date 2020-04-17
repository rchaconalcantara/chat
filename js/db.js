let play = document.getElementById('audio');
// let play = $('#audio')[0];

db.enablePersistence().catch(err => {
    console.log(err);
})

db.collection('chat').orderBy('message').get().then((snapshot) => {

    snapshot.docChanges().forEach(change => {
        // console.log(change, change.doc.data());
        if (change.type === 'added') {
            renderRecipe(change.doc.data(), change.doc.id)

            play.play();

            Push.create("New message", {
                body: "You have a new message",
                icon: 'img/logo.jpeg',
                timeout: 2000,
                onClick: function() {
                    window.focus();
                    this.close();
                }
            });

        }
    });

})

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