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
