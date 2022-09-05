import { Button } from "antd";
import React, { useContext } from "react";
import Header from "../components/Headers/Header";
import { UserContext } from "../context/UserContext";

import "./LandingPage.css";

const LandingPage = () => {
  const {logIn } = useContext(UserContext);
  return (
    <>
      <div className="hero">
        <Header dark showMenu={false}/>
        <div className="hero-group">
          <h1 className="hero-h1">
            Create the perfect study plan that works <br /> for you
          </h1>
          <h2 className="hero-h2">
            Hallify helps you organize and track your progress when you are studying
          </h2>
          <Button onClick={logIn} className="ant-btn-primary" style={{ paddingInline: "25px" }} size="large">Get started</Button>
        </div>
        <div className="hero-footer">2022 &copy; hallify.app</div>
      </div>
    </>
  );
};

export default LandingPage;
