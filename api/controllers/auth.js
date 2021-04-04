const { response } = require("express");

const login = async (req, res = response) => {
  const { email, password } = req.body;

  // Ideally search the user in a database,
  // throw an error if not found.
  if (password !== "1234") {
    return res.status(400).json({
      msg: "User / Password are incorrect",
    });
  }

  res.json({
    name: "Test User",
    token: "A JWT token to keep the user logged in.",
    msg: "Successful login",
  });
};

module.exports = {
  login,
};
