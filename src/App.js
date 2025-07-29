import { useEffect, useState } from "react";
import "./App.css";
import CategoryList from "./CategoryList/categoryList";
import Header from "./Header/header";
import axios from "./axios";
import Loading from "./Loading/loading";
import MoviesList from "./MoviesList/moviesList";
import PageButton from "./PageButton/pageButton";
import SearchBar from "./SearchBar/searchBar";
import notFound from "./assets/images/404.png";
// import PageButton from "./PageButton/pageButton";

function App() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [moviesItems, setMoviesItems] = useState([]);
  const [metadata, setMetadata] = useState([]);
  const [genre, setGenre] = useState();
  const fetchData = async (genreId = null) => {
    setLoading(true);
    const response = await axios.get(
      genreId
        ? `/genres/${genreId}/movies?page=${page}`
        : `/movies?page= ${page}`
    );
    setLoading(false);
    setMoviesItems(response.data.data);
    setMetadata(response.data.metadata);
    // console.log(
    //   "response data " + response.data.data.map((res) => console.log(res))
    // );
    // console.log(
    //   "meta data2 " + response.data.metadata
    // );
    // console.log("meta data " + response.data.metadata);
    // response.data.metadata.map(each=>console.log("meta data2 " + each))
  };
  const handleClick = (event) => {
    let newPage = page + event;
    if (newPage !== 0 && newPage <= metadata.page_count) {
      setPage(newPage);
    }
    // fetchData(page);
    // console.log(`rendered page: ${newPage}`);
  };

  useEffect(() => {
    fetchData(genre);
  }, [page, genre]);
  const renderContent = () => {
    if (loading) {
      return <Loading theme="dark" />;
    }
    if (moviesItems.length === 0) {
      return (
        <>
          <div className="alert alert-warning text-center">
            Sorry, no results found for your search.
          </div>
          <img className="mx-auto mt-5 d-block" src={notFound} />
        </>
      );
    }
    // console.log(moviesItems);
    return <MoviesList movieItems={moviesItems} metadata={metadata} />;
  };
  //search proccess
  const searchItems = async (name) => {
    setLoading(true);
    const response = await axios.get(
      `/movies?q=${name ? name : ""}&page={page}`
    );
    setLoading(false);
    setMoviesItems(response.data.data);
  };

  // now not using
  const filterItems = (genreId) => {
    fetchData(genreId);
  };
  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <center>
        <CategoryList
          filteredItems={filterItems}
          setGenre={setGenre}
          setPage={setPage}
          // searchItems={searchItems}
        >
          <SearchBar searchItems={searchItems} />
        </CategoryList>
      </center>
      <div className="container mt-4">{renderContent()}</div>
      <center>
        {/* <button onClick={handleClick}>previous page</button> */}
        {/* <button onClick={()=>{handleClick(1)}}> next page</button> */}
        <PageButton
          action="first page"
          changer={handleClick}
          thisPage={page}
          lastPage={metadata.page_count}
        />
        <PageButton
          action="previous page"
          changer={handleClick}
          thisPage={page}
          lastPage={metadata.page_count}
        />
        <PageButton
          action="next page"
          changer={handleClick}
          thisPage={page}
          lastPage={metadata.page_count}
        />
        <PageButton
          action="last page"
          changer={handleClick}
          thisPage={page}
          lastPage={metadata.page_count}
        />
      </center>
      <center>
        {metadata.current_page} of {metadata.page_count}
      </center>
    </div>
  );
}

export default App;
