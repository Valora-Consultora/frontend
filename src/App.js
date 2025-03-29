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

const WithHeader = ({ children }) => (
  <>
    <Header />
    <div className="content">{children}</div>
  </>
);

const WithHeaderLogin = ({ children }) => (
  <>
    <HeaderLogin />
    <div className="content">{children}</div>
  </>
);

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
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
                    <Order />
                  </WithHeader>
                }
              />
              <Route
                path="/Inspeccion"
                element={
                  <WithHeader>
                    <Inspeccion />
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
                path="/Informe/Scotia/:id"
                element={
                  <WithHeader>
                    <VerInformeScotia />
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
    </GoogleOAuthProvider>
  );
}

export default App;
