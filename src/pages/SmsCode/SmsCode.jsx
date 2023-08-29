import React, { useEffect, useState } from "react";
import { PhoneSmsCode } from "../../api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";

function SmsCode({ phoneNumber, handleClose }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [formData, setFormData] = useState({
    token: token,
    phoneNumber: phoneNumber.slice(1, 14),
    code: "",
  });
  const [remainingTime, setRemainingTime] = useState(120); // 2 daqiqa uchun

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingTime]);
  const { mutate, isLoading } = useMutation((userData) =>
    PhoneSmsCode(userData, navigate, handleClose)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
    setRemainingTime(120);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={"80vh"}>
        <CircularProgress
          color="success"
          style={{ width: "100px", height: "100px" }}
        />
      </Box>
    );
  }

  return (
    <div>
      <h3 className="register-name">{t("hello71")}</h3>
      <form onSubmit={handleSubmit} action="" className="register-form">
        <label htmlFor="code">
          {t("hello71")}
          <input
            type="text"
            id="code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            className="register-input"
            required
          />
        </label>
        <p>
          {phoneNumber} {t("hello72")}
        </p>
        {remainingTime > 0 ? (
          <p style={{ color: "#f26957" }}>
            {remainingTime} {t("hello73")}
          </p>
        ) : null}
        <button type="submit" className="form-button">
          {t("hello74")}
        </button>
      </form>
    </div>
  );
}

export default SmsCode;
