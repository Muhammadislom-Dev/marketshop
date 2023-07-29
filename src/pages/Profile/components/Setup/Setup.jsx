import { useState } from "react";
import "./Setup.css";
import defaultImg from "../../../../assets/img/default-profile-img.png";
import { FaCamera } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useMutation, useQuery } from "react-query";
import { editUserPost, getSetupData, uploadImage } from "../../../../api";
import { useNavigate } from "react-router-dom";

export default function Setup() {
  // const [data, setData] = useState({ img: null });
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState({
    photosId: 15,
    sendAgain: true,
    codeToVerifyPhoneNumber: null,
    tokenToVerifyPhoneNumber: null,
  });
  const navigate = useNavigate();

  const mutation = useMutation((post) => uploadImage(post), {
    onSuccess: (data) => {
      setProduct(() => ({
        photosId: [data?.objectKoinot[0]?.id],
      }));
    },
    onError: (error) => alert(error?.message),
  });

  const { mutate, isLoading } = useMutation(
    (data) => editUserPost(data, setOpen),
    {
      onSuccess: (data) => {
        // setActiveModal(true);
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
        // alert(error.message);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(product);
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
          {/* {data.img ? (
            <img src={URL.createObjectURL(data.img)} alt="error" />
          ) : (
            <div className="setup-img-default">
              <img src={defaultImg} alt="error" />
              <FaCamera />
            </div>
          )} */}
          <input
            type="file"
            id="setup-profile-img"
            accept="image/*"
            onChange={(e) => {
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
                setProduct((state) => ({
                  ...state,
                  codeToVerifyPhoneNumber: e.target.value,
                }))
              }
              type="number"
              maxLength={500}
              min={3}
              required
            />
          </label>
        ) : (
          " "
        )}
        <div className="setup-btn-wrapper">
          {open === true ? (
            <button className="product-create-form-button" type="submit">
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
