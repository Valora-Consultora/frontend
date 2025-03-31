import React from "react";

const Navlinks = () => {
    return (
        <>
            <ul className="flex justify-around list-none m-0 p-0">
                <li className="nav-item">
                    <a className="text-white text-xl no-underline ml-[20px] border-none outline-none hover:!text-gray-200 hover:underline hover:underline-offset-4 transition-all duration-150" href="/Home">
                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a className="text-white text-xl no-underline ml-[20px] border-none outline-none hover:!text-gray-200 hover:underline hover:underline-offset-4 transition-all duration-300" href="/Inspeccion">Inspeccion</a>
                </li>
                <li className="nav-item">
                    <a className="text-white text-xl no-underline ml-[20px] border-none outline-none hover:!text-gray-200 hover:underline hover:underline-offset-4 transition-all duration-300" href="/orden">Orden</a>
                </li>
                <li className="nav-item">
                    <a className="text-white text-xl no-underline ml-[20px] border-none outline-none hover:!text-gray-200 hover:underline hover:underline-offset-4 transition-all duration-300" href="/informe">Informe</a>
                </li>
            </ul>
        </>
    );
};

export default Navlinks;