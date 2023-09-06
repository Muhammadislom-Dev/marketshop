import React from "react";
import { Link } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import { getCategory } from "../../api";
import { useQuery } from "react-query";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { SlArrowRight } from "react-icons/sl";
import "./CategoryModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "80%",
  bgcolor: "background.paper",
  border: "2px solid #fff",
};

function CategoryModal() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { data } = useQuery("get category", getCategory);
  const i18next = localStorage.getItem("i18nextLng");
  return (
    <div className="categorymodal">
      <div className="container">
        <div onClick={handleOpen} className="fixed-navbar-Ic">
          <BiCategory className="fixNavIconL" />
          <h4>{t("hello58")}</h4>
        </div>
      </div>
      <Modal
        open={open}
        className="modal-navbar-category"
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="categorymodal-list">
            <ul className="categorymodal-item">
              {data?.objectKoinot?.length
                ? data.objectKoinot.map((el) => (
                    <li onClick={handleClose} key={el.id} className="categorymodal-title">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: el.iconInSelect,
                        }}
                      />
                      <Link to={`/${el.id}`}>
                        {i18next === "uz" ? el.nameUz : el.nameRu}
                      </Link>
                      <SlArrowRight />
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default CategoryModal;
