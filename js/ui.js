const post = document.querySelector('.post');
const renderRecipe = (data, id) => {

    const html = `
            <div class="card border-primary mt-3" data-id="${data.id}">
            <div class="card-body" style="display:flex;align-items:center;">
              <img src="img/user.png" width="100"> <p class="card-text">${data.message}</p>
            </div>
          </div>
            `;
    post.innerHTML += html;

}