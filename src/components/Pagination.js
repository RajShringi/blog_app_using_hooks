function Pagination({
  articlesCount,
  articlePerPage,
  activePage,
  setActivePage,
}) {
  let pages = [];
  for (let i = 1; i <= Math.ceil(articlesCount / articlePerPage); i++) {
    pages.push(i);
  }

  return (
    <ul className="grid grid-cols-12 gap-1">
      {pages.map((page, index) => {
        return (
          <li
            onClick={() => setActivePage(page)}
            key={index}
            className={`border p-1 text-center rounded-lg cursor-pointer ${
              activePage === page ? "bg-indigo-400 text-white" : "bg-white"
            }`}
          >
            {page}
          </li>
        );
      })}
    </ul>
  );
}
export default Pagination;
