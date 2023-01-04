import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { articleURL } from "../utils/constant";
import Loader from "./Loader";
import { BsEmojiSmile } from "react-icons/bs";
import moment from "moment";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import useUserContext from "../hooks/useUserContext";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Comments from "./Comments";

function IndividualArticle() {
  const { slug } = useParams();
  const [{ article }, loading, error] = useFetch(articleURL + `/${slug}`);
  const { user } = useUserContext();
  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error ? (
          <p className="text-red-400 font-bold text-2xl py-2 text-center">
            Couldn't Fetch The Article
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }

  return (
    <>
      <ArticleHeader article={article} user={user} />
      <ArticleBody article={article} />
      <ArticleFooter article={article} user={user} />
    </>
  );
}
export default IndividualArticle;

function ArticleHeader({ article, user }) {
  return (
    <div className="bg-zinc-800 text-white py-12 h-min-[200px]">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl mb-4">{article.title}</h1>
        <div className="flex items-center">
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
              <p className="text-sm text-indigo-400">
                {article.author.username}
              </p>
            </Link>
            <p className="text-xs">
              {moment(article.createdAt).format("MMMM Do YYYY")}
            </p>
          </div>
        </div>

        <div className="my-6 flex items-center space-x-2">
          <Link to={`/edit_post/${article.slug}`}>
            {user && user.username === article.author.username && (
              <button className="py-2 px-6 bg-zinc-600 hover:bg-zinc-700 flex items-center space-x-2">
                <AiOutlineEdit className="text-2xl" />
                <span>Edit Article</span>
              </button>
            )}
          </Link>

          {user && user.username === article.author.username && (
            <button className="py-2 px-6 bg-rose-400 hover:bg-zinc-700 flex items-center space-x-2">
              <AiOutlineDelete className="text-2xl" />
              <span>Delete Article</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function ArticleBody({ article }) {
  return (
    <div className="max-w-2xl mx-auto border-b py-4">
      <ReactMarkdown
        className="prose  prose-a:text-indigo-500 lg:prose-xl"
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
      >
        {article.body}
      </ReactMarkdown>
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
    </div>
  );
}

function ArticleFooter({ article, user }) {
  return (
    <>
      <div className="max-w-2xl mx-auto my-6">
        {user ? (
          <Comments article={article} />
        ) : (
          <p className="text-center">
            <Link className="text-indigo-400 font-semibold" to="/login">
              Sign in
            </Link>{" "}
            or{" "}
            <Link className="text-indigo-400 font-semibold" to="/signup">
              Sign up
            </Link>{" "}
            to add comments on this article.
          </p>
        )}
      </div>
    </>
  );
}
