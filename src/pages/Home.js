import { useEffect, useState } from "react";
import Articles from "../components/Articles";
import Feed from "../components/Feed";
import Hero from "../components/Hero";
import Loader from "../components/Loader";
import Pagination from "../components/Pagination";
import Tags from "../components/Tags";
import useUserContext from "../hooks/useUserContext";
import { articleURL, feedURL } from "../utils/constant";

function Home() {
  const [articles, setArticles] = useState(null);
  const [articlesCount, setArticlesCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { isLoggedIn, user } = useUserContext();
  const [acitveTab, setActiveTab] = useState(isLoggedIn ? "YOUR_FEED" : null);

  const articlePerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const offset = (activePage - 1) * articlePerPage;
      let res;
      setLoading(true);
      try {
        if (acitveTab === "YOUR_FEED") {
          res = await fetch(
            feedURL + `/?limit=${articlePerPage}&offset=${offset}`,
            { method: "GET", headers: { authorization: `Token ${user.token}` } }
          );
        } else {
          res = await fetch(
            articleURL +
              `/?limit=${articlePerPage}&offset=${offset}` +
              (acitveTab && `&tag=${acitveTab}`)
          );
        }
        if (!res.ok) {
          throw new Error("error");
        }
        const json = await res.json();
        setArticles(json.articles);
        setArticlesCount(json.articlesCount);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [activePage, acitveTab]);

  const changeActiveTab = (tab) => {
    setActivePage(1);
    setActiveTab(tab);
  };

  if (!articles) {
    return <Loader />;
  }

  return (
    <>
      <Hero />

      <Feed acitveTab={acitveTab} changeActiveTab={changeActiveTab} />
      <div className="container mx-auto flex justify-between items-start my-4">
        <div className="w-[60%]">
          <Articles articles={articles} loading={loading} error={error} />
          <Pagination
            articlesCount={articlesCount}
            articlePerPage={articlePerPage}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
        <Tags setActiveTab={setActiveTab} setActivePage={setActivePage} />
      </div>
    </>
  );
}
export default Home;
