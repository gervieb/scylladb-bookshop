const axios = require("axios");

class BooksController {
  async getAll(req, res) {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: "nosql",
          },
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new BooksController();
