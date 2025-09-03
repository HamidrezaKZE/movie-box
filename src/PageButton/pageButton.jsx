const PageButton = ({ action, changer, thisPage, lastPage }) => {
  var pageNumber;
  switch (action) {
    case "next page":
      pageNumber = +1;
      break;
    case "previous page":
      pageNumber = -1;
      break;
    case "first page":
      pageNumber = -thisPage + 1;
      break;
    case "last page":
      pageNumber = lastPage - thisPage;
      break;
    default:
      pageNumber = 0;
      break;
  }
  return (
    <button
      className="rounded-3 "
      onClick={() => {
        changer(pageNumber);
      }}
    >
      {action}
    </button>
  );
};

export default PageButton;
