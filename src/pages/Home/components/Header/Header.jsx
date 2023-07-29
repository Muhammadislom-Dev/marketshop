import React, { useState } from "react";
import "./Header.css";
import { SearchIcon } from "../../../../assets/icon";
import { data } from "./data";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useQuery } from "react-query";
import { fetchDistrictData, fetchRegionData } from "../../../../api";
import { Box, CircularProgress } from "@mui/material";

function Header({ code, setCode, setSearch, handleClear,age,setAge }) {
  
  const [district, setDistrict] = useState("Shahar");
  const handleChange = (event) => {
    setAge(event?.target?.value);
    setCode(event?.target?.value);
  };

  const {
    data: region,
    isLoading,
    isError,
  } = useQuery("exampleData", fetchRegionData);

  const { data: districtData } = useQuery(["product", code], () =>
    fetchDistrictData(code)
  );

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={"80vh"}
      >
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

  const handleDistrict = (event) => {
    setDistrict(event?.target?.value);
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header-bgimage">
          <h1>EHSONNING MUKOFATI EHSON</h1>
          <div className="header-item">
            <FormControl className="header-select">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={handleChange}
              >
                <MenuItem onClick={handleClear} value="">
                  Barchasi
                </MenuItem>
                {region.objectKoinot.content.map((data) => (
                  <MenuItem key={data.id} value={data.id}>
                    {data.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className="header-select">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={district}
                onChange={handleDistrict}
              >
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
                onChange={(e) => setSearch(e.target.value)}
              />
            </label>
          </div>
          <div className="header-list">
            {data?.map((data) => (
              <Link key={data.id} to="/" className="header-link">
                <img src={data.img} alt="" className="header-icons" />
                <p className="header-subname">{data.title}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
