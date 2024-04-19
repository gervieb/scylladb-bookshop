import { Typography } from "@mui/material";
import { IBook, TSaleAbility } from "types/book";
import Button from "components/Button";
import styles from "modules/Home/BookContent/BookContent.module.css";

interface IBookContent {
  book: IBook;
  onAdd: (item: IBook) => void;
}

const BookContent = ({ book, onAdd }: IBookContent) => {
  const { volumeInfo, saleInfo } = book;

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
            <Button
              title="Add to Cart"
              sx={{
                backgroundColor: "#627254",
                border: "1px solid #627254",
                color: "#fff",
                fontSize: "12px",
                fontWeight: 600,
                width: "100%",
                cursor: "pointer",
              }}
              onClick={() => onAdd(book)}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookContent;
