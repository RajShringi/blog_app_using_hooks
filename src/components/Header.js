import { NavLink } from "react-router-dom";
import useUserContext from "../hooks/useUserContext";
import { MdOutlineLibraryAdd, MdSettings, MdHome } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";

function Header() {
  const { isLoggedIn } = useUserContext();
  return (
    <header className="shadow-md">
      <div className="container mx-auto py-4 flex justify-between items-center ">
        <NavLink
          to="/"
          className="text-indigo-400 font-bold text-3xl cursor-pointer"
        >
          Conduit
        </NavLink>
        {isLoggedIn ? <AuthHeader /> : <NonAuthHeader />}
      </div>
    </header>
  );
}
export default Header;

function AuthHeader() {
  const { logout, user } = useUserContext();
  return (
    <nav className="flex justify-between items-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navItem text-indigo-400" : "navItem text-gray-700"
        }
      >
        <MdHome className="text-2xl" />
        <span>Home</span>
      </NavLink>

      <NavLink
        to="/new_post"
        className={({ isActive }) =>
          isActive ? "navItem text-indigo-400" : "navItem text-gray-700"
        }
      >
        <MdOutlineLibraryAdd className="text-2xl" />
        <span>New Post</span>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? "navItem text-indigo-400" : "navItem text-gray-700"
        }
      >
        <MdSettings className="text-2xl" />
        <span>Settings</span>
      </NavLink>

      <NavLink
        to={`/profile/${user.username}`}
        className={({ isActive }) =>
          isActive ? "navItem text-indigo-400" : "navItem text-gray-700"
        }
      >
        <CgProfile className="text-2xl" />
        <span>Profile</span>
      </NavLink>

      <button className="navItem text-rose-400" onClick={logout}>
        <FiLogOut className="text-2xl" />
        <span>Logout</span>
      </button>
    </nav>
  );
}

function NonAuthHeader() {
  return (
    <nav className="flex justify-between items-center">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? "navItem text-indigo-400" : "navItem text-gray-700"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive ? "navItem text-indigo-400" : "navItem text-gray-700"
        }
      >
        Sign in
      </NavLink>

      <NavLink
        to="/signup"
        className={({ isActive }) =>
          isActive ? "navItem text-indigo-400" : "navItem text-gray-700"
        }
      >
        Sign up
      </NavLink>
    </nav>
  );
}
