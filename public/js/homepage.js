const logOutButton = document.getElementById("logOutButton");

logOutButton.addEventListener("click", (ev) => {
  ev.preventDefault();

  // Remove user IDs on local storage
  localStorage.removeItem("name");
  localStorage.removeItem("token");

  window.location = "index.html";
});
