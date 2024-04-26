import { Typography } from "@mui/material";
import { IBook, TSaleAbility } from "src/types/book";
import ButtonComponent from "src/components/Button";
import styles from "src/modules/Books/BookContent/BookContent.module.css";

interface IBookContent {
  book: IBook;
  onAdd: (item: IBook) => void;
}

const BookContent = ({ book, onAdd }: IBookContent) => {
  const { volumeInfo, saleInfo, revision } = book;

  return (
    <div>
      {saleInfo?.saleability === TSaleAbility.FOR_SALE ? (
        <div className={styles.gridContainer}>
          <img
            src={volumeInfo.imageLinks.smallThumbnail}
            alt={volumeInfo.title}
          />
          <div className={styles.contentContainer}>
            <Typography variant="subtitle1" mb={1} sx={{ fontWeight: 600 }}>
              {volumeInfo.title}
            </Typography>
            <Typography variant="caption">{volumeInfo.description}</Typography>
            {revision && revision > 1 && (
              <Typography variant="subtitle2">Revision: {revision}</Typography>
            )}
            <Typography variant="subtitle2">
              Page: {volumeInfo.pageCount}
            </Typography>
            <Typography variant="subtitle2">
              Price:
              <span
                className={styles.price}
              >{` ${saleInfo?.retailPrice?.currencyCode}
        ${saleInfo?.retailPrice?.amount}`}</span>
            </Typography>
            <ButtonComponent title="Add to Cart" onClick={() => onAdd(book)} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookContent;
