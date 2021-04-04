export async function login({ email, password }) {
  return await fetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If login is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function searchJobs({ keyword }) {
  return await fetch(`/api/homepage/getpositions/${keyword}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      // If login is not successful, display error message
      if (!response.ok) {
        throw new Error("HTTP status " + response.status);
      }

      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
}
