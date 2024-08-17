import React from 'react'; // Import React knihovny pro použití JSX
import { Link } from 'react-router-dom'; // Import komponenty Link pro navigaci mezi stránkami

// Komponenta Footer zobrazuje patičku webové stránky
const Footer = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/pricing", label: "Pricing" },
    { path: "/faqs", label: "FAQs" },
    { path: "/about", label: "About" },
  ];

  return (
    <footer className="footer py-3 my-4">
      <nav>
        <ul className="nav justify-content-center border-top pt-3">
          {/* Seznam navigačních odkazů */}
          {navLinks.map((link, index) => (
            <li className="nav-item" key={index}>
              <Link to={link.path} className="nav-link px-2 text-body-secondary">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      {/* Text s informacemi o autorských právech */}
      <p className="text-center text-body-secondary mt-3">© 2024 Roman Bohos</p>
    </footer>
  );
};

export default Footer; // Export komponenty pro použití v dalších částech aplikace
