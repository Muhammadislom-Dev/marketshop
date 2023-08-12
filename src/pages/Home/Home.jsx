import React, { useState } from "react";
import Header from "./components/Header/Header";
import Blog from "./components/Blog/Blog";
import Products from "./components/Products/Products";
import { getParamsProductData, getProductParamsTrueData } from "../../api";
import { useQuery } from "react-query";

function Home() {
  const [code, setCode] = useState(null);
  const [age, setAge] = React.useState("");
  const [search, setSearch] = useState("");
  const { data: product } = useQuery(["paramsData", code, search], () =>
    getParamsProductData(code, search)
  );
  const { data: paramsData } = useQuery(["paramsData", code, search], () =>
    getProductParamsTrueData(code, search)
  );

  const handleClear = () => {
    setSearch("");
    setCode("");
    setAge("");
  };

  const handleChangeValue = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 5) {
      setSearch(inputValue);
    }
  };

  return (
    <>
      <Header
        handleClear={handleClear}
        setSearch={setSearch}
        code={code}
        age={age}
        setAge={setAge}
        setCode={setCode}
        handleChangeValue={handleChangeValue}
      />
      <Products code={code} paramsData={paramsData} product={product} />
    </>
  );
}

export default Home;
