import LogoLogin from "./logo/LogoLogin";

const HeaderLogin = () => {
    return (
        <header className="grid grid-cols-2 items-center bg-[#01502f] h-[80px] p-0 m-0">
            <div></div> {/* Espacio vacío para la primera columna */}
            <div className="flex items-center justify-end flex-1">
                <LogoLogin />
            </div>
        </header>
    );
};

export default HeaderLogin;