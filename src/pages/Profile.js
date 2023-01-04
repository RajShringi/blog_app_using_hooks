import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { articleURL, profileURL } from "../utils/constant";
import { BsEmojiSmile } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import Loader from "../components/Loader";
import Articles from "../components/Articles";
import Pagination from "../components/Pagination";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [articles, setArticles] = useState(null);
  const [articlesCount, setArticlesCount] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const { user } = useUserContext();
  const { username } = useParams();
  const [activeTab, setActiveTab] = useState("author");

  const articlePerPage = 10;

  async function fetchArticles() {
    const offset = (activePage - 1) * articlePerPage;
    try {
      setLoading(true);
      const res = await fetch(
        articleURL +
          `/?${activeTab}=${username}&limit=${articlePerPage}&offset=${offset}`
      );
      if (!res.ok) {
        throw new Error("Error while fetching the article");
      }
      const { articles, articlesCount } = await res.json();
      setArticles(articles);
      setArticlesCount(articlesCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  async function fetchProfile() {
    let res;
    try {
      setPageLoading(true);
      if (user) {
        res = await fetch(profileURL + `/${username}`, {
          method: "GET",
          headers: { authorization: `Token ${user.token}` },
        });
      } else {
        res = await fetch(profileURL + `/${username}`);
      }
      if (!res.ok) {
        throw new Error("error while fetching the profile");
      }
      const { profile } = await res.json();
      setProfile(profile);
      setPageLoading(false);
    } catch (error) {
      setPageLoading(false);
      console.log(error);
    }
  }

  useEffect(() => {
    setActiveTab("author");
    fetchProfile();
  }, [username]);

  useEffect(() => {
    fetchArticles();
  }, [activeTab, activePage, profile]);

  const changeActiveTab = (tab) => {
    setActivePage(1);
    setActiveTab(tab);
  };

  const handleFollowing = async () => {
    setPageLoading(true);
    try {
      let res, data;
      if (!profile.following) {
        res = await fetch(`${profileURL}/${username}/follow`, {
          method: "POST",
          headers: {
            authorization: `Token ${user.token}`,
          },
        });
      } else {
        res = await fetch(profileURL + `/${username}/follow`, {
          method: "DELETE",
          headers: {
            authorization: `Token ${user.token}`,
          },
        });
      }
      if (!res.ok) {
        throw error("error while follwing/unfollwing");
      }
      data = await res.json();
      setProfile(data.profile);
      setPageLoading(false);
    } catch (errors) {
      setPageLoading(false);
      console.log(errors);
    }
  };

  if (pageLoading) {
    return <Loader />;
  }

  return (
    <div>
      {profile && (
        <ProfileBanner profile={profile} handleFollowing={handleFollowing} />
      )}
      {profile && (
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-start items-center container mx-auto border-b py-4 space-x-2">
            <button
              onClick={() => changeActiveTab("author")}
              className={`p-2  rounded-lg ${
                activeTab === "author"
                  ? "bg-indigo-400 text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              {profile.username} Articles
            </button>
            <button
              onClick={() => changeActiveTab("favorited")}
              className={`p-2  rounded-lg ${
                activeTab === "favorited"
                  ? "bg-indigo-400 text-white"
                  : "bg-gray-50 text-gray-700"
              }`}
            >
              Favorited Articles
            </button>
          </div>
        </div>
      )}
      {articles ? (
        <div className="max-w-2xl mx-auto">
          <Articles articles={articles} loading={loading} error={error} />
          <Pagination
            articlesCount={articlesCount}
            articlePerPage={articlePerPage}
            activePage={activePage}
            setActivePage={setActivePage}
          />
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
}
export default Profile;

function ProfileBanner({ profile, handleFollowing }) {
  const { user } = useUserContext();
  return (
    <div className="bg-zinc-800 mb-4">
      <div className="container mx-auto py-4 text-white">
        <div className="max-w-lg text-center mx-auto p-4">
          <div className="flex justify-center items-center mb-4">
            {profile.image ? (
              <Link to={`/profile/${profile.username}`}>
                <img
                  className="h-[100px] w-[100px] object-cover rounded-full border-2 border-indigo-400 mr-4"
                  src={profile.image}
                  alt={profile.username}
                />
              </Link>
            ) : (
              <BsEmojiSmile className="h-10 w-10 text-indigo-400 mr-4" />
            )}
          </div>
          <h1 className="text-2xl font-bold">{profile.username}</h1>
          <p className="font-light mb-4">{profile.bio}</p>
          {user && user.username !== profile.username ? (
            <button
              onClick={handleFollowing}
              className="mx-auto py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 flex items-center space-x-2"
            >
              {profile.following ? (
                <RiUserUnfollowLine className="text-2xl" />
              ) : (
                <RiUserFollowLine className="text-2xl" />
              )}
              <span>
                {profile.following ? "unfollow" : "follow"} {profile.username}
              </span>
            </button>
          ) : (
            ""
          )}
        </div>

        <div className="flex items-center justify-end">
          <Link to="/settings">
            <button className="flex items-center space-x-2 bg-zinc-500 py-2 px-6 rounded-lg hover:bg-zinc-600">
              <AiOutlineEdit className="text-2xl" />
              <span className="text-sm">Edit Profile Settings</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
