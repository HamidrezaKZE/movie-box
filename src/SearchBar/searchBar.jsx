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
  const firstRender = useRef(true);
  const internalReset = useRef(false);
  const DEBOUNCE_DELAY = 400;

  // handle debounced search input
  useEffect(() => {
    // avoid triggering on initial mount
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    // skip immediate trigger after programmatic reset
    if (internalReset.current) {
      if (value.trim().length > 0) internalReset.current = false;
      else return;
    }

    // empty value → show all movies
    if (value.trim() === "") {
      searchItems("");
      setTyping(false);
      return;
    }

    // debounce user input
    setTyping(true);
    const timer = setTimeout(() => {
      searchItems(value);
      setTyping(false);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [value]);

  // sync external search value with internal input
  useEffect(() => {
    if (searchedValue === "") internalReset.current = true;
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

          // reset filters when user starts searching
          if (val.trim().length > 0) {
            setGenre(null);
            setPage(1);
          }
        }}
      />

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
