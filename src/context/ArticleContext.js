import React from "react";

export const ArticleContext = React.createContext();

export const ArticleContextProvider = ({ children }) => {
  return (
    <ArticleContext.Provider value={"raj"}>{children}</ArticleContext.Provider>
  );
};
