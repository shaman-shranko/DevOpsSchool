import React, { useContext, useEffect, useState } from 'react';
import AuthNavigation from "./auth.navigation";
import CommonNavigation from "./common.navigation";
import { AuthContext } from "../context/auth.context";
import Disconnected from "../screens/Other/Disconnected";


export default RouterNavigation = ({ navigation }) => {
  const { isAuthenticated, connected, refreshConnection } = useContext(AuthContext)

  if (!connected) {
    return <Disconnected refresh={refreshConnection} />
  } else {
    if (isAuthenticated) {
      return <CommonNavigation />
    }
    return <AuthNavigation />
  }
}