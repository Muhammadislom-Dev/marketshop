import React, { useEffect, useState } from "react";
import "./Profile.css";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Announcement from "./components/Announcement/Announcement";
import ProductCreate from "./components/ProductCreate/ProductCreate";
import Setup from "./components/Setup/Setup";
import { AvatarIcon } from "../../assets/icon";
import { API_URL } from "../../api";
import ProductEdit from "./components/ProductEdit/ProductEdit";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { Navigate } from "react-router-dom";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Profile() {
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = useState();
  const [editId, setEditId] = useState("");
  const [category, setCategory] = useState("");

  const { t } = useTranslation();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    const response = axios
      .get(`${API_URL}/auth/v1/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        if (res?.data?.objectKoinot === null) {
          <Navigate to="/" replace />;
        }
      });
    return response.data;
  });

  return (
    <>
      <div className="profile">
        <div className="container">
          <div className="profileBackground">
            {!!userData && (
              <div className="profile-list">
                <img
                  src={
                    userData?.objectKoinot?.photo === null
                      ? AvatarIcon
                      : userData?.objectKoinot?.photo?.filePath
                  }
                  alt=""
                  className="profile-img"
                />
                <div className="profile-item">
                  <h3 className="profile-name">
                    {userData?.objectKoinot?.firstName === null
                      ? "UserName"
                      : userData?.objectKoinot?.firstName}
                  </h3>
                  <a
                    href={`tel:+${userData?.objectKoinot?.phoneNumber}`}
                    className="profile-number">
                    +{userData?.objectKoinot?.phoneNumber}
                  </a>
                </div>
              </div>
            )}
          </div>
          <div className="profileBackground-mobile">
            {!!userData && (
              <div className="profile-list">
                <img
                  src={
                    userData?.objectKoinot?.photo === null
                      ? AvatarIcon
                      : userData?.objectKoinot?.photo?.filePath
                  }
                  alt=""
                  className="profile-img"
                />
                <div className="profile-item">
                  <h3 className="profile-name">
                    {userData?.objectKoinot?.firstName === null
                      ? ""
                      : userData?.objectKoinot?.firstName}
                  </h3>
                  <a
                    href={`tel:+${userData?.objectKoinot?.phoneNumber}`}
                    className="profile-number">
                    +{userData?.objectKoinot?.phoneNumber}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="profile-tab">
        <div className="container">
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "#E9E9E9" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example">
                <Tab label={t("hello48")} {...a11yProps(0)} />
                <Tab label={t("hello49")} {...a11yProps(1)} />
                <Tab label={t("hello50")} {...a11yProps(2)} />
                <Tab label={t("hello51")} {...a11yProps(3)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Announcement
                setCategory={setCategory}
                setEditId={setEditId}
                setValue={setValue}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <ProductCreate editId={editId} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Setup />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
              <ProductEdit editId={editId} />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </>
  );
}

export default Profile;
