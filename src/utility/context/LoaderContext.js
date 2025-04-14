import React, { createContext, useState } from "react"

const LoaderProvider = createContext();

const LoaderContext = ({ children }) => {
  const [loader_show, setLoaderShow] = useState(false);
  return (
    <LoaderProvider.Provider value={{loader_show,setLoaderShow}}>
      {children}
      {/*  */}
    </LoaderProvider.Provider>
  );
};
export { LoaderContext, LoaderProvider };

