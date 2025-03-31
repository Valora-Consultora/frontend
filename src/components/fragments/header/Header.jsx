import React, { useState, useRef } from "react";

import Logo from "./logo/Logo";
import Navbar from "./navbar/Navbar";
import { useSelector } from 'react-redux';

import { ArrowDropDown, Logout, OpenInNew } from "@mui/icons-material";
import { Divider, Popover } from "@mui/material";
import { normalizeText } from "../../utils/formatters";
import UserAvatar from "../../utils/UserAvatar";

const Header = () => {
  const usuario = useSelector(state => state.user);
  const username = usuario.username;
  const nombre = usuario.nombre;
  const tipo = usuario.tipoUsuario;
  const [anchorEl, setAnchorEl] = useState(null);
  const popoverRef = useRef(null);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <header className="grid grid-cols-3 items-center bg-[#01502f] h-[80px] p-0 m-0">
      <Navbar /> {/* Primera columna: Navbar */}
      <div
        className="flex flex-row items-center font-normal text-white text-lg text-center cursor-pointer mx-auto"
        onClick={handleClick}
        ref={popoverRef}
      >
        <UserAvatar user={usuario} />
        <span className="ml-2">{nombre}</span> {/* Segunda columna: Tipo de usuario */}
        <ArrowDropDown className="text-white" />
        {/* Component that opens up a dialog below this */}
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <div>
            <div className="py-2 px-3">{`${normalizeText(tipo)} (${username})`}</div>
            <Divider className="border-black" />
            <div className="my-1 py-1 px-1 mx-2 rounded-md flex flex-row space-x-2 hover:bg-gray-200" onClick={() => { window.location.href = `/Perfil/${usuario.id}`; handleClose(); }}>
              <OpenInNew className="text-gray-500" />
              <span className="pointer-events-none">Ver perfil</span>
            </div>
            <div className="my-1 py-1 px-1 mx-2 rounded-md flex flex-row space-x-2 hover:bg-gray-200" onClick={() => { window.location.href = "/"; handleClose(); }}>
              <Logout className="text-gray-500" />
              <span className="pointer-events-none">Cerrar sesión</span>
            </div>
          </div>
        </Popover>
      </div>
      <Logo /> {/* Tercera columna: Logo */}
    </header>
  );
};

export default Header;