document.getElementById("logOutButton").addEventListener("click", (ev) => {
  ev.preventDefault();

  // Remove user IDs on local storage
  localStorage.removeItem("name");
  localStorage.removeItem("token");

  window.location = "index.html";
});

document.getElementById("searchJobsButton").addEventListener("click", (ev) => {
  ev.preventDefault();
  const keyword = document.getElementById("searchKeyword").value;
  if (keyword) {
    clearRows();
    hideNoResultsMessage();
    showProgressBar();
    
    fetch(`/api/homepage/getpositions/${keyword}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          showNoResultsMessage();
          hideProgressBar();
          throw new Error("HTTP status " + response.status);
        }

        return response.json();
      })
      .then((resp) => {
        if (resp.length === 0) showNoResultsMessage();
        else resp.map((position) => addRow(position));
        hideProgressBar();
      })
      .catch((err) => {
        hideProgressBar();
        console.log(err);
      });
  }
});

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [month, day, year].join("-");
}

function addRow(position) {
  const {
    type,
    url,
    created_at,
    company,
    location,
    title,
    description,
  } = position;
  const div = document.createElement("div");
  div.innerHTML = `
    <a href="${url}" target="_blank" class="list-group-item list-group-item-action" aria-current="true">
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">${title}</h5>
        <small>${formatDate(created_at)}</small>
      </div>
      <h6 class="mb-1">${company}</h5>
      <div class="mb-2" style="overflow: hidden;
        position: relative;
        height: 15em;">
        ${description.replace(/<[^>]*>?/gm, "")}
        <div style="position: absolute;
        right: 0;
        bottom: 0;
        width: 100%;
        height:8em;
        background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 100%);"></div>
      </div>
      <div class="d-flex w-100 justify-content-between">
        <small>${location}</small>
        <span class="badge bg-primary">${type}</span>
      </div>
    </a>
  `;

  document.getElementById("jobList").appendChild(div);
}

function clearRows() {
  document.getElementById("jobList").innerHTML = "";
}

function showNoResultsMessage() {
  document.getElementById("noResultsMessage").style.display = "block";
}

function hideNoResultsMessage() {
  document.getElementById("noResultsMessage").style.display = "none";
}

function showProgressBar() {
  document.getElementById("progressBar").classList.remove("d-none");
}

function hideProgressBar() {
  document.getElementById("progressBar").classList.add("d-none");
}
