import React, { useState } from "react";
import "./Login.css";
import { useMutation } from "react-query";
import { loginUser } from "../../api";
import { useTranslation } from "react-i18next";

function Login({ handleClose }) {
  const [formData, setFormData] = useState({
    phoneNumber: "998",
    password: "",
  });
  const [code, setCode] = useState(false);
  const mutation = useMutation((userData) =>
    loginUser(userData, setCode, handleClose)
  );
  const { t } = useTranslation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };
  return (
    <div>
      <h3 className="register-name">{t("hello30")}</h3>
      <form onSubmit={handleSubmit} action="" className="register-form">
        <label htmlFor="">
          {t("hello45")}
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            type="number"
            maxLength="14"
            className="register-input"
          />
        </label>
        <label htmlFor="">
          {t("hello46")}
          <input
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="register-input"
          />
        </label>
        <a className="login-password" href="#">
          {t("hello47")}
        </a>
        <button type="submit" className="form-button">
          {t("hello15")}
        </button>
      </form>
    </div>
  );
}

export default Login;
