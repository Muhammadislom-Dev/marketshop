import React, { useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  TekinMarket,
  TelegramIcon,
} from "../../assets/icon";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "react-query";
import { footerLinkApiData, postEmailRequest } from "../../api";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();
  const [emailValue, setEmailValue] = useState("");
  const { data } = useQuery("footer", footerLinkApiData);

  const { mutate } = useMutation((emailValue) => postEmailRequest(emailValue));

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(emailValue);
    setEmailValue("");
  };

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
                <li className="footer-items">
                  <Link to="/blog" className="footer-link">
                    {t("blog")}
                  </Link>
                </li>
              </ul>
              <ul className="footer-item">
                <li className="footer-items">
                  <a href="#" className="footer-link">
                    {t("hello95")}
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
                <li className="footer-items">
                  <a href="tel:+998954409090" className="footer-link">
                    +998 95 440 90 90
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
              <h4 className="footer-name">{t("hello10")}</h4>
              <p className="footer-text">{t("hello11")}</p>
              <label htmlFor="">
                <input
                  type="email"
                  value={emailValue}
                  placeholder={t("hello81")}
                  className="footer-input"
                  onChange={(e) => setEmailValue(e.target.value)}
                />
                <button onClick={handleSubmit} className="footer-button">
                  {t("hello10")}
                </button>
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

          <p className="footer-texts">© 2023 - {t("hello12")}</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
