import { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "../Loading/loading";
import SearchBar from "../SearchBar/searchBar";

const CategoryList = ({ filteredItems, setGenre, setPage }) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get("/genres");
      setCategories(response.data);
      setLoading(false);
    };
    fetchCategories();
  }, []);
  const renderContent = () => {
    if (loading) {
      return <Loading theme={"primary"} />;
    }
    return (
      <div className="ps-3 w-100  align-items-center justify-content-between ">
        <ul className="nav d-flex">
          <li
            className="nav-item"
            onClick={() => {
              // filteredItems();
              setGenre();
              setPage(1);
            }}
          >
            <a className="nav-link" href="#">
              All Movies
            </a>
          </li>
          {categories.map((category) => (
            <li
              className="nav-item "
              key={category.id}
              onClick={() => {
                // filteredItems(category.id);
                setGenre(category.id);
                setPage(1);
              }}
            >
              <a className="nav-link" href="#">
                {category.name}
              </a>
            </li>
          ))}
        </ul>
        <SearchBar></SearchBar>
      </div>
    );
  };
  return (
    <nav className="container mt-n5">
      <div
        className="d-flex align-items-center bg-white rounded-3 shadow-lg py-4 col-md-11 space-between w-100 "
        style={{ height: 150 }}
      >
        {renderContent()}
      </div>
    </nav>
  );
};
export default CategoryList;
