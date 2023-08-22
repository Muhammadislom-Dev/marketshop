import React, { useState } from "react";
import { useMutation } from "react-query";
import "./Login.css";
import { registerUser } from "../../api";
import SmsCode from "../SmsCode/SmsCode";
import { useTranslation } from "react-i18next";

function Login({ handleClose }) {
  const [formData, setFormData] = useState({
    phoneNumber: "",
  });
  const [code, setCode] = useState(false);
  const mutation = useMutation((userData) => registerUser(userData, setCode));
  const { t } = useTranslation();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (/^[0-9+-]*$/.test(value)) {
      // 998 bilan boshlanganligini tekshiramiz
      if (value.startsWith("998")) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: "998" + value, // 998 bilan boshlash
        }));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
      {code === true ? (
        <SmsCode handleClose={handleClose} phoneNumber={formData.phoneNumber} />
      ) : (
        <div>
          <h3 className="register-name">{t("hello15")}</h3>
          <form onSubmit={handleSubmit} action="" className="register-form">
            <label htmlFor="phoneNumber">
              {t("hello45")}
              <input
                type="tell"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="register-input"
                maxLength="13"
                required
                placeholder="998"
                pattern="^[0-9+-]*$"
              />
            </label>
            <button type="submit" className="form-button">
              {t("hello14")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
