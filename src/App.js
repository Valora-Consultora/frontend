import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/fragments/header/Header";
import Footer from "./components/fragments/footer/Footer";
import HeaderLogin from "./components/fragments/header/HeaderLogin";
import Order from "./components/Order";
import Revision from "./components/revision/Revision";
import Inspeccion from "./components/Inspeccion";
import Home from "./components/Home";
import InformeLayout from "./components/informe/InformeLayout";
import RevisionInformes from "./components/revision/RevisionInformes";
import RevisionUsuarios from "./components/revision/RevisionUsuarios";
import VerInformeScotia from "./components/informe/VerInformeScotia";
import ReporteSeguimiento from "./components/reportes/ReporteSeguimiento";
import ReportesLayout from "./components/reportes/ReportesLayout";
import { GoogleOAuthProvider } from '@react-oauth/google';
import NotificacionesPage from "./components/notificaciones/NotificacionesPage";
import Perfil from "./components/perfil/Perfil";
import { jwtDecode } from "jwt-decode";
import OrdenesList from "./components/orden/OrdenesList";
import InspeccionesList from "./components/inspeccion/InspeccionesList";

const WithHeader = ({ children }) => {
  const token = localStorage.getItem("token");

  var decodedToken;
  try {
    decodedToken = jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    alert("Ha ocurrido un error. Por favor, inicie sesión nuevamente.");
    window.location.href = "/";
    localStorage.removeItem("token");
    return;
  }

  if (decodedToken.exp < Date.now() / 1000) {
    alert("Para asegurar la seguridad del sistema debe iniciar sesión nuevamente.");
    window.location.href = "/";
    localStorage.removeItem("token");
    return;
  }

  return (
    <>
      <Header />
      <div className="content">{children}</div>
    </>
  )
};

const WithHeaderLogin = ({ children }) => (
  <>
    <HeaderLogin />
    <div className="content">{children}</div>
  </>
);

export const NotificacionContext = React.createContext();

function App() {
  const [notificaciones, setNotificaciones] = React.useState([]);

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <NotificacionContext.Provider value={[notificaciones, setNotificaciones]}>
        <ThemeProvider>
          <Router>
            <div className="bg-gray-100 min-h-screen flex flex-col">
              <Routes>
                <Route
                  path="/"
                  element={
                    <WithHeaderLogin>
                      <Login />
                    </WithHeaderLogin>
                  }
                />
                <Route
                  path="/RegistroUsuarios"
                  element={
                    <WithHeader>
                      <SignUp />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Home"
                  element={
                    <WithHeader>
                      <Home />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Orden"
                  element={
                    <WithHeader>
                      <OrdenesList />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Inspeccion"
                  element={
                    <WithHeader>
                      <InspeccionesList />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Inspeccion/Orden/:ordenId"
                  element={
                    <WithHeader>
                      <Inspeccion />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Notificacion"
                  element={
                    <WithHeader>
                      <NotificacionesPage />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Informe"
                  element={
                    <WithHeader>
                      <InformeLayout />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Informe/:banco"
                  element={
                    <WithHeader>
                      <InformeLayout />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Informe/Inspeccion/:inspeccionId"
                  element={
                    <WithHeader>
                      <InformeLayout />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Informe/Scotia/:id"
                  element={
                    <WithHeader>
                      <VerInformeScotia />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Perfil/:id"
                  element={
                    <WithHeader>
                      <Perfil />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Revision"
                  element={
                    <WithHeader>
                      <Revision />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Revision/Informes"
                  element={
                    <WithHeader>
                      <RevisionInformes />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Revision/Usuarios"
                  element={
                    <WithHeader>
                      <RevisionUsuarios />
                    </WithHeader>
                  }
                />
                <Route
                  path="/Reportes"
                  element={
                    <WithHeader>
                      <ReportesLayout />
                    </WithHeader>
                  }
                />
                <Route
                  path="/ReporteSeguimiento"
                  element={
                    <WithHeader>
                      <ReporteSeguimiento />
                    </WithHeader>
                  }
                />
              </Routes>
            </div>
            <Footer className="text-center bg-gray-200 mt-auto py-4" />
          </Router>
        </ThemeProvider>
      </NotificacionContext.Provider>
    </GoogleOAuthProvider>
  );
}

export default App;
