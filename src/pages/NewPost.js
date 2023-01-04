import { useState } from "react";
import useUserContext from "../hooks/useUserContext";
import { articleURL } from "../utils/constant";
import { useNavigate } from "react-router";
import { validateForm } from "../utils/validateForm";

function NewPost() {
  const [article, setArticle] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    body: "",
    tagList: "",
  });

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!value) {
      setErrors({ ...errors, [name]: "Can't be empty" });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
    setArticle({ ...article, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErros = validateForm(article);
    if (Object.keys(formErros).length !== 0) {
      setErrors(formErros);
      return;
    }

    try {
      const res = await fetch(articleURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${user.token}`,
        },
        body: JSON.stringify({
          article: {
            ...article,
            tagList: article.tagList.split(",").map((tag) => tag.trim()),
          },
        }),
      });
      if (!res.ok) {
        setErrors((prevState) => ({
          ...prevState,
          title: "Check All The fields are filled",
        }));
        throw new Error("Something went Wrong while creating new Post");
      }
      const { article: createdArticle } = await res.json();
      navigate(`/article/${createdArticle.slug}`, { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
    >
      <div className="my-4 text-center">
        <h1 className="text-4xl font-medium mb-2">Add New Article</h1>
      </div>

      <div className="my-4">
        <label className="text-sm text-gray-600 font-medium">Title</label>
        <input
          className="block w-full border p-2 shadow-inner rounded-lg"
          type="text"
          placeholder="Article Title"
          name="title"
          value={article.title}
          onChange={handleChange}
        />
        <span className="inline-block text-red-400 font-medium text-sm">
          {errors.title}
        </span>
      </div>

      <div className="my-4">
        <label className="text-sm text-gray-600 font-medium">Description</label>
        <input
          className="block w-full border p-2 shadow-inner rounded-lg"
          type="text"
          placeholder="What's this article about"
          name="description"
          value={article.description}
          onChange={handleChange}
        />
        <span className="inline-block text-red-400 font-medium text-sm">
          {errors.description}
        </span>
      </div>

      <div className="my-4">
        <label className="text-sm text-gray-600 font-medium">Body</label>
        <textarea
          className="block w-full border p-2 shadow-inner rounded-lg"
          rows="10"
          placeholder="Write your article (in markdown)"
          name="body"
          value={article.body}
          onChange={handleChange}
        ></textarea>
        <span className="inline-block text-red-400 font-medium text-sm">
          {errors.body}
        </span>
      </div>

      <div className="my-4">
        <label className="text-sm text-gray-600 font-medium">Tags</label>
        <input
          className="block w-full border p-2 shadow-inner rounded-lg"
          type="text"
          placeholder="Enter tags"
          name="tagList"
          value={article.tagList}
          onChange={handleChange}
        />
        <span className="inline-block text-red-400 font-medium text-sm">
          {errors.tagList}
        </span>
      </div>

      <div className="flex justify-center my-4">
        <button
          className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={
            errors.title || errors.description || errors.body || errors.tagList
          }
        >
          Publish Article
        </button>
      </div>
    </form>
  );
}
export default NewPost;
