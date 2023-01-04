import { useContext } from "react";
import { ArticleContext } from "../context/ArticleContext";

function useArticleContext() {
  const context = useContext(ArticleContext);
  if (!context) {
    throw Error(
      "useArticleContext must be used inside an ArticleContextProvider"
    );
  }
  return context;
}
export default useArticleContext;
