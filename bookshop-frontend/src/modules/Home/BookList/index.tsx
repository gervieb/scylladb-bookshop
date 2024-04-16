import { Typography } from "@mui/material";
import { IBook } from "types/Book";
import BookContent from "components/BookContent";
import styles from "modules/Home/BookList/BookList.module.css";

interface IBookList {
  books: IBook[];
}

const BookList = ({ books }: IBookList) => {
  return (
    <div>
      <Typography variant="h6" my={4}>
        Book Results
      </Typography>
      <div className={styles.booksContainer}>
        {books.map((book: IBook) => (
          <BookContent key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
