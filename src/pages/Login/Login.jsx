import React, { useState } from "react";
import { useMutation } from "react-query";
import "./Login.css";
import { registerUser, sendCodeLogin } from "../../api";
import SmsCode from "../SmsCode/SmsCode";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";

function Login({ handleClose }) {
  const [value, setValue] = useState();
  const [code, setCode] = useState(false);
  const mutation = useMutation((userData) => sendCodeLogin(userData, setCode));
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      phoneNumber: value?.slice(1, 14),
      token: null,
      code: null,
    });
  };

  return (
    <>
      {code === true ? (
        <SmsCode handleClose={handleClose} phoneNumber={value} />
      ) : (
        <div>
          <h3 className="register-name">{t("hello15")}</h3>
          <form onSubmit={handleSubmit} action="" className="register-form">
            <label style={{ width: "100%" }} htmlFor="phoneNumber">
              {t("hello45")}
              <PhoneInput
                value={value}
                international
                defaultCountry="UZ"
                limitMaxLength={14}
                onChange={setValue}
                style={{ marginTop: "10px" }}
              />
            </label>
            <button type="submit" className="form-button">
              {t("hello15")}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
