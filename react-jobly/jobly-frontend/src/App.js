import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import Navigation from "./Navigation";
import Routes from "./Routes";
import UserContext from "./UserContext";

function App() {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function getUserInfo() {
      if (token) {
        JoblyApi.token = token;

        const { username } = decodeToken(token);
        const user = await JoblyApi.getCurrentUser(username);
        setCurrentUser(user);
      }
    }
    getUserInfo();
  }, [token]);

  const login = async (loginData) => {
    const token = await JoblyApi.login(loginData);
    setToken(token);
  };

  const signup = async (signupData) => {
    const token = await JoblyApi.signup(signupData);
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Navigation currentUser={currentUser} logout={logout} />
      <Routes login={login} signup={signup} />
    </UserContext.Provider>
  );
}

export default App;
