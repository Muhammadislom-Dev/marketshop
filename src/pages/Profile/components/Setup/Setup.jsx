import { useState } from "react";
import "./Setup.css";
import defaultImg from "../../../../assets/img/default-profile-img.png";
import { FaCamera } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { editUserPost, getSetupData, uploadImage } from "../../../../api";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  const token = localStorage.getItem("tokenReview");
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    photosId: 15,
    sendAgain: true,
    codeToVerifyPhoneNumber: null,
    tokenToVerifyPhoneNumber: null,
  });
  const [profile, setProfile] = useState({
    photosId: null,
    firstname: null,
    lastname: null,
    password: null,
    oldpassword: null,
    sendAgain: true,
    tokenToVerifyPhoneNumber: token,
  });
  const navigate = useNavigate();

  const mutation = useMutation((post) => uploadImage(post), {
    onSuccess: (data) => {
      setProduct(() => ({
        photosId: [data?.objectKoinot[0]?.id],
      }));
    },
    onError: (error) => console.log(error?.message),
  });

  const { mutate, isLoading } = useMutation(
    (data) => editUserPost(data, setOpen),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(product);
  };

  const handleReview = (e) => {
    e.preventDefault();
    mutate(profile);
  };

  function handleDeleteProfile() {
    localStorage.removeItem("accessToken");
    window.location.reload();
    navigate("/");
  }

  return (
    <div className="setup">
      <div className="setup-img">
        <h3>Profil rasmi</h3>
        <label htmlFor="setup-profile-img" className="setup-img-upload">
          {data ? (
            <img src={!!data && URL?.createObjectURL(data)} alt="error" />
          ) : (
            <div className="setup-img-default">
              <img src={defaultImg} alt="error" />
              <FaCamera />
            </div>
          )}

          <input
            type="file"
            id="setup-profile-img"
            accept="image/*"
            onChange={(e) => {
              setData(e.target.files[0]);
              mutation.mutate({ key: e.target.files[0] });
            }}
          />
          <span>Rasm yuklash</span>
        </label>
      </div>
      <form className="product-create-form" onSubmit={handleSubmit}>
        <label className="product-create-label">
          <h4>First Name</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                firstname: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Last Name</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                lastname: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Password</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                password: e.target.value,
              }))
            }
            type="password"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Old Password</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                oldpassword: e.target.value,
              }))
            }
            type="password"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Telefon raqam</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
            type="number"
            maxLength={14}
            min={3}
            required
          />
        </label>
        {open === true ? (
          <label className="product-create-label">
            <h4>Sms Code</h4>
            <input
              onChange={(e) =>
                setProfile((state) => ({
                  ...state,
                  codeToVerifyPhoneNumber: e.target.value,
                }))
              }
              type="number"
              maxLength={5}
              min={3}
              required
            />
          </label>
        ) : (
          " "
        )}
        <div className="setup-btn-wrapper">
          {open === true ? (
            <button
              onClick={handleReview}
              className="product-create-form-button">
              Tasdiqlash
            </button>
          ) : (
            <button className="product-create-form-button" type="submit">
              Yangilash
            </button>
          )}
          <button
            onClick={handleDeleteProfile}
            className="setup-logOut"
            type="button">
            <BiLogOut />
            <span>Profildan chiqish</span>
          </button>
        </div>
      </form>
    </div>
  );
}
