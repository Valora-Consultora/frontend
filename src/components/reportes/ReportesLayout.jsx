import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Assessment, Visibility, CheckCircle, Description, Search } from '@mui/icons-material';


const ReportesLayout = () => {
    const usuario = useSelector(state => state.user);
    const nombre = usuario.nombre;
    const opciones = [];

    useEffect(() => { }, [usuario]);

    opciones.push(
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
            <div className="text-gray-500">
                <Search fontSize="large" />
            </div>
            <div className="text-center flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold">Seguimiento</h3>
                <p className="text-gray-500">Seguimiento de todos los informes</p>
            </div>
            <a className="text-green-900 no-underline hover:underline" href="/ReporteSeguimiento">
                Ir a Reporte
            </a>
        </div>
    );
    opciones.push(
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72" key="reporte">
            <div className="text-gray-500">
                <Assessment fontSize="large" />
            </div>
            <div className="text-center flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold">Reporte</h3>
                <p className="text-gray-500">Genera reportes de inmuebles y otros</p>
            </div>
            <a className="text-green-900 no-underline hover:underline" href="/Reportes">
                Ir a Reporte
            </a>
        </div>
    );
    opciones.push(
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
            <div className="text-gray-500">
                <CheckCircle fontSize="large" />
            </div>
            <div className="text-center flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold">Revisar</h3>
                <p className="text-gray-500">Revisa y aprueba/rechaza los distintos elementos del sistema</p>
            </div>
            <a className="text-green-900 no-underline hover:underline mt-4" href="/Revision">
                Ir a Revisar
            </a>
        </div>
    );
    opciones.push(
        <div className="bg-white rounded-lg shadow-md flex flex-col items-center justify-between p-8 h-72">
            <div className="text-gray-500">
                <Description fontSize="large" />
            </div>
            <div className="text-center flex-1 flex flex-col justify-center">
                <h3 className="text-lg font-semibold">Informe</h3>
                <p className="text-gray-500">Crea un nuevo Informe en el sistema</p>
            </div>
            <a className="text-green-900 no-underline hover:underline" href="/Informe">
                Ir a Informe
            </a>
        </div>
    );

    const gridClasses = {
        1: 'grid-cols-1',
        2: 'grid-cols-2',
        3: 'grid-cols-3',
        4: 'grid-cols-4',
    };

    const gridClass = gridClasses[opciones.length] || 'grid-cols-1';

    return (
        <div>
            <div className="bg-gray-100 min-h-screen">
                <div className="text-center">
                    <h2 className="text-center text-5xl text-green-900 font-light mx-auto my-10">
                        REPORTES
                    </h2>
                </div>
                <div className={`grid ${gridClass} gap-6 w-4/5 mx-auto`}>{opciones}</div>
            </div>
        </div>
    );
};

export default ReportesLayout;
