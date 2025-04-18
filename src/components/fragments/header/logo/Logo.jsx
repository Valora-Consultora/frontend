import React from "react";
import logo from "../../../../images/valoraLogo.png";
import { NavLink } from "react-router-dom";
import Notificaciones from "../../../notificaciones/Notificaciones";

const Logo = () => {
  return (
    <section className="flex items-center justify-end flex-1">
      <Notificaciones />
        <NavLink>
          <img className="w-[100px] h-auto mr-[20px] filter brightness-0 invert" src={logo} alt="logo" />
        </NavLink>
    </section>
  );
};

export default Logo;