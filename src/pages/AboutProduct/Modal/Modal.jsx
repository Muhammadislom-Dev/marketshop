import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./Modal.css";
import { ObjectIcon } from "../../../assets/icon";
import { useTranslation } from "react-i18next";
import Login from "../../Login/Login";
import Register from "../../Register/Register";

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
  const { t } = useTranslation();

  return (
    <>
      <button onClick={handleOpen} className="call__link">
        {t("hello30")}
      </button>
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
                  {t("hello15")}
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
                  {t("hello14")}
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
