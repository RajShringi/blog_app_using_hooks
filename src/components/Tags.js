import useFetch from "../hooks/useFetch";
import { tagsURL } from "../utils/constant";
import Loader from "./Loader";

function Tags({ setActiveTab, setActivePage }) {
  const [{ tags }, loading, error] = useFetch(tagsURL);

  if (loading) {
    return (
      <div className="w-[30%]">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        {error ? (
          <p className="text-red-400 font-bold text-2xl">
            Couldn't Fetch The Tags
          </p>
        ) : (
          ""
        )}
      </div>
    );
  }

  const handleClick = (tab) => {
    setActivePage(1);
    setActiveTab(tab);
  };

  return (
    <div className="w-[30%] bg-gray-100 p-2 rounded-lg">
      <p className="font-bold border-b-2 mb-2 border-gray-400 p-1">
        Popular Tags
      </p>

      <ul className="flex items-center flex-wrap space-x-4">
        {tags.map((tag, index) => {
          return (
            <li
              onClick={() => {
                handleClick(tag);
              }}
              key={index}
              className="bg-gray-200 p-1 m-1 rounded-lg text-sm cursor-pointer"
            >
              {tag}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
export default Tags;
