import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./CategoryList/categoryList";
import Header from "./Header/header";
import useAxios from "./useAxios";
import Loading from "./Loading/loading";
import MoviesList from "./MoviesList/moviesList";
import PageButton from "./PageButton/pageButton";
import SearchBar from "./SearchBar/searchBar";
import notFound from "./assets/images/404.png";

function App() {
  const [page, setPage] = useState(1);
  const [moviesItems, setMoviesItems] = useState([]);
  const [metadata, setMetadata] = useState({ current_page: 1, page_count: 1 });
  const [genre, setGenre] = useState();
  const [searchedValue, setSearchedValue] = useState("");

  const { fetchData, loading, error } = useAxios();

  const fetchMovies = async (options = {}) => {
    const { genreId = null, query = "", newPage = page } = options;

    let url;
    if (query) {
      url = `/movies?q=${query}&page=${newPage}`;
    } else if (genreId) {
      url = `/genres/${genreId}/movies?page=${newPage}`;
    } else {
      url = `/movies?page=${newPage}`;
    }

    const data = await fetchData(url);

    if (data) {
      setMoviesItems(data.data);
      setMetadata(data.metadata);
    }
  };

  useEffect(() => {
    // ✅ block parent fetch when user is searching
    if (searchedValue.trim().length > 0) return;

    fetchMovies({ genreId: genre, newPage: page });
  }, [page, genre]);

  const renderContent = () => {
    if (loading) return <Loading theme="dark" />;
    if (error)
      return <div className="alert alert-danger text-center my-5">{error}</div>;
    if (moviesItems.length === 0)
      return (
        <>
          <div className="alert alert-warning text-center">
            Sorry, no results found for your search.
          </div>
          <img
            className="mx-auto mt-5 d-block fade-in-horiz"
            src={notFound}
            alt="Not Found"
          />
        </>
      );
    return <MoviesList movieItems={moviesItems} metadata={metadata} />;
  };

  return (
    <div className="wrapper bg-faded-dark">
      <Header />
      <main className="content">
        <center>
          <CategoryList
            genre={genre}
            setGenre={setGenre}
            setPage={setPage}
            setSearchedValue={setSearchedValue}
          >
            <SearchBar
              searchItems={(name) => fetchMovies({ query: name, newPage: 1 })}
              searchedValue={searchedValue}
              setSearchedValue={setSearchedValue}
              setGenre={setGenre}
              setPage={setPage}
            />
          </CategoryList>
        </center>

        <div className="container mt-4">{renderContent()}</div>
      </main>

      <footer className="pagination-footer">
        <div className="pagination-bar">
          <PageButton
            type="first"
            currentPage={page}
            lastPage={metadata.page_count}
            onChange={setPage}
          />
          <PageButton
            type="previous"
            currentPage={page}
            lastPage={metadata.page_count}
            onChange={setPage}
          />
          <span className="page-indicator">
            Page <strong>{metadata.current_page}</strong> of{" "}
            {metadata.page_count}
          </span>
          <PageButton
            type="next"
            currentPage={page}
            lastPage={metadata.page_count}
            onChange={setPage}
          />
          <PageButton
            type="last"
            currentPage={page}
            lastPage={metadata.page_count}
            onChange={setPage}
          />
        </div>
      </footer>
    </div>
  );
}

export default App;
