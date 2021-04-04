const fetch = require("cross-fetch");
const { response } = require("express");
const GITHUB_URL = "https://jobs.github.com/positions.json";

const getPositions = async (req, res = response) => {
  const { keyword } = req.params;

  fetch(`${GITHUB_URL}?description=${keyword}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return res.status(400).json({
          msg: "API error",
        });
      }

      return response.json();
    })
    .then((resp) => {
      res.json(resp);
    })
    .catch((err) => {
      throw new Error("HTTP status " + response.status);
    });
};

module.exports = {
  getPositions,
};
