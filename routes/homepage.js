const { Router } = require("express");
const router = Router();

const { getPositions } = require("../controllers/homepage");

router.get("/getpositions/:keyword", getPositions);

module.exports = router;
