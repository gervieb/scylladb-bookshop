import { IBook } from "types/book";
import { Typography } from "@mui/material";
import BookContent from "modules/Home/BookContent";
import styles from "modules/Home/BookList/BookList.module.css";

interface IBookList {
  books: IBook[];
  onAdd: (item: IBook) => void;
  onRemove: (id: string) => void;
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
        {books.map((book: IBook) => (
          <BookContent key={book.id} book={book} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
};

export default BookList;
