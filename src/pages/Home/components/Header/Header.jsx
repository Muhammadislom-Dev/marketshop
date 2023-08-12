import React, { useState } from "react";
import "./Header.css";
import { SearchIcon } from "../../../../assets/icon";
import { data } from "./data";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import {
  fetchDistrictData,
  fetchRegionData,
  getCategory,
} from "../../../../api";
import { Box, CircularProgress, InputLabel } from "@mui/material";

function Header({
  code,
  setCode,
  setSearch,
  handleClear,
  age,
  setAge,
  handleChangeValue,
}) {
  const { data: category } = useQuery("get category", getCategory);
  const [district, setDistrict] = useState("Tuman");
  const handleChange = (event) => {
    setAge(event?.target?.value);
    setCode(event?.target?.value);
  };

  const i18next = localStorage.getItem("i18nextLng");

  const {
    data: region,
    isLoading,
    isError,
  } = useQuery("exampleData", fetchRegionData);

  const { data: districtData } = useQuery(["product", code], () =>
    fetchDistrictData(code)
  );

  const handleDistrict = (event) => {
    setDistrict(event?.target?.value);
  };

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

  if (isError) {
    return <p>Xatolik yuz berdi.</p>;
  }

  return (
    <div className="header">
      <div className="container">
        <div className="header-bgimage">
          <h1>EHSONNING MUKOFATI EHSON</h1>
          <div className="header-item">
            <FormControl
              sx={{ m: 1, minWidth: 160, width: 160 }}
              className="header-select">
              <InputLabel id="demo-simple-select-label1">Shahar</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select"
                label="Shahar"
                value={age}
                onChange={handleChange}>
                <MenuItem onClick={handleClear} value="">
                  Shahar
                </MenuItem>
                {region.objectKoinot.content.map((data) => (
                  <MenuItem key={data.id} value={data.id}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl
              sx={{ m: 1, minWidth: 160, width: 160 }}
              className="header-select">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district}
                onChange={handleDistrict}>
                <MenuItem value="Tuman">Tuman</MenuItem>
                {districtData?.objectKoinot?.content?.map((data) => (
                  <MenuItem key={data.id} value={data.id}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <label htmlFor="">
              <img src={SearchIcon} alt="" className="header-icon" />
              <input
                type="search"
                placeholder="Nimadir qidiramizmi?"
                className="header-input"
                onChange={handleChangeValue}
              />
            </label>
          </div>
          <div className="header-list">
            {category?.objectKoinot?.map((data) => (
              <Link key={data.id} to={`/${data.id}`} className="header-link">
                <span className="header-link-span">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: data.icon,
                    }}
                  />
                </span>
                <p className="header-subname">
                  {i18next === "ru" ? data.nameRu : data.nameUz}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
