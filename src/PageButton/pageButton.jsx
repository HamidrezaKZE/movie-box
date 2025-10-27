import "./pageButton.css";

const PageButton = ({ type, currentPage, lastPage, onChange }) => {
  const getTargetPage = () => {
    switch (type) {
      case "next":
        return currentPage + 1;
      case "previous":
        return currentPage - 1;
      case "first":
        return 1;
      case "last":
        return lastPage;
      default:
        return currentPage;
    }
  };

  const isDisabled =
    (type === "previous" || type === "first") && currentPage === 1 ||
    (type === "next" || type === "last") && currentPage === lastPage;

  return (
    <button
      className="page-btn"
      onClick={() => !isDisabled && onChange(getTargetPage())}
      disabled={isDisabled}
    >
      {type === "first" && "First"}
      {type === "previous" && "Previous"}
      {type === "next" && "Next"}
      {type === "last" && "Last"}
    </button>
  );
};

export default PageButton;
