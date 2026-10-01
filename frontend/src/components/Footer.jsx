import { Link } from 'react-router-dom';
import r4mLogo from '../assets/r4m-logo.png';
import '../styles/components/Footer.css';

export default function Footer() {
  return (
    <footer className="r4m-footer-section">
      {/* Pre-footer Call to Action Banner */}
      <div className="r4m-footer-cta">
        <div className="r4m-footer-cta__container">
          <h2 className="r4m-footer-cta__title">
            Ready to build a<br />reliable team?
          </h2>
          <Link to="/contact" className="r4m-footer-cta__btn">
            CONTACT US
          </Link>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="r4m-footer-main">
        <div className="r4m-footer-main__container">
          <div className="r4m-footer__grid">

            {/* Column 1: Logo & Branding */}
            <div className="r4m-footer__col r4m-footer__col--brand">
              <Link to="/admin/login">
                <img src={r4mLogo} alt="R4M Talent Solutions" className="r4m-footer__logo" />
              </Link>
            </div>

            {/* Column 2: Navigation Links */}
            <div className="r4m-footer__col">
              <ul className="r4m-footer__links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/jobs">Career Opportunities</Link></li>
                <li><Link to="/insights">Insights & Articles</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="r4m-footer__col">
              <h4 className="r4m-footer__heading">Contact Us</h4>
              <p className="r4m-footer__text">
                <a href="mailto:info@r4minfiniteventuresinc.com">info@r4minfiniteventures.com</a>
              </p>
              <p className="r4m-footer__text">+63 917 194 0129</p>
            </div>

            {/* Column 4: Office Address */}
            <div className="r4m-footer__col">
              <h4 className="r4m-footer__heading">Office Address</h4>
              <p className="r4m-footer__text">216 Winland Tower Residences 4</p>
              <p className="r4m-footer__text">Tomas Morato, Quezon City</p>
            </div>

          </div>

          {/* Bottom Divider Line */}
          <div className="r4m-footer__divider"></div>

          {/* Sub-footer Copyright & Social Icons */}
          <div className="r4m-footer__bottom">
            <p className="r4m-footer__copyright">
              © Copyright R4M Talent Solutions 2026. All Rights Reserved.
            </p>

            <div className="r4m-footer__socials">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">
                <i className="bi bi-tiktok"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
