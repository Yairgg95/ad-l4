function enviaAlerta() {
  const firstName = document.getElementById("first-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (firstName === "" || email === "" || message === "") {
    alert("Por favor, completa todos los campos obligatorios.");
  } else {
    alert("Mensaje enviado con éxito.");
  }
}

// Post content
async function getPosts() {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  return data.posts;
}

async function getQuotes() {
  const response = await fetch("https://dummyjson.com/quotes");
  const data = await response.json();
  return data.quotes;
}

function displayPosts(posts) {
  const container = document.getElementById("posts-container");
  container.className = "d-flex flex-column gap-4 container";

  posts.forEach((post) => {
    const postDiv = document.createElement("div");
    postDiv.className = "card mb-4 p-1 shadow-lg";

    const img = document.createElement("img");
    img.className = "card-img-top rounded img-custom";
    img.src = `https://api.dicebear.com/9.x/shapes/svg?seed=${post.title}`;
    img.alt = post.title;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body bg-light";

    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    h2.className = "card-title";

    const p = document.createElement("p");
    p.textContent = post.body;
    p.className = "card-text";

    const postMeta = document.createElement("div");
    postMeta.className =
      "d-flex justify-content-between align-items-center mt-3";

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

    postMeta.appendChild(tagsContainer);
    postMeta.appendChild(reactionsContainer);

    cardBody.appendChild(h2);
    cardBody.appendChild(p);
    cardBody.appendChild(postMeta);

    postDiv.appendChild(img);
    postDiv.appendChild(cardBody);
    container.appendChild(postDiv);
  });
}

function displayAsidePosts(posts) {
  const asideLeft = document.querySelector(".aside-left ul");

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.classList.add("rounded", "border", "p-2", "mb-2");

    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = "#";
    a.textContent = post.title;
    a.classList.add("d-block", "text-decoration-none", "text-dark", "fw-bold");

    li.appendChild(a);
    div.appendChild(li);
    asideLeft.appendChild(div);
  });
}

function displayAsideQuotes(quotes) {
  const asideRight = document.querySelector(".aside-right ul");

  quotes.forEach((quote) => {

    const div = document.createElement("div");
    div.classList.add("rounded", "border", "p-2", "mb-2");

    const li = document.createElement("li");

    const a = document.createElement("a");
    a.href = "#";
    a.textContent = quote.quote;
    a.classList.add(
      "d-block",
      "text-decoration-none",
      "text-dark",
      "fst-italic"
    );

    li.appendChild(a);
    div.appendChild(li);
    asideRight.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const posts = await getPosts();
    const quotes = await getQuotes();

    displayPosts(posts);
    displayAsidePosts(posts.slice(0, 20));
    displayAsideQuotes(quotes);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
});
