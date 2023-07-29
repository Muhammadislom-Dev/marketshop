import React, { useState } from "react";
import { useMutation } from "react-query";
import "./Register.css";
import { registerUser } from "../../api";
import SmsCode from "../SmsCode/SmsCode";

function Register({ handleClose }) {
  const [formData, setFormData] = useState({
    phoneNumber: "998",
  });
  const [code, setCode] = useState(false);
  const mutation = useMutation((userData) => registerUser(userData, setCode));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
          <h3 className="register-name">Ro‘yhatdan o‘tish</h3>
          <form onSubmit={handleSubmit} action="" className="register-form">
            <label htmlFor="phoneNumber">
              Telefon raqam
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="register-input"
                required
              />
            </label>
            <p style={{ width: "450px" }}>
              Men <a href="#">xizmatdan foydalanish qoidalarini</a>, shuningdek
              Tekin Marketga mening ma’lumotlarimni uzatish va qayta ishlashga
              rozilik bildiraman. Men voyaga yetganligimni va e’lon
              joylashtirish uchun javobgarligimni tasdiqlayman.
            </p>
            <div className="register-label">
              <input required type="checkbox" />
              <p>
                Ha, men Tekin Market dagi yangiliklar va aksiyalar haqida
                ma’lumot olishni xohlayman.
              </p>
            </div>
            <button type="submit" className="form-button">
              Ro‘yhatdan o‘tish
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Register;
