import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="logo-container">
          <a href="https://www.poli.usp.br/">
            <img
              src="/usp.png"
              alt="USP Logo"
            />
            <img
              src="/poli.png" 
              alt="Escola Politécnica Logo"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
