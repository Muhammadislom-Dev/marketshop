import React, { useState } from "react";
import "./Login.css";
import { useMutation } from "react-query";
import { loginUser } from "../../api";

function Login() {
  const [formData, setFormData] = useState({
    phoneNumber: "998",
    password: "",
  });
  const [code, setCode] = useState(false);
  const mutation = useMutation((userData) => loginUser(userData, setCode));

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
      <h3 className="register-name">Ro‘yhatdan o‘tish</h3>
      <form onSubmit={handleSubmit} action="" className="register-form">
        <label htmlFor="">
          Telefon raqam
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            type="number"
            className="register-input"
          />
        </label>
        <label htmlFor="">
          Parol
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
          Parolni unutdingizmi?
        </a>
        <button type="submit" className="form-button">
          Kirish
        </button>
      </form>
    </div>
  );
}

export default Login;
