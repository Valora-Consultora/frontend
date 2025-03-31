import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UsuarioService from '../../api/UsuarioService';
import { getAvatarByName, normalizeText } from '../utils/formatters';
import ErrorScreen from '../utils/ErrorScreen';
import { Summarize } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import UserAvatar from '../utils/UserAvatar';
import InformeService from '../../api/InformeService';
import InformeList from '../informe/InformeList';

const Perfil = () => {
  const usuarioActual = useSelector((state) => state.user);
  const [usuario, setUsuario] = useState();
  const [informes, setInformes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UsuarioService.getUsuarioById(id);
        setUsuario(data);
        if (!data || data.id !== Number(id)) {
          setLoading(false);
          return;
        }
        const informes = await InformeService.getInformesByTasador(usuarioActual)
        setInformes(informes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <CircularProgress size={24} className="text-blue-500" />
      </div>
    );
  }

  if (!usuario) {
    return <div className="w-full h-screen"><ErrorScreen error={{ message: "Usuario no encontrado" }} /></div>;
  }

  if (!(usuarioActual.tipoUsuario === "ADMINISTRADOR") && usuarioActual.id !== Number(id)) {
    return <div className="w-full h-screen"><ErrorScreen error={{ message: "No tienes permisos para ver este usuario" }} /></div>;
  }

  return (
    // <div className="flex flex-row justify-center">
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 relative">
        <div className="absolute top-8">
          <UserAvatar editable avatarClassName="h-24 w-24 text-[48px] ring-4 ring-white" imageUrl={usuario.avatar} user={usuario} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 pt-12 w-96 mt-16">
          <h2 className="text-2xl font-bold mb-2">{usuario.nombre}</h2>
          <p className="text-gray-600 mb-2">{normalizeText(usuario.tipoUsuario)}</p>
        </div>
        <div className="min-w-96 bg-white shadow-md rounded-lg flex flex-col items-center justify-center p-4 m-4">
          <InformeList emptyListMessage={`${usuario.nombre} aún no tiene informes.`} informes={informes} onCardSelect={(_) => { }} />
        </div>
      </div>
    // </div>
  );
};


export default Perfil;