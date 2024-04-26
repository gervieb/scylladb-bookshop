import { Typography } from "@mui/material";
import { IBook } from "src/types/book";
import BookContent from "src/modules/Books/BookContent";
import styles from "src/modules/Books/BookList/BookList.module.css";

interface IBookList {
  books: IBook[];
  onAdd: (item: IBook) => void;
}

interface IBookList {
  books: IBook[];
}

const BookList = ({ books, onAdd }: IBookList) => {
  return (
    <div>
      <Typography variant="h6" my={4}>
        Book Results
      </Typography>
      <div className={styles.booksContainer}>
        {books?.map((book: IBook, index: number) => (
          <BookContent key={`${book.id}-${index}`} book={book} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
