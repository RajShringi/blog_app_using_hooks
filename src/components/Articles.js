import Loader from "../components/Loader";
import Article from "./Article";

function Articles({ articles, loading, error }) {
  if (loading) {
    return (
      <div className="w-[60%]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error ? (
          <p className="text-red-400 font-bold text-2xl">
            Couldn't Fetch The Articles
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }

  if (articles.length === 0) {
    return <h2 className="text-3xl font-bold my-4">No Articles Found</h2>;
  }

  return (
    <>
      {articles.map((article) => (
        <Article key={article.slug} article={article} />
      ))}
    </>
  );
}
export default Articles;
