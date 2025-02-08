import { useEffect, useState } from "react";
import InformeService from "../../api/InformeService";
import { InformeCard } from "../informe/InformeCard";
import { useNavigate } from "react-router-dom";

const RevisionInformes = () => {
  const [informes, setInformes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInformes = async () => {
      try {
        const response = await InformeService.getAllInformes();
        setInformes(response);
      } catch (error) {
        console.error("Error al obtener los informes:", error);
      }
    };
    fetchInformes();
  }, []);

  const handleCardSelect = (informe) => {
    navigate(`/Informe/Scotia/${informe.id}`);
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-center text-green-900 pb-4">Revisar informes</h1>
      {informes.map((informe) => (
        <InformeCard key={informe.id} informe={informe} handleCardSelect={handleCardSelect}/>
      ))}
    </div>
  );

}

export default RevisionInformes;