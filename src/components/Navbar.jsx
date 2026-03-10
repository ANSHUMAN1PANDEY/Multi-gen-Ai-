import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="navbar-logo"></span>
        Multi Gen AI
      </Link>
      
      <button 
        className="mobile-menu-btn" 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`navbar-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <NavLink to="/" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
          Home
        </NavLink>
        <NavLink to="/tools" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
          AI Tools
        </NavLink>
        <NavLink to="/pricing" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
          Pricing
        </NavLink>
        <NavLink to="/dashboard" className={({isActive}) => isActive ? "nav-link active" : "nav-link"} onClick={() => setIsMobileMenuOpen(false)}>
          Dashboard
        </NavLink>
        
        {/* Render nav actions inside mobile menu when open */}
        {isMobileMenuOpen && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
            <Link to="/login" className="btn-secondary btn-nav" style={{ textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="btn-primary btn-nav" style={{ textAlign: 'center' }} onClick={() => setIsMobileMenuOpen(false)}>
              Sign Up
            </Link>
          </div>
        )}
      </div>

      <div className="nav-actions" style={{ gap: '12px' }}>
        <Link to="/login" className="btn-secondary btn-nav" style={{ padding: '8px 16px', border: 'none' }}>
          Login
        </Link>
        <Link to="/signup" className="btn-primary btn-nav">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
