import { Button } from "antd";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const LandingPage = () => {
  const { user, logIn, signOut } = useContext(UserContext);
  return (
    <>
      <div>{user?.displayName}</div>
      {user ? (
        <Button onClick={signOut}>Logout</Button>
      ) : (
        <Button onClick={logIn}>Login</Button>
      )}
    </>
  );
};

export default LandingPage;
