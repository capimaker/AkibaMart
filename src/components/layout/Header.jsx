
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser }             from "../../context/UserContext/UserState";

import "./header.css";

const Header = () => {
  const { token, logout } = useUser();     
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();          

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/home" className="logo">AkibaMart</Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {token ? (
            <>
              <li>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  Perfil
                </Link>
              </li>
              <li>
                <button
                  className="logout-btn"
                  onClick={async () => {
                    await logout();        
                    setIsOpen(false);
                    navigate("/home");        
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  Registrarse
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
