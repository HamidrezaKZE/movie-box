import { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "../Loading/loading";
import SearchBar from "../SearchBar/searchBar";

const CategoryList = ({ filteredItems, setGenre, setPage, children }) => {
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
      <div className="px-2 pt-2 w-100 ">
        <div className="category-container ">
          <center
            className="nav-item "
            onClick={() => {
              setGenre();
              setPage(1);
            }}
          >
            <a href="#">All Movies</a>
          </center>
          {categories.map((category) => (
            <center
              className="nav-item"
              key={category.id}
              onClick={() => {
                setGenre(category.id);
                setPage(1);
              }}
              // style={{backgroundColor:{category.id===Gener?"blue":"black"}}}
            >
              <a href="#">{category.name}</a>
            </center>
          ))}
        </div>
        {children}
        {/* <SearchBar className="search-bar" /> */}
      </div>
    );
  };

  return (
    <nav className="container mt-n5">
      <div
        className="d-flex align-items-center bg-white rounded-3 shadow-lg py-4 col-md-11 space-between w-auto"
        style={{ height: 160 }}
      >
        {renderContent()}
      </div>
    </nav>
  );
};

export default CategoryList;
