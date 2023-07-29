import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { UserIcon } from "../../assets/icon";
import "./Modal.css";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import { ObjectIcon } from "../../assets/icon";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1230,
  height: 550,
  bgcolor: "background.paper",
  border: "2px solid #fff",
  p: 4,
  borderRadius: "24px",
};

export default function LoginModal() {
  const token = localStorage.getItem("accessToken");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [login, setLogin] = React.useState("Kirish");

  return (
    <>
      {token ? (
        <Link to="/profile" className="navbar-profile">
          <img src={UserIcon} alt="" className="navbar-icon" />
          Hisobingiz
        </Link>
      ) : (
        <div onClick={handleOpen} className="navbar-link">
          <img src={UserIcon} alt="" className="navbar-icon" />
          Kirish
        </div>
      )}
      <Modal
        open={open}
        className="modal-login-body"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="modal-page">
            <div className="modal-left">
              <div className="login-list">
                <button
                  value="Kirish"
                  onClick={(e) => setLogin(e.target.value)}
                  style={{
                    backgroundColor: login === "Kirish" ? "#232323" : null,
                    color: login === "Kirish" ? "#fff" : null,
                  }}
                  className="login-button">
                  Kirish
                </button>
                <button
                  value="Ro‘yhatdan o‘tish"
                  onClick={(e) => setLogin(e.target.value)}
                  style={{
                    backgroundColor:
                      login === "Ro‘yhatdan o‘tish" ? "#232323" : null,
                    color: login === "Ro‘yhatdan o‘tish" ? "#fff" : null,
                  }}
                  className="login-button">
                  Ro‘yhatdan o‘tish
                </button>
              </div>

              {login === "Kirish" ? (
                <Login handleClose={handleClose} />
              ) : (
                <Register handleClose={handleClose} />
              )}
            </div>
            <div className="modal-right">
              <img src={ObjectIcon} className="modal-img" alt="" />
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
