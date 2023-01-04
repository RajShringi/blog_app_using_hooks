import useUserContext from "../hooks/useUserContext";

function Feed({ acitveTab, changeActiveTab }) {
  const { isLoggedIn } = useUserContext();
  return (
    <div className="flex justify-start items-center container mx-auto border-b py-4 space-x-2">
      {isLoggedIn && (
        <button
          onClick={() => changeActiveTab("YOUR_FEED")}
          className={`p-2  rounded-lg ${
            acitveTab === "YOUR_FEED"
              ? "bg-indigo-400 text-white"
              : "bg-gray-50 text-gray-700"
          }`}
        >
          Your Feed
        </button>
      )}
      <button
        onClick={() => changeActiveTab(null)}
        className={`p-2  rounded-lg ${
          acitveTab === null
            ? "bg-indigo-400 text-white"
            : "bg-gray-50 text-gray-700"
        }`}
      >
        Global Feed
      </button>
      <button className="p-2 text-indigo-400 rounded-lg">
        {acitveTab !== null && acitveTab !== "YOUR_FEED" ? `#${acitveTab}` : ""}
      </button>
    </div>
  );
}
export default Feed;
