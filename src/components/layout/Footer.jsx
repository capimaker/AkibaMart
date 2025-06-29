import React from 'react'
import './Footer.css'
import logo from '../image/Logo.png';
const Footer = () => {
  return (
    <footer className='footer'>
        <div className='logo__footer'>
            <img src={logo} alt="Logo" />
        </div>
        <h3>2025 AkibaMart. Todos los derechos reservados</h3>
    </footer>
  )
}

export default Footer