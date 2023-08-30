import React, { useState } from "react";
import { useMutation } from "react-query";
import "./Register.css";
import { registerUser } from "../../api";
import SmsCode from "../SmsCode/SmsCode";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";

function Register({ handleClose }) {
  const [value, setValue] = useState();
  const [code, setCode] = useState(false);
  const mutation = useMutation((userData) => registerUser(userData, setCode));
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      phoneNumber: value?.slice(1, 14),
    });
  };

  return (
    <>
      {code === true ? (
        <SmsCode handleClose={handleClose} phoneNumber={value} />
      ) : (
        <div>
          <h3 className="register-name">{t("hello14")}</h3>
          <form onSubmit={handleSubmit} action="" className="register-form">
            <label htmlFor="phoneNumber">
              {t("hello45")}
              <PhoneInput
                value={value}
                international
                style={{ marginTop: "10px" }}
                defaultCountry="UZ"
                limitMaxLength={14}
                onChange={setValue}
              />
            </label>
            <p style={{ width: "450px" }}>{t("hello69")}</p>
            <div className="register-label">
              <input required type="checkbox" />
              <p>{t("hello70")}</p>
            </div>
            <button type="submit" className="form-button">
              {t("hello14")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Register;
