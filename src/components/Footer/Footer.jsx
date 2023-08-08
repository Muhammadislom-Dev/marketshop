import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TekinMarket,
  TelegramIcon,
} from "../../assets/icon";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-flex">
          <img src={TekinMarket} alt="" className="footer-img" />
          <div className="footer-list">
            <div className="footer-left">
              <ul className="footer-item">
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    Yordam
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    Saytda reklama
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    Maxfiylik siyosati
                  </a>
                </li>
              </ul>
              <ul className="footer-item">
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    Xavsizlik qoidalari
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    Sayt xaritasi
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    Foydalanish shartlari
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-bottom">
              <a href="#" className="footer-links">
                <img src={FacebookIcon} alt="" className="footer-icon" />
              </a>
              <a href="#" className="footer-links">
                <img src={TelegramIcon} alt="" className="footer-icon" />
              </a>
              <a href="#" className="footer-links">
                <img src={InstagramIcon} alt="" className="footer-icon" />
              </a>
            </div>
            <div className="footer-right">
              <h4 className="footer-name">Obuna bo‘ling</h4>
              <p className="footer-text">
                Bizda bo‘layotgan yangiliklardan xabordor bo‘lishni istasangiz
                bizga obuna bo’ling!
              </p>
              <label htmlFor="">
                <input
                  type="email"
                  placeholder="E-pochta kiriting"
                  className="footer-input"
                />
                <button className="footer-button">Obuna bo‘lish</button>
              </label>
            </div>
          </div>
          <div className="footer-bottomlast">
            <a href="#" className="footer-links">
              <img src={FacebookIcon} alt="" className="footer-icon" />
            </a>
            <a href="#" className="footer-links">
              <img src={TelegramIcon} alt="" className="footer-icon" />
            </a>
            <a href="#" className="footer-links">
              <img src={InstagramIcon} alt="" className="footer-icon" />
            </a>
          </div>

          <p className="footer-texts">
            © 2023 - Tekin Market Barcha huquqlar ximoyalangan
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
