import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext/UserState";
import "./header.css";
import { ProductContext } from "../../context/ProductContext/ProductState";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import logo from '../image/Logo.png'
import { AiOutlineHome } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { IoSearchOutline, IoBookOutline, IoLogInOutline } from "react-icons/io5";
import { FiUserPlus, FiUser, FiUserMinus } from "react-icons/fi";

const Header = () => {
  const { token, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { cart } = useContext(ProductContext);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/home" className="logo">
          <img src={logo} alt="Logo" />
        </Link>
         <div className="header__search">
          {/* Conectar con buscador */}
            <input type="text" placeholder="Busca aquí" className='barra'></input>
            <IoSearchOutline className="search-icon"/>
        </div>

        <div className={`nav-links ${isOpen ? "open" : ""}`}>
        
        <div className="header__icons">

          {token ? (
            <>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <FiUser />
                </Link>
                <span
                  onClick={async () => {
                    await logout();
                    setIsOpen(false);
                    navigate("/home");
                  }}
                  className="logout__icon"
                >
                  <FiUserMinus />
                </span>
            </>
          ) : (
            <>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <IoLogInOutline />
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <FiUserPlus />
                </Link>
          <Link to="/products" onClick={() => setIsOpen(false)}>
              <IoBookOutline />
              </Link>
          <Link to="/cart" onClick={() => setIsOpen(false)}>
              <Badge count={cart?.length || 0} offset={[5, -5]}  className="Cart__icon">
                 <BsCart2 />
              </Badge>
              </Link>
            </>
          )}
        </div>
        </div>
        <button className="menu-toggle" onClick={toggleMenu}>
           ☰
        </button>
      </nav>
    </header>
  );
};

export default Header;
