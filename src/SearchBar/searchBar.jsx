import { useState } from "react";
import { BsSearch } from "react-icons/bs";
const SearchBar = ({ searchItems }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    searchItems(value);
  };
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={onSubmit}
      className="search flex-fill d-flex align-items-center py-2"
    >
      <div className="input-group ">
        <input
          className="form-control rounded-end ps-5 norder-success "
          type="text"
          placeholder="Search Movie's Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <BsSearch className="position-absolute top-50 translate-middle-y text-muted ms-3" />
      </div>
    </form>
  );
};
export default SearchBar;
