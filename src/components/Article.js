import moment from "moment";
import { BsEmojiSmile } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { useState } from "react";
import { articleURL } from "../utils/constant";

function Article(props) {
  const [article, setArticle] = useState(props.article);
  return (
    <div className="my-4 bg-white p-4 shadow-sm hover:shadow-md rounded-lg border border-indigo-50">
      {/* article Header */}
      <ArticleHeader article={article} setArticle={setArticle} />
      <ArticleDesc article={article} />
    </div>
  );
}
export default Article;

function ArticleHeader({ article, setArticle }) {
  const { user } = useUserContext();

  const handleLike = async () => {
    try {
      let res, data;
      if (!article.favorited) {
        res = await fetch(`${articleURL}/${article.slug}/favorite`, {
          method: "POST",
          headers: {
            authorization: `Token ${user.token}`,
          },
        });
      } else {
        res = await fetch(`${articleURL}/${article.slug}/favorite`, {
          method: "DELETE",
          headers: {
            authorization: `Token ${user.token}`,
          },
        });
      }
      if (!res.ok) {
        const { errors } = await res.json();
        throw errors;
      }
      data = await res.json();

      setArticle(data.article);
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex justify-between items-center">
        {article.author.image ? (
          <Link to={`/profile/${article.author.username}`}>
            <img
              className="h-10 w-10 object-cover rounded-full border-2 border-indigo-400 mr-4"
              src={article.author.image}
              alt={article.author.username}
            />
          </Link>
        ) : (
          <BsEmojiSmile className="h-10 w-10 text-indigo-400 mr-4" />
        )}
        <div>
          <Link to={`/profile/${article.author.username}`}>
            <p className="text-sm text-indigo-400">{article.author.username}</p>
          </Link>
          <p className="text-xs">
            {moment(article.createdAt).format("MMMM Do YYYY")}
          </p>
        </div>
      </div>

      {!user ? (
        ""
      ) : (
        <p
          onClick={handleLike}
          className="flex border p-1 rounded-md items-center space-x-2 cursor-pointer transition-all"
        >
          <span>{article.favoritesCount}</span>
          <AiFillHeart
            className={`${
              article.favoritesCount > 0 ? "text-rose-400" : "text-gray-700"
            }`}
          />
        </p>
      )}
    </div>
  );
}

function ArticleDesc({ article }) {
  return (
    <div>
      <Link to={`/article/${article.slug}`}>
        <h2 className="text-2xl font-bold text-indigo-400 break-words">
          {article.title.substring(0, 100)}
        </h2>
      </Link>
      <p className="my-4">
        {article.description && article.description.substring(0, 200)}
        ...
      </p>
      <div className="text-sm my-4">
        {article.tagList.map((tag, index) => (
          <span
            className="py-2 px-2 border mr-4 inline-block rounded-md"
            key={index}
          >
            {tag}
          </span>
        ))}
      </div>

      <Link to={`/article/${article.slug}`}>
        <button className="text-sm p-2 bg-indigo-400 text-white inline-block rounded-lg hover:bg-indigo-500">
          Read More
        </button>
      </Link>
    </div>
  );
}
