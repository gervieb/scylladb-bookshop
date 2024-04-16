import { useEffect, useState } from "react";
import axios from "utils/config";
import PageLayout from "layouts/PageLayout";
import Searchbar from "components/Searchbar";
import BookList from "modules/Home/BookList";

const Home = () => {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("/books");
      setBooks(response.data.items);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <PageLayout>
      <Searchbar placeholder="Filter Books" />
      <BookList books={books} />
    </PageLayout>
  );
};

export default Home;
