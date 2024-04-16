const express = require("express"),
  router = express.Router(),
  controller = require("../controllers/booksController");

router.get("/", controller.getAll);

module.exports = router;
