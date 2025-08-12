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
  const [searchedValueLength, setSearchedValueLength] = useState(0);
  const [searchedValue, setSearchedValue] = useState();
  // const [searchValue, setSearchValue] = useState("");
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
  const fetchOrkideh = async () => {
    const response2 = await fetch(
      "https://opium.feeja.ir/api/v1/branches/chalus/menu/categories",
      {
        "Content-Type": "application/json",
      }
    );
    const result = response2.json();
    console.log(result);
  };

  useEffect(() => {
    fetchOrkideh();
  }, []);
  const handleClick = (event) => {
    let newPage = page + event;
    if (searchedValueLength) {
      searchItems(searchedValue, newPage);
    } else {
      if (newPage !== 0 && newPage <= metadata.page_count) {
        setPage(newPage);
      }
    }
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
          <div className="alert alert-warning text-center ">
            Sorry, no results found for your search.
          </div>
          <img className="mx-auto mt-5 d-block fade-in-horiz" src={notFound} />
        </>
      );
    }
    // console.log(moviesItems);
    return <MoviesList movieItems={moviesItems} metadata={metadata} />;
  };
  // search proccess
  const searchItems = async (name, newPage) => {
    console.log("🚀 ~ searchItems ~ thisPage:", newPage);
    try {
      if (name) {
        setLoading(true);

        const response = await axios.get(`/movies?q=${name}&page=${newPage}`);
        setMoviesItems(response.data.data);
        setMetadata(response.data.metadata);
      } else {
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  // not using now
  // const filterItems = (genreId) => {
  //   fetchData(genreId);
  // };
  return (
    <div className="wrapper bg-faded-dark">
      <Header></Header>
      <center>
        <CategoryList
          // filteredItems={filterItems}
          setGenre={setGenre}
          setPage={setPage}
        >
          <SearchBar
            searchItems={searchItems}
            searchedValue={setSearchedValue}
            searchedValueLength={setSearchedValueLength}
            page={setPage}
            // searchValue={searchValue}
            // setSearchValue={setSearchValue}
          />
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
          searchedValueLength={searchedValueLength}
        />
        <PageButton
          action="previous page"
          changer={handleClick}
          thisPage={page}
          lastPage={metadata.page_count}
          searchedValueLength={searchedValueLength}
        />
        <PageButton
          action="next page"
          changer={handleClick}
          thisPage={page}
          lastPage={metadata.page_count}
          searchedValueLength={searchedValueLength}
        />
        <PageButton
          action="last page"
          changer={handleClick}
          thisPage={page}
          lastPage={metadata.page_count}
          searchedValueLength={searchedValueLength}
        />
      </center>
      <center>
        {metadata.current_page} of {metadata.page_count}
      </center>
    </div>
  );
}

export default App;
