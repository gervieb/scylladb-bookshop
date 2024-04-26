import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Typography } from "@mui/material";
import axios from "src/utils/config";
import { RootState } from "src/redux/store";
import { IBook } from "src/types/book";
import { ICart } from "src/types/cart";
import PageLayout from "src/layouts/PageLayout";
import Searchbar from "src/components/Searchbar";
import BookList from "src/modules/Books/BookList";
import { setCartData, setIsCartOpen } from "src/redux/slices/cartSlice";
import Drawer from "src/components/Drawer";
import styles from "src/pages/Home/Home.module.css";
import CartContent from "src/modules/Cart/CartContent";
import { useSnackbar } from "notistack";
import Pagination from "src/components/Pagination";

const Home = () => {
  const dispatch = useDispatch();
  const { cartData, isCartOpen } = useSelector(
    (state: RootState) => state.cart
  );
  const { enqueueSnackbar } = useSnackbar();

  const [books, setBooks] = useState<IBook[]>([]);
  const [query, setQuery] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [carts, setCarts] = useState<ICart[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResult, setTotalResult] = useState(0);

  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResult / resultsPerPage);

  useEffect(() => {
    setCarts(cartData);
  }, [cartData]);

  useEffect(() => {
    if (query) {
      searchBooks();
    } else {
      fetchBooks();
    }
  }, [currentPage, query]);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`/books?page=${currentPage}`);

      if (response.data.filteredBooks) {
        setBooks(response.data.filteredBooks);
        setTotalResult(response.data.totalItems);
      }
    } catch (error: any) {
      throw new Error("Error fetching books:", error.response.data.error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchBooks = async () => {
    try {
      const response = await axios.get(
        `/books/${encodeURIComponent(query)}?page=${currentPage}`
      );
      setBooks(response.data.items);
      setTotalResult(response.data?.totalItems ?? 0);
    } catch (error: any) {
      throw new Error("No books found", error.response.data.error);
    }
  };

  const onAdd = (item: IBook) => {
    dispatch(setIsCartOpen(false));
    const exist = cartData.find((cartItem: ICart) => cartItem.id === item.id);
    if (!exist) {
      const newCartData = [...cartData, { ...item, qty: 1 }];
      dispatch(setCartData(newCartData));
      enqueueSnackbar("Item is added to cart", { variant: "success" });
    }
  };

  const onRemove = (id: string) => {
    const updatedCart = cartData.filter(
      (cartItem: ICart) => cartItem.id !== id
    );
    dispatch(setCartData(updatedCart));
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <PageLayout>
      {!isLoading ? (
        <div className={`${styles.container} ${isCartOpen && styles.open}`}>
          <div className={styles.content}>
            <Searchbar placeholder="Filter Books" onChange={handleSearch} />

            <div>
              {books?.length === 0 ? (
                <Typography mt={4}>No Results Found</Typography>
              ) : (
                <BookList books={books} onAdd={onAdd} />
              )}
            </div>
          </div>
          {carts?.length > 0 && (
            <Drawer
              isOpen={isCartOpen}
              onClose={() => dispatch(setIsCartOpen(false))}
            >
              <CartContent
                cartData={carts}
                isCartOpen={isCartOpen}
                errors={errors}
                setErrors={setErrors}
                onRemove={onRemove}
              />
            </Drawer>
          )}
        </div>
      ) : (
        <div className={styles.loadingContainer}>
          <CircularProgress />
        </div>
      )}

      {!isLoading && totalResult > resultsPerPage && (
        <div className={styles.pagination}>
          <Pagination
            count={totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        </div>
      )}
    </PageLayout>
  );
};

export default Home;
