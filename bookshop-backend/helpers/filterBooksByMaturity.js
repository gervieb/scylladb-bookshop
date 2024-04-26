function filterBooksByMaturity(books) {
  if (!books) {
    return [];
  }

  return books.filter(
    (book) => book.volumeInfo && book.volumeInfo.maturityRating === "NOT_MATURE"
  );
}

module.exports = filterBooksByMaturity;
