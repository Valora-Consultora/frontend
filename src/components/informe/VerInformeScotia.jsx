import { useEffect, useState } from "react";

import InformeService from "../../api/InformeService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from "react-toastify";
import { setGlobalInforme, setProvisionalInformeId } from "../../app/slices/informeSlice";

import AttachMoney from '../../images/icons/attach_money.svg';
import DetectorSmoke from '../../images/icons/detector_smoke.svg';
import Info from '../../images/icons/info.svg';
import SearchInsights from '../../images/icons/search_insights.svg';
import SquareFoot from '../../images/icons/square_foot.svg';
import ErrorScreen from "../utils/ErrorScreen";
import Summarize from "../../images/icons/summarize.svg";

const VerInformeScotia = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usuario = useSelector(state => state.user);
  const { id } = useParams();

  const [informe, setInforme] = useState({});

  useEffect(() => {
    const fetchInforme = async () => {
      try {
        const response = await InformeService.getInformeById(id);
        setInforme(response);
      } catch (error) {
        console.error("Error al obtener el informe:", error);
      }
    };
    fetchInforme();
  }, [id]);

  const handleApprove = () => {
    InformeService.approveInforme(id).then(() => {
      toast.success("Informe aprobado correctamente");
      setInforme({...informe, estadoInforme: 'APROBADO'});
    })
  }
  
  const handleDisapprove = () => {
    InformeService.disapproveInforme(id).then(() => {
      toast.success("Aprobación cancelada correctamente");
      setInforme({...informe, estadoInforme: 'PENDIENTE'});
    })
  }

  const handleEdit = () => {
    dispatch(setGlobalInforme(informe));
    dispatch(setProvisionalInformeId(informe.id));
    navigate('/informe/scotia');
  }

  if (!informe) {
    return <div className="w-full h-screen"><ErrorScreen error={{ message: "No se pudo cargar el informe", icon: Summarize }} /></div>;
  }

  if (!informe.id) {
    return <div>Cargando...</div>;
  }

  //console.log('usuario', usuario);
  //console.log('informe', informe);
  //console.log('tipo', usuario.tipoUsuario);
  //console.log('id', usuario.id);
  //console.log('true or not', !usuario.tipoUsuario === "ADMINISTRADOR")
  //console.log('true or not', usuario.id !== 2)
  if (!(usuario.tipoUsuario === "ADMINISTRADOR") && usuario.id !== 2) {
    return <div className="w-full h-screen"><ErrorScreen error={{ message: "No tienes permisos para ver este informe", icon: Summarize }} /></div>;
  }

  return (
    <div className="flex flex-col p-4">
      <h1 className="text-center text-green-900 pb-4">Informe de Scotia #{informe.id}</h1>

      <div className="bg-white shadow-lg w-4/5 mx-auto rounded-xl p-6 mb-16">
        <div className="grid grid-cols-12 gap-4">
          {/* Información General */}
          <div className="col-span-6 space-y-4 border p-3 rounded">
            <div className="flex flex-row space-x-2">
              <img src={Info} alt="logo" className="w-8 h-8" />
              <h4 className="text-xl text-green-900">Información General</h4>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="solicitante"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Solicitante:
              </label>
              <span>{informe.solicitante}</span>

            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="oficial"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Oficial:
              </label>
              <span className="col-span-4">{informe.oficial}</span>

              <label
                htmlFor="sucursal"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Sucursal:
              </label>
              <span className="col-span-4">{informe.sucursal}</span>

            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="titular"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Titular/es:
              </label>
              <span className="col-span-4">{informe.titular}</span>

              <label
                htmlFor="cedula"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                CI:
              </label>
              <span className="col-span-4">{informe.cedula}</span>

            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="direccion"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Dirección:
              </label>
              <span className="col-span-4">{informe.direccion}</span>

              <label
                htmlFor="padron"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Padrón:
              </label>
              <span className="col-span-4">{informe.padron}</span>

            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="localidad"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Localidad:
              </label>
              <span className="col-span-4">{informe.localidad}</span>

              <label
                htmlFor="departamento"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Departamento:
              </label>
              <span className="col-span-4">{informe.departamento}</span>

            </div>
          </div>

          {/* Superficies */}
          <div className="col-span-6 space-y-4 border p-3 rounded">
            <div className="flex flex-row space-x-2">
              <img src={SquareFoot} alt="logo" className="w-8 h-8" />
              <h4 className="text-xl text-green-900">Superficies</h4>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="supPredio"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Sup. Predio:
              </label>
              <span className="col-span-4">
                {informe.supPredio}
              </span>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="supConstruida"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Sup. Construida:
              </label>
              <span className="col-span-4">
                {informe.supConstruida}
              </span>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="comodidades"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Comodidades:
              </label>
              <span className="col-span-4">{informe.comodidades}</span>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="conservacion"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Estado de Conservación:
              </label>
              <span className="col-span-4">{informe.conservacion}</span>
            </div>
          </div>

          {/* Avalúo */}
          <div className="col-span-6 space-y-4 border p-3 rounded">
            <div className="flex flex-row space-x-2">
              <img src={AttachMoney} alt="logo" className="w-8 h-8" />
              <h4 className="text-xl text-green-900">Avalúo</h4>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="valorMercado"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Valor de Mercado:
              </label>
              <span className="col-span-4">{informe.valorMercado}</span>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="valorVentaRapida"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Valor de Venta Rápida:
              </label>
              <span className="col-span-4">{informe.valorVentaRapida}</span>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="valorRemate"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Valor de Remate:
              </label>
              <span className="col-span-4">{informe.valorRemate}</span>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <label
                htmlFor="costoReposicion"
                className="col-span-2 text-sm text-gray-700 font-bold"
              >
                Costo de Reposición a Nuevo:
              </label>
              <span className="col-span-4">{informe.costoReposicion}</span>
            </div>
          </div>

          {/* Relevamiento Fotografico */}
          {/* <div className="col-span-12 space-y-4 border p-3 rounded">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12">
                <FileUploadSection
                  title="Relevamiento Fotográfico"
                  name="fotos"
                  accept="image/*"
                  files={formData.fotos}
                  onRemove={handleRemoveFile}
                />
              </div>
            </div>
          </div> */}

          {/* Comparable */}
          {/* <div className="col-span-12 space-y-4 border p-3 rounded">
          <div className="flex flex-row space-x-2">
          <img src="" alt="logo" className="w-8 h-8" />
            <h4 className="text-xl text-green-900">Comparables Seleccionados</h4>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12">
                <p className="text-sm text-gray-700">
                  <SelectedComparableList
                    handleEditComparable={handleEditComparable}
                    handleEditHomologation={handleEditHomologation}
                    handleSelectMainComparable={handleSelectMainComparable}
                    comparables={formData.comparables}
                  />
                </p>
              </div>
            </div>
          </div> */}

          {/* Anexos Graficos o Catastrales */}
          {/* <div className="col-span-12 space-y-4 border p-3 rounded">
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12">
                <FileUploadSection
                  title="Anexos Gráficos o Catastrales"
                  name="anexos"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  files={formData.anexos}
                  onRemove={handleRemoveFile}
                />
              </div>
            </div>
          </div> */}

          {/* Seguro de Incendio */}
          <div className="col-span-6 space-y-4 border p-3 rounded">
            <div className="flex flex-row space-x-2">
              <img src={DetectorSmoke} alt="logo" className="w-8 h-8" />
              <h4 className="text-xl text-green-900">Seguro de Incendio</h4>
            </div>
            {informe.seguroIncendio.map((seguro) => (
              <div key={seguro} className="grid grid-cols-12 gap-4 items-center">
                <span>{seguro}</span>
              </div>
            ))}
          </div>

          {/* Observaciones */}
          <div className="col-span-12 space-y-4 border p-3 rounded">
            <div className="flex flex-row space-x-2">
              <img src={SearchInsights} alt="logo" className="w-8 h-8" />
              <h4 className="text-xl text-green-900">Observaciones</h4>
            </div>
            <div className="grid grid-cols-12 gap-4 items-center">
              <span>{informe.observaciones}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="space-x-2">
            {informe.estadoInforme === "PENDIENTE" &&
              <button
                type="button"
                className="bg-green-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/4 "
                onClick={handleApprove}
              >
                Aprobar Informe
              </button>
            }
            {informe.estadoInforme === "APROBADO" &&
              <button
                type="button"
                className="bg-yellow-900 text-white px-4 py-2 rounded-md hover:bg-yellow-700 w-1/4 "
                onClick={handleDisapprove}
              >
                Cancelar Aprobación Informe
              </button>
            }
            <button
              type="button"
              className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/4 "
              onClick={handleEdit}
            >
              Editar Informe
            </button>
            <button
              type="button"
              className="bg-red-900 text-white px-4 py-2 rounded-md hover:bg-green-700 w-1/4 "
            >
              Eliminar Informe
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default VerInformeScotia;