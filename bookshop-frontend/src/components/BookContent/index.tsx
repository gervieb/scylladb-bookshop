import { Typography } from "@mui/material";
import { IBook, TSaleAbility } from "types/Book";
import Button from "components/Button";
import styles from "components/BookContent/BookContent.module.css";

interface IBookContent {
  book: IBook;
}

const BookContent = ({ book }: IBookContent) => {
  const { volumeInfo, saleInfo } = book;

  const onAdd = (id: string) => {};

  return (
    <div>
      {saleInfo?.saleability === TSaleAbility.FOR_SALE ? (
        <div className={styles.flexContainer}>
          <img
            src={volumeInfo.imageLinks.smallThumbnail}
            alt={volumeInfo.title}
          />
          <div className={styles.contentContainer}>
            <Typography variant="subtitle1" mb={1}>
              {volumeInfo.title}
            </Typography>
            <Typography variant="caption">{volumeInfo.description}</Typography>
            <Typography variant="subtitle2">
              Page: {volumeInfo.pageCount}
            </Typography>
            <Typography variant="subtitle2">
              Price:
              {` ${saleInfo?.retailPrice?.currencyCode}
        ${saleInfo?.retailPrice?.amount}`}
            </Typography>
            <Button title="Add to Cart" onClick={() => onAdd(book.id)} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookContent;
