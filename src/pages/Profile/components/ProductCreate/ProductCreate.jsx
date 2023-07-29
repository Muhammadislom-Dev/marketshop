import "./ProductCreate.css";
import { BsPlusCircle } from "react-icons/bs";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useMutation, useQuery } from "react-query";
import {
  createProduct,
  fetchDistrictData,
  fetchRegionData,
  getCategory,
  uploadImage,
} from "../../../../api";
import ProductModal from "../ProductModal/ProductModal";
import { Box, CircularProgress } from "@mui/material";

export default function ProductCreate() {
  const [imgBox, setimageBox] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [product, setProduct] = useState({
    categoryId: 1,
    active: true,
    delete: true,
    top: true,
    photosId: [],
    productQuality: "AVERAGE",
    regionId: 1,
    districtId: 1,
  });

  const mutation = useMutation((post) => uploadImage(post), {
    onSuccess: (data) => {
      setProduct((state) => ({
        ...state,
        photosId: [...state.photosId, data.objectKoinot[0]?.id],
      }));
    },
    onError: (error) => alert(error?.message),
  });

  const { productMutation, isLoading } = useMutation(
    (data) => createProduct(data),
    {
      onSuccess: (data) => {
        setActiveModal(true);
      },
      onError: (error) => {
        alert(error.message);
      },
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    productMutation.mutate(product);
  };
  const { data } = useQuery("category", getCategory);
  const region = useQuery("regionId", fetchRegionData);
  const district = useQuery("districtId", () =>
    fetchDistrictData(product.regionId)
  );
  useEffect(() => {
    district.refetch();
  }, [product.regionId]);

  useEffect(() => {
    setProduct((state) => ({
      ...state,
      districtId: district?.data?.objectKoinot?.content[0]?.id,
    }));
  }, [district.data]);

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
      {activeModal ? <ProductModal /> : null}
      <div className="addImage">
        <h3 className="addImage-title">Rasm qo’shish</h3>
        <div className="addImage-box">
          {imgBox?.map((el, index) =>
            el ? (
              <img
                key={index}
                src={URL.createObjectURL(el)}
                alt="error"
                className="addImage-box-item"
              />
            ) : null
          )}
          <label htmlFor="create-product-img" className="addImage-box-button">
            <BsPlusCircle />
            <span>Rasm qo’shish</span>
            <input
              type="file"
              id="create-product-img"
              accept="image/*"
              onChange={(e) => {
                setimageBox((state) => [...state, e.target.files[0]]);
                mutation.mutate({ key: e.target.files[0] });
              }}
            />
          </label>
        </div>
        <h4 className="addImage-warning">Muhim</h4>
        <span className="addImage-warning-desc">
          Surat 1080X1080px boʻlishi va 5 MB dan oshmasligi kerak
        </span>
      </div>
      <form className="product-create-form" onSubmit={handleSubmit}>
        <label className="product-create-label">
          <h4>Sarlavha</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                name: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Tovar haqida</h4>
          <textarea
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                description: e.target.value,
              }))
            }
            rows="10"
            maxLength={500}
            min={3}
            required></textarea>
        </label>
        <label className="product-create-label">
          <h4>Kategoriya</h4>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={product.categoryId}
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  categoryId: e.target.value,
                }))
              }
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              {data?.objectKoinot?.length ? (
                data?.objectKoinot?.map((el, index) => (
                  <MenuItem key={index} value={el?.id}>
                    {el?.nameUz}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value={1}>Kiyim-Kechak</MenuItem>
              )}
            </Select>
          </FormControl>
        </label>
        <label className="product-create-label">
          <h4>Product Holati</h4>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  productQuality: e.target.value,
                }))
              }
              value={product.productQuality}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value="AVERAGE">AVERAGE</MenuItem>
              <MenuItem value="NEW">NEW</MenuItem>
              <MenuItem value="TOP">TOP</MenuItem>
            </Select>
          </FormControl>
        </label>
        <label className="product-create-label">
          <h4>Shahar</h4>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  regionId: e.target.value,
                }))
              }
              value={product.regionId}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              {region.data
                ? region.data.objectKoinot.content.map((el) => (
                    <MenuItem key={el.id} value={el.id}>
                      {el.name}
                    </MenuItem>
                  ))
                : null}
            </Select>
          </FormControl>
        </label>
        <label className="product-create-label">
          <h4>Tuman</h4>
          {district.data ? (
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                onChange={(e) =>
                  setProduct((state) => ({
                    ...state,
                    districtId: e.target.value,
                  }))
                }
                value={product.districtId}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}>
                {district.data.objectKoinot.content.map((el) => (
                  <MenuItem key={el.id} value={el.id}>
                    {el.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : null}
        </label>
        <label className="product-create-label">
          <h4>Top</h4>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
              onChange={(e) =>
                setProduct((state) => ({
                  ...state,
                  top: e.target.value,
                }))
              }
              value={product.top}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}>
              <MenuItem value={true}>True</MenuItem>
              <MenuItem value={false}>False</MenuItem>
            </Select>
          </FormControl>
        </label>
        <label className="product-create-label">
          <h4>Telefon raqamingiz</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                phoneNumber: e.target.value,
              }))
            }
            type="tel"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Narxi</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                price: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>
        <label className="product-create-label">
          <h4>Manzil</h4>
          <input
            onChange={(e) =>
              setProduct((state) => ({
                ...state,
                address: e.target.value,
              }))
            }
            type="text"
            maxLength={500}
            min={3}
            required
          />
        </label>

        <button className="product-create-form-button" type="submit">
          Joylashtirish
        </button>
      </form>
    </div>
  );
}
