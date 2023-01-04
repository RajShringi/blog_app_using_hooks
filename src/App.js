import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import IndividualArticle from "./components/IndividualArticle";
import Loader from "./components/Loader";
import NewPost from "./pages/NewPost";
import NoMatch from "./components/NoMatch";
import useUserContext from "./hooks/useUserContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EditPost from "./components/EditPost";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";

function App() {
  const { isVerifying, isLoggedIn } = useUserContext();
  if (isVerifying) {
    return <Loader />;
  }

  return (
    <div className="text-gray-700">
      <Header />
      {isLoggedIn ? <AuthenticateApp /> : <UnauthenticateApp />}
    </div>
  );
}
export default App;

function UnauthenticateApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/article/:slug" element={<IndividualArticle />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}

function AuthenticateApp() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new_post" element={<NewPost />} />
      <Route path="/edit_post/:slug" element={<EditPost />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/article/:slug" element={<IndividualArticle />} />
      <Route path="*" element={<NoMatch />} />
    </Routes>
  );
}
