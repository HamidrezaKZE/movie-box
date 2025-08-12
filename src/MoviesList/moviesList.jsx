import MovieItem from "../MovieItem/movieItem";

const MoviesList = ({ movieItems }) => {
  // console.log("this is movie items" + movieItems);

  // console.log("this is matadata" + metadata.page_count);
  // {
  //   metadata.map((movie) => {
  //     console.log(movie.page_count);
  //   });
  // }
  let delay = 0.1;
  return (
    <div className="row">
      {movieItems.map((movie) => {
        delay += 0.03;
        console.log(movie.id);
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
