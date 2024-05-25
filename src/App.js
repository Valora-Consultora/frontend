import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Header from "./components/fragments/header/Header";
import Footer from "./components/fragments/footer/Footer";
import HeaderLogin from "./components/fragments/header/HeaderLogin";
import Order from "./components/Order";
import Inspeccion from "./components/Inspeccion";
import Home from './components/Home';

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
    <ThemeProvider>
      <Router>
        <div className="bg-gray-100">
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
          </Routes>
        </div>
        <Footer className="text-center bg-gray-200" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
