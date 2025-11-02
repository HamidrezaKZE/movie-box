import MovieItem from "../MovieItem/movieItem";

const MoviesList = ({ movieItems }) => {
  let delay = 0.1;
  return (
    <div className="row">
      {movieItems.map((movie) => {
        delay += 0.03;
        return (
          <div className="col-md-4 col-sm-6 mb-grid-gutter" key={movie.id}>
            <MovieItem {...movie} delay={delay} />
          </div>
        );
      })}
    </div>
  );
};
export default MoviesList;
