import Logo from "./logo/Logo";
import Navbar from "./navbar/Navbar";
import { useSelector } from 'react-redux';

const Header = () => {
  const usuario = useSelector(state => state.user);
  const tipoUsuario = usuario.tipoUsuario;

  return (
    <header className="grid grid-cols-3 items-center bg-[#01502f] h-[80px] p-0 m-0">
      <Navbar /> {/* Primera columna: Navbar */}
      <span className="font-normal text-white text-lg text-center">
        {tipoUsuario} {/* Segunda columna: Tipo de usuario */}
      </span>
      <Logo /> {/* Tercera columna: Logo */}
    </header>
  );
};

export default Header;