import React from "react";
import logo from "../../../../images/valoraLogo.png";
import { NavLink } from "react-router-dom";

const LogoLogin = () => {
  return (
    <section className="flex items-center justify-end flex-1">
        <NavLink>
          <img className="w-[100px] h-auto mr-[20px] filter brightness-0 invert"src={logo} alt="logo" />
        </NavLink>
    </section>
  );
};

export default LogoLogin;