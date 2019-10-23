import React, { Component } from "react";
import Authentication from "./components/authentication/Authentication";
import NavBar from "./components/ui/NavBar";
import useSimpleAuth from "./hooks/useSimpleAuth"

const CodeArchive = () => {
  const { isAuthenticated } = useSimpleAuth();

  if (isAuthenticated()) 
    return (
      <React.Fragment>
        <NavBar />
      </React.Fragment>
    );
   else 
    return (
      <React.Fragment>
        <Authentication/>
      </React.Fragment>
    );
  
};

export default CodeArchive;
