const express = require("express");
const router = express.Router();
const { getAll, getByQuery } = require("../controllers/booksController");

router.get("/", getAll);
router.get("/:query", getByQuery);

module.exports = router;
