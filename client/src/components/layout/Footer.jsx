import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from 'react-icons/fa6';
import './Footer.css';
import logo from '../../assets/logo.jpg';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-section--brand">
          <Link to="/" className="footer-brand" aria-label="Accueil — NOUJOM, Les Étoiles du Souss">
            <img
              src={logo}
              alt=""
              className="footer-logo"
              width={56}
              height={56}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <span className="footer-brand-text">
              <span className="footer-brand-name">NOUJOM</span>
              <span className="footer-brand-sub">Centre culturel · Souss-Massa</span>
            </span>
          </Link>
          <h3 className="footer-title">Les Étoiles du Souss</h3>
          <p className="footer-description">
            Arts, formation et diffusion culturelle au Souss — porté par la Fondation Ali Zaoua.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contact</h4>
          <address className="footer-contact">
            <p>Hay El Farah, Agadir</p>
            <p>
              <a href="mailto:info@lesetoiles.ma">info@lesetoiles.ma</a>
            </p>
            <p className="footer-phone">+212 6 81 04 08 70</p>
          </address>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Suivez-nous</h4>
          <div className="social-links">
            <a href="https://www.facebook.com/centrenojoum/?locale=fr_FR" className="social-link social-link--facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/lesetoilesmaroc/?hl=en" className="social-link social-link--instagram" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://twitter.com/centrenojoum" className="social-link social-link--twitter" aria-label="X" target="_blank" rel="noopener noreferrer">
              <FaXTwitter />
            </a>
            <a href="https://www.youtube.com/channel/UC8XJ5F5F5F5F5F5F5F5F5F5" className="social-link social-link--youtube" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Centre culturel Les Étoiles. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
