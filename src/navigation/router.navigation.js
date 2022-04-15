import * as React from 'react';
import CommonNavigation from "./common.navigation";
import AuthNavigation from "./auth.navigation";

import { AuthContext } from "../context/auth.context";
import { useContext } from "react";


export default RouterNavigation = () => {
  const { isAuthenticated } = useContext(AuthContext)

  if (isAuthenticated) {
    return <CommonNavigation />
  }
  return <AuthNavigation />
}