import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import authService from '../../services/authService';
import './Navbar.css';
import logo from "../../assets/logo.jpg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [atHeroTop, setAtHeroTop] = useState(() => typeof window !== 'undefined' && window.location.pathname === '/');
  const { token, user } = useSelector((state) => state.auth);
  const isAdmin = Boolean(token && user?.role === 'admin');
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setAtHeroTop(false);
      return undefined;
    }
    const threshold = () => Math.min(window.innerHeight * 0.7, 620);
    const onScrollOrResize = () => {
      setAtHeroTop(window.scrollY < threshold());
    };
    onScrollOrResize();
    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [location.pathname]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const mq = () => window.matchMedia('(max-width: 768px)').matches;
    if (mq()) {
      document.body.style.overflow = 'hidden';
    }
    const onResize = () => {
      if (!mq()) setIsOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const handleLogout = async () => {
    await authService.logout();
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <nav
      className={`navbar${location.pathname === '/' && atHeroTop && !isOpen ? ' navbar--hero' : ''}`}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img 
            src={logo} 
            alt="Les Étoiles" 
            className="logo-img"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </Link>

        <button
          type="button"
          className={`menu-toggle ${isOpen ? 'menu-toggle--open' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          aria-controls="primary-navigation"
        >
          <span className="menu-toggle__bar" aria-hidden="true" />
          <span className="menu-toggle__bar" aria-hidden="true" />
          <span className="menu-toggle__bar" aria-hidden="true" />
        </button>

        <ul
          id="primary-navigation"
          className={`navbar-menu ${isOpen ? 'navbar-menu--open' : ''}`}
        >
          <li className="navbar-item">
            <Link 
              to="/" 
              className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </Link>
          </li>
          <li className="navbar-item">
            <Link 
              to="/events" 
              className={`navbar-link ${location.pathname === '/events' ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              Événements
            </Link>
          </li>
          {token ? (
            <>
              {isAdmin && (
                <li className="navbar-item">
                  <Link
                    to="/admin"
                    className={`navbar-link ${location.pathname === '/admin' ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li className="navbar-item">
                <button type="button" className="navbar-logout" onClick={handleLogout}>
                  Déconnexion
                </button>
              </li>
            </>
          ) : isAdmin ? (
            <li className="navbar-item">
              <Link 
                to="/login" 
                className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                Admin
              </Link>
            </li>
          ) : null}
        </ul>
      </div>

      <button
        type="button"
        className={`navbar-backdrop ${isOpen ? 'navbar-backdrop--open' : ''}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
      />
    </nav>
  );
};

export default Navbar;