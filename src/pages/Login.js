import { useState } from "react";
import { useNavigate } from "react-router";
import FormHeader from "../components/FormHeader";
import Loader from "../components/Loader";
import useUserContext from "../hooks/useUserContext";
import { loginURL } from "../utils/constant";
import { validate } from "../utils/validate";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors(validate(errors, name, value));
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user }),
      });

      if (!res.ok) {
        const { errors } = await res.json();
        setErrors(errors);
        throw new Error("something went wrong while login");
      }

      const { user: userCreatd } = await res.json();
      updateUser(userCreatd);
      navigate("/", { replace: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <form
      className="bg-white p-4 max-w-xl mx-auto my-4 shadow-sm rounded-lg"
      onSubmit={handleSubmit}
    >
      {/* form Header */}
      <FormHeader heading="Sing In" link="/signup" text="Need an account?" />
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
        <label className="text-sm text-gray-600 font-medium">Password</label>
        <input
          className="block w-full border p-2 shadow-inner rounded-lg"
          type="password"
          placeholder="Password"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <span className="inline-block text-red-400 font-medium text-sm">
          {errors.password}
        </span>
      </div>

      <div className="flex justify-center my-4">
        <button
          className="py-2 px-6 bg-indigo-400 text-white rounded-lg hover:bg-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={errors.email || errors.password}
        >
          Sign in
        </button>
      </div>
    </form>
  );
}
export default Login;
