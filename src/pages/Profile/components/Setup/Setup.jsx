import { useEffect, useState } from "react";
import "./Setup.css";
import defaultImg from "../../../../assets/img/default-profile-img.png";
import { FaCamera } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import {
  API,
  API_URL,
  editUserPost,
  getSetupData,
  uploadImage,
} from "../../../../api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { t } from "i18next";
import PhoneInput from "react-phone-number-input";
import axios from "axios";

export default function Setup({ refetch }) {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [value, setValue] = useState();
  const [userData, setUserData] = useState();
  // const [product, setProduct] = useState({
  //   language: null,
  // });

  const phone = `+${userData?.phoneNumber}`;

  const { mutate: imageMutate } = useMutation(async (payload) => {
    return await API.fileUpload(payload)
      .then((res) => {
        setUserData((prev) => ({
          ...prev,
          photoId: res.data.objectKoinot[0].id,
        }));
        toast.success("Rasim muvofaqiyatli yuklandi");
      })
      .catch((err) => {
        toast.danger("Rasim yuklanmadi qaytadan urinib ko'ring");
      });
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/v1/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => setUserData(res?.data?.objectKoinot));
  }, []);

  const { mutate, isLoading } = useMutation((data) => editUserPost(data), {
    onSuccess: (data) => {
      refetch();
    },
    onError: (error) => {},
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      language: null,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
    };
    mutate(submitData);
  };

  const handleChange = (key, value) => {
    setUserData((prevState) => ({ ...prevState, [key]: value }));
  };

  function handleDeleteProfile() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    toast.success("Siz profilingizdan chiqdingiz!");
    navigate("/");
    window.location.reload();
  }

  console.log(userData);

  return (
    <>
      {!!userData && (
        <div className="setup">
          <div className="setup-img">
            <h3>{t("hello75")}</h3>
            <label htmlFor="setup-profile-img" className="setup-img-upload">
              {data ? (
                <img src={!!data && URL?.createObjectURL(data)} alt="error" />
              ) : (
                <div className="setup-img-default">
                  <img src={userData?.photo?.filePath} alt="error" />
                  <FaCamera />
                </div>
              )}

              <input
                type="file"
                id="setup-profile-img"
                accept="image/*"
                onChange={(e) => {
                  setData(e.target.files[0]);
                  imageMutate({ key: e.target.files[0] });
                }}
              />
              <span>{t("hello76")}</span>
            </label>
          </div>
          <form className="product-create-form" onSubmit={handleSubmit}>
            <label className="product-create-label">
              <h4>First Name</h4>
              <input
                onChange={(e) => handleChange("firstName", e.target.value)}
                type="text"
                maxLength={500}
                value={userData.firstName}
                min={3}
                required
              />
            </label>
            <label className="product-create-label">
              <h4>Last Name</h4>
              <input
                onChange={(e) => handleChange("lastName", e.target.value)}
                type="text"
                maxLength={500}
                min={3}
                required
                value={userData.lastName}
              />
            </label>
            <label className="product-create-label">
              <h4>{t("hello45")}</h4>
              <PhoneInput
                value={phone}
                onChange={setValue}
                international
                defaultCountry="UZ"
                limitMaxLength={14}
              />
            </label>

            <div className="setup-btn-wrapper">
              <button className="product-create-form-button" type="submit">
                {t("hello77")}
              </button>
              <button
                onClick={handleDeleteProfile}
                className="setup-logOut"
                type="button">
                <BiLogOut />
                <span>{t("hello78")}</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
