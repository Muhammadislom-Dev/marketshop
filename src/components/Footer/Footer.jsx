import React from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TekinMarket,
  TelegramIcon,
} from "../../assets/icon";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { footerLinkApiData } from "../../api";

function Footer() {
  const { t } = useTranslation();

  const { data } = useQuery("footer", footerLinkApiData);

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
                    {t("yordam")}
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    {t("site")}
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    {t("security")}
                  </a>
                </li>
              </ul>
              <ul className="footer-item">
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    {t("xavfsizlik")}
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    {t("website")}
                  </a>
                </li>
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    {t("useful")}
                  </a>
                </li>
              </ul>
            </div>
            <div className="footer-bottom">
              <a href="#" className="footer-links">
                <img src={FacebookIcon} alt="" className="footer-icon" />
              </a>
              <a href={data?.telegramChannel} className="footer-links">
                <img src={TelegramIcon} alt="" className="footer-icon" />
              </a>
              <a href={data?.instagram} className="footer-links">
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
            <a href={data?.telegramChannel} className="footer-links">
              <img src={TelegramIcon} alt="" className="footer-icon" />
            </a>
            <a href={data?.instagram} className="footer-links">
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
