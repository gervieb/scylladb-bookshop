const axios = require("axios");
const filterBooksByMaturity = require("../helpers/filterBooksByMaturity");

const GOOGLE_BOOKS_ENDPOINT = "https://www.googleapis.com/books/v1/volumes";

async function getAll(req, res) {
  try {
    const page = req.query.page || 1;

    const response = await fetchBooks("nosql", page);
    const filteredBooks = filterBooksByMaturity(response.items);

    res
      .status(200)
      .json(
        filteredBooks ? { filteredBooks, totalItems: response.totalItems } : []
      );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getByQuery(req, res) {
  const query = req.params.query;
  const page = req.query.page || 1;

  try {
    const isISBN = /^[0-9]{10,13}$/.test(query);
    if (isISBN) {
      const isbn = `isbn:${query}`;
      let revision;

      const googleResponse = await fetchBooks(isbn, page);

      const openlibraryResponse = await axios.get(
        `https://openlibrary.org/api/books?bibkeys=${isbn}&jscmd=details&format=json`
      );

      if (openlibraryResponse.data[isbn]?.details) {
        revision = openlibraryResponse.data[isbn]?.details.revision;
      }
      const bookWithRevision = {
        items: [{ ...googleResponse.items[0], revision }],
      };

      res.status(200).json(bookWithRevision);
    } else {
      const googleResponse = await fetchBooks(`intitle:${query}`, page);

      if (!googleResponse || googleResponse.length === 0) {
        return res.status(404).json({ error: "No books found" });
      }

      res.status(200).json(googleResponse);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

async function fetchBooks(query, page) {
  const maxResults = 10;
  const startIndex = (page - 1) * maxResults;

  try {
    const response = await axios.get(GOOGLE_BOOKS_ENDPOINT, {
      params: {
        q: query,
        startIndex: startIndex,
        maxResults: maxResults,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch books: ${error.message}`);
  }
}

module.exports = { getAll, getByQuery };
