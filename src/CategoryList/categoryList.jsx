import { useEffect, useState } from "react";
import axios from "../axios";
import Loading from "../Loading/loading";

const CategoryList = ({
  genre,
  setGenre,
  setPage,
  setSearchedValue,
  children,
  currentGenre = null,
}) => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // const [active, setActive] = useState(currentGenre ?? null);

  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/genres");
        if (mounted) {
          setCategories(data || []);
          setLoading(false);
        }
      } catch (e) {
        if (mounted) setLoading(false);
        // TODO: surface an error UI if needed
        console.error(e);
      }
    };
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  // single handler to keep page reset consistent
  const handlePick = (genreId) => {
    // setActive(genreId);
    setSearchedValue("");
    setGenre?.(genreId || null);
    setPage?.(1);
  };

  const renderContent = () => {
    if (loading) return <Loading theme="primary" />;

    return (
      <div className="category-shell">
        <nav aria-label="Movie genres" className="category-bar">
          {/* All movies */}
          <button
            type="button"
            className={`chip chip-all ${genre ? "" : "active"}`}
            onClick={() => handlePick(null)}
            disabled={genre === null ? true : false}
          >
            All Movies
          </button>

          {/* dynamic chips */}
          <div className="category-list">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip ${genre === c.id ? "active" : ""}`}
                onClick={() => handlePick(c.id)}
                disabled={c.id === genre ? true : false}
              >
                {c.name}
              </button>
            ))}
          </div>
        </nav>

        {/* keeps search bar (children) under the chips */}
        <div className="category-children">{children} </div>
      </div>
    );
  };

  return (
    <section className="container mt-n5">
      {/* remove fixed height; let content define its height */}
      <div className="d-flex align-items-stretch bg-white rounded-3 shadow-lg py-4 px-3 col-md-11 w-auto">
        {renderContent()}
      </div>
    </section>
  );
};

export default CategoryList;
