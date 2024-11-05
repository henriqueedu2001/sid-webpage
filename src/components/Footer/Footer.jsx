import Image from 'next/image';
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-container">
          <img
            src="/usp.png"
            alt="USP Logo"
          />
          <img
            src="/poli.png" 
            alt="Escola Politécnica Logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
