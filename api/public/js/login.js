window.onload = function () {
  if (localStorage.getItem("token")) window.location = "homepage.html";
};

const form = document.querySelector("form");
form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  const email = document.getElementById("inputEmail").value;
  const password = document.getElementById("inputPassword").value;

  const formData = { email, password };

  fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If login is not successful, display error message
      if (!response.ok) {
        document.getElementById("errorMessage").style.display = 'block';
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .then(({ name, token }) => {
      // Save user IDs on local storage
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);

      window.location = "homepage.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
