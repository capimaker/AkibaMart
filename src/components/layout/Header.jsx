import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/UserContext";

import "./header.css";

const Header = () => {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/home" className="logo">AkibaMart</Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          {user ? (
            <>
              <li><Link to="/profile" onClick={() => setIsOpen(false)}>Perfil</Link></li>
              <li><button onClick={() => { logout(); setIsOpen(false); }} className="logout-btn">Cerrar sesión</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setIsOpen(false)}>Iniciar sesión</Link></li>
              <li><Link to="/register" onClick={() => setIsOpen(false)}>Registrarse</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
