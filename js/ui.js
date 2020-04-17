const post = document.querySelector('.post');
const renderRecipe = (data, id) => {

    const html = `
            <div class="card border-primary mt-3" data-id="${data.id}">
            <div class="card-body" style="display:flex;align-items:center;justify-content: space-between;">
              <img src="img/user.png" width="100"> 
              <p class="card-text">${data.message}</p>
              <button type="submit" class="btn btn-danger mb-2" data-id="${data.id}">Delete</button>
            </div>
          </div>
            `;
    post.innerHTML += html;

}