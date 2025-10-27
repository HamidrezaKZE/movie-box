import "./movieItem.css";
import noImage from "../assets/images/noImage.png";
import { BiSolidMoviePlay } from "react-icons/bi";
const MovieItem = ({ title, poster, year, country, imdb_rating, delay }) => {
  return (
    <div
      className="card product-card h-10 border-0 shadow-sm pb-1 fade-in-horiz"
      style={{ animationDelay: delay + "s" }}
    >
      <span
        className={`badge badge-end badge-shadow ${
          imdb_rating >= 9
            ? "bg-success"
            : imdb_rating >= 8.5
            ? "bg-warning"
            : "bg-danger"
        } fs-md fw-medium`}
      >
        imdb:
        {imdb_rating}
      </span>
      <div className="poster-wrapper">
        <img
          className="card-img-top"
          src={poster === "https://moviesapi.ir/images/" ? noImage : poster}
        ></img>
      </div>
      <div className="card-body text-center pt-3 pb-4 d-flex flex-column">
        <h5 className="mb-2">
          {title?.length > 36 ? title?.slice(0, 34) + "..." : title}
        </h5>
        {/* <h5 className="mb-2">type({title})</h5> */}
        <div className="fs-ms fw-bold text-muted mb-3">{country}</div>
        <div className="fs-ms fw-bold text-muted mb-3">{year}</div>
        <button className="btn btn-outline-info btn-sm w-100 mt-auto fw-bold">
          <BiSolidMoviePlay className="fs-5 ms-3" />
          Watch now
        </button>
      </div>
    </div>
  );
};
export default MovieItem;
