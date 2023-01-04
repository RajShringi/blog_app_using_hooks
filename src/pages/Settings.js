import { useState } from "react";
import useUserContext from "../hooks/useUserContext";
import { userVerify } from "../utils/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../components/Loader";
import { validateForm } from "../utils/validateForm";

function Settings() {
  const { user: loggedInUser, updateUser } = useUserContext();

  const [user, setUser] = useState({
    image: loggedInUser.image || "",
    username: loggedInUser.username,
    bio: loggedInUser.bio || "",
    email: loggedInUser.email,
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const notify = () => toast("Update Successful");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErros = validateForm(user);

    if (Object.keys(formErros).length !== 0) {
      setErrors(formErros);
      return;
    }
    let data;
    if (user.password) {
      data = {
        user: {
          image: user.image,
          username: user.username,
          bio: user.bio,
          email: user.email,
          password: user.password,
        },
      };
    } else {
      data = {
        user: {
          image: user.image,
          username: user.username,
          bio: user.bio,
          email: user.email,
        },
      };
    }

    try {
      setLoading(true);
      const res = await fetch(userVerify, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${loggedInUser.token}`,
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const { errors } = await res.json();
        console.log(errors);
        throw errors;
      }
      const { user } = await res.json();
      updateUser(user);
      setLoading(false);
      notify();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
      >
        <div className="my-4 text-center">
          <h1 className="text-4xl font-medium mb-2">Settings</h1>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">
            Profile Picture
          </label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="text"
            placeholder="URL of profile picture"
            name="image"
            value={user.image}
            onChange={handleChange}
          />
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">username</label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="text"
            placeholder="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {errors.username}
          </span>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">bio</label>
          <textarea
            className="block w-full border p-2 shadow-inner rounded-lg"
            placeholder="bio"
            rows="5"
            name="bio"
            value={user.bio}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">Email</label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="email"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {errors.email}
          </span>
        </div>

        <div className="my-4">
          <label className="text-sm text-gray-600 font-medium">
            New Password
          </label>
          <input
            className="block w-full border p-2 shadow-inner rounded-lg"
            type="text"
            placeholder="New Password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <span className="inline-block text-red-400 font-medium text-sm">
            {errors.password}
          </span>
        </div>

        <div className="flex justify-center my-4">
          <button className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500">
            Update Settings
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}
export default Settings;

// function validateForm(values) {
//   const errors = {};
//   if (!values.username) {
//     errors.username = "Username Can't be empty";
//   }
//   if (!values.email) {
//     errors.email = "Email Can't be empty";
//   }
//   if (!values.email.includes("@")) {
//     errors.email = "Email should contain @";
//   }
//   errors.password =
//     values.password && !/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(values.password)
//       ? "Password must contain a letter and a number"
//       : "";
//   return errors;
// }
