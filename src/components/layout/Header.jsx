import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserState";
import "./header.css";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";

const Header = () => {
  const { token, logout } = useUser();     
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();  
  const { cart } = useContext(ProductContext);        

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/home" className="logo">AkibaMart</Link>

        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link to="/products" onClick={() => setIsOpen(false)}>
              Products
            </Link>
          </li>
          <li>
            <Link to="/cart" onClick={() => setIsOpen(false)}>
              <Badge count={cart?.length || 0} offset={[5, -5]}>
                <ShoppingCartOutlined style={{ fontSize: "20px" }} />
              </Badge>
            </Link>
          </li>

          {token ? (
            <>
              <li>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  Perfil
                </Link>
              </li>
              <li>
                <span
                  onClick={async () => {
                    await logout();
                    setIsOpen(false);
                    navigate("/home");
                  }}
                  style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                >
                  Logout
                </span>
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

