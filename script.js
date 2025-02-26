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

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "post";

    const img = document.createElement("img");
    img.className = "image";
    img.src = `https://api.dicebear.com/9.x/shapes/svg?seed=${post.title}`;
    img.alt = post.title;

    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    h2.classList.add("title");

    const p = document.createElement("p");
    p.textContent = post.body;
    p.classList.add("post-body");

    const postMeta = document.createElement("div");
    postMeta.classList.add("post-meta");

    const tagsContainer = document.createElement("div");
    tagsContainer.classList.add("tags-container");

    post.tags.forEach((tag) => {
      const div = document.createElement("div");
      div.classList.add("tag");
      const p = document.createElement("p");
      p.innerText = `#${tag}`;
      p.classList.add("p-tag");

      div.appendChild(p);
      tagsContainer.appendChild(div);
    });

    const reactionsContainer = document.createElement("div");
    reactionsContainer.classList.add("reactions-container");

    const pLike = document.createElement("p");
    pLike.classList.add("like");
    pLike.innerText = `👍🏼 ${post.reactions.likes}`;

    const pDislike = document.createElement("p");
    pDislike.classList.add("dislike");
    pDislike.innerText = `👎🏼 ${post.reactions.dislikes}`;

    reactionsContainer.appendChild(pLike);
    reactionsContainer.appendChild(pDislike);

    postDiv.appendChild(img);
    postDiv.appendChild(h2);
    postDiv.appendChild(p);
    postDiv.appendChild(postMeta);
    postMeta.appendChild(tagsContainer);
    postMeta.appendChild(reactionsContainer)
    

    container.appendChild(postDiv);
  });
}

getPosts()
  .then(displayPosts)
  .catch((error) => console.error("Error:", error));

