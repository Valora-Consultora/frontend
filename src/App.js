import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import SignUp from './components/SignUp.jsx';
import Header from './components/fragments/header/Header.jsx';
import Footer from './components/fragments/footer/Footer.jsx';
import HeaderLogin from './components/fragments/header/HeaderLogin.jsx';
import Order from './components/Order.jsx';
import Inspeccion from './components/Inspeccion.jsx';
import Prueba from './components/prueba.jsx';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const WithHeader = ({ children }) => (
  <>
    <Header />
    <div className="content">
      {children}
    </div>
  </>
);

const WithHeaderLogin = ({ children }) => (
  <>
    <HeaderLogin />
    <div className="content">
      {children}
    </div>
  </>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<WithHeaderLogin><Login /></WithHeaderLogin>} />
          <Route path="/RegistroUsuarios" element={<WithHeader><SignUp /></WithHeader>} />
          <Route path="/Orden" element={<WithHeader><Order /></WithHeader>} />
          <Route path="/Inspeccion" element={<WithHeader><Inspeccion /></WithHeader>} />
          <Route path="/Prueba" element={<WithHeader><Prueba /></WithHeader>} />
        </Routes>
        <Footer className="text-center bg-gray-200 py-4"/>
      </div>
    </Router>
  );
}

export default App;