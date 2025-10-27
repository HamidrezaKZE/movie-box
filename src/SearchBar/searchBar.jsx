import { useEffect, useState, useRef } from "react";
import "./searchBar.css";
import { MdCancel } from "react-icons/md";

const SearchBar = ({
  searchItems,
  searchedValue,
  setSearchedValue,
  setGenre,
  setPage,
}) => {
  const [value, setValue] = useState("");
  const [typing, setTyping] = useState(false);
  const internalReset = useRef(false);
  const DEBOUNCE_DELAY = 400;

  useEffect(() => {
    if (internalReset.current) {
      internalReset.current = false;
      return; // prevent triggering searchItems("") after chip click
    }

    if (value.trim() === "") {
      searchItems("");
      setTyping(false);
      return;
    }

    setTyping(true);
    const timer = setTimeout(() => {
      searchItems(value);
      setTyping(false);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (searchedValue === "") {
      internalReset.current = true; // mark as programmatic reset
    }
    setValue(searchedValue || "");
  }, [searchedValue]);

  return (
    <div className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={value}
        onChange={(e) => {
          const val = e.target.value;
          setValue(val);
          setSearchedValue(val);
          // All Movies will be active when user type in search bar
          if (val.trim().length > 0) {
            setGenre(null);
            setPage(1);
          }
        }}
      />

      {/* clear button */}
      {!typing && value !== "" && (
        <button
          type="button"
          className="btn-clear"
          onClick={() => {
            setValue("");
            setSearchedValue("");
          }}
        >
          <MdCancel />
        </button>
      )}

      {/* 3 dots Loader */}
      {typing && (
        <div className="dots-loader">
          <div></div>
          <div></div>
          <div></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
