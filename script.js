function enviaAlerta() {
  const firstName = document.getElementById("first-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

    if (firstName === '' || email === '' || message === '') {
        alert('Por favor, completa todos los campos obligatorios.');
    } else {
        alert('Mensaje enviado con éxito.');
    }
}


// Post content
async function getPosts() {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  return data.posts;
}

function displayPosts(posts) {
  const container = document.getElementById("posts-container");
  container.className = " d-flex flex-column gap-4 container"; 

  posts.forEach((post) => {
   
    const postDiv = document.createElement("div");
    postDiv.className = "card mb-4 p-1 shadow-lg";

    const img = document.createElement("img");
    img.className = "card-img-top rounded img-custom";
    img.src = `https://api.dicebear.com/9.x/shapes/svg?seed=${post.title}`;
    img.alt = post.title;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body bg-ligth";


    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    h2.className = "card-title";

   
    const p = document.createElement("p");
    p.textContent = post.body;
    p.className = "card-text";

    const postMeta = document.createElement("div");
    postMeta.className = "d-flex justify-content-between align-items-center mt-3";


    const tagsContainer = document.createElement("div");
    tagsContainer.className = "d-flex flex-wrap";

    post.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.className = "badge bg-primary me-2"; 
      span.textContent = `#${tag}`;
      tagsContainer.appendChild(span);
    });

    const reactionsContainer = document.createElement("div");
    reactionsContainer.className = "d-flex gap-3";

    const pLike = document.createElement("span");
    pLike.className = "text-success fw-bold";
    pLike.innerHTML = `👍🏼 ${post.reactions.likes}`;

    const pDislike = document.createElement("span");
    pDislike.className = "text-danger fw-bold";
    pDislike.innerHTML = `👎🏼 ${post.reactions.dislikes}`;

    reactionsContainer.appendChild(pLike);
    reactionsContainer.appendChild(pDislike);

 
    cardBody.appendChild(h2);
    cardBody.appendChild(p);
    cardBody.appendChild(postMeta);
    postMeta.appendChild(tagsContainer);
    postMeta.appendChild(reactionsContainer);

    postDiv.appendChild(img);
    postDiv.appendChild(cardBody);
    container.appendChild(postDiv);
  });
}


getPosts()
  .then(displayPosts)
  .catch((error) => console.error("Error:", error));



