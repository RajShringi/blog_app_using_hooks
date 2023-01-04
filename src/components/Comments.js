import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { articleURL } from "../utils/constant";
import moment from "moment";
import { BsEmojiSmile } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
import Loader from "./Loader";

function Comments({ article }) {
  const [comment, setComment] = useState({ body: "" });
  const [error, setError] = useState("");
  const [comments, setComments] = useState(null);

  const { user } = useUserContext();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(articleURL + `/${article.slug}/comments`);
        if (!res.ok) {
          throw new Error("Error while fetching comments");
        }
        const { comments } = await res.json();
        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchComments();
  }, [article.slug]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(articleURL + `/${article.slug}/comments/${id}`, {
        method: "DELETE",
        headers: { authorization: `Token ${user.token}` },
      });
      if (!res.ok) {
        throw new Error("Error while deleting the comment");
      }
      const response = await fetch(articleURL + `/${article.slug}/comments`);
      if (!res.ok) {
        throw new Error("Error while fetching comments after delete comment");
      }
      const { comments } = await response.json();
      setComments(comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!comment.body) {
        throw new Error("cant by empty");
      }
      const res = await fetch(articleURL + `/${article.slug}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({ comment }),
      });
      if (!res.ok) {
        throw new Error("Error while creaing comment");
      }
      const { comment: createdComment } = await res.json();
      setError("");
      setComment({ body: "" });
      setComments([...comments, createdComment]);
      console.log(createdComment);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <CommentForm
        handleSubmit={handleSubmit}
        setComment={setComment}
        comment={comment}
        error={error}
      />

      {comments ? (
        <AllComments comments={comments} handleDelete={handleDelete} />
      ) : (
        <Loader />
      )}
    </div>
  );
}
export default Comments;

function CommentForm({ handleSubmit, setComment, comment, error }) {
  return (
    <form
      className="bg-white p-4 max-w-3xl mx-auto my-4 shadow-sm rounded-lg"
      onSubmit={handleSubmit}
    >
      <textarea
        className="block w-full border p-2 shadow-inner rounded-lg"
        rows="4"
        placeholder="Write a comment"
        name="body"
        value={comment.body}
        onChange={(e) => setComment({ body: e.target.value })}
      ></textarea>
      <span className="inline-block text-red-400 font-medium text-sm">
        {error}
      </span>
      <div className="flex justify-center my-4">
        <button className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500">
          Post Comment
        </button>
      </div>
    </form>
  );
}

function AllComments({ comments, handleDelete }) {
  const { user } = useUserContext();

  return (
    <div className="max-w-3xl mx-auto my-4">
      {comments.map((comment) => {
        return (
          <div
            className="bg-white p-4 max-w-3xl mx-auto my-4 shadow-sm rounded-lg"
            key={comment.id}
          >
            <p className="text-base mb-4">{comment.body}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                {comment.author.image ? (
                  <Link to={`/profile/${comment.author.username}`}>
                    <img
                      className="h-5 w-5 object-cover rounded-full border-2 border-indigo-400"
                      src={comment.author.image}
                      alt={comment.author.username}
                    />
                  </Link>
                ) : (
                  <BsEmojiSmile className="h-10 w-10 text-indigo-400 mr-4" />
                )}
                <p className="text-xs">{comment.author.username}</p>
                <p className="text-xs">
                  {moment(comment.createdAt).format("MMMM Do YYYY")}
                </p>
              </div>

              {user.username === comment.author.username && (
                <button onClick={() => handleDelete(comment.id)}>
                  <AiFillDelete className="text-2xl" />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
