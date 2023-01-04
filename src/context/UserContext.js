import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageKey, userVerify } from "../utils/constant";

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async (key) => {
      try {
        setIsVerifying(true);
        const res = await fetch(userVerify, {
          method: "GET",
          headers: {
            authorization: `Token ${key}`,
          },
        });
        if (!res.ok) {
          throw new Error("Error While Fetching User");
        }
        const { user } = await res.json();
        setIsLoggedIn(true);
        setUser(user);
        setIsVerifying(false);
      } catch (error) {
        setIsVerifying(false);
        console.log(error);
      }
    };
    const key = localStorage[localStorageKey];
    if (key) {
      fetchUser(key);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUser(null);
    setIsVerifying(false);
    navigate("/", { replace: true });
  };

  const updateUser = (user) => {
    setIsLoggedIn(true);
    setUser(user);
    localStorage.setItem(localStorageKey, user.token);
  };

  return (
    <UserContext.Provider
      value={{ isLoggedIn, user, updateUser, isVerifying, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};
