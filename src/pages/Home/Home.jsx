import React, { useState } from "react";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import { getLikeProductData, getProductParamsTrueData } from "../../api";
import { useQuery } from "react-query";

function Home() {
  const [code, setCode] = useState("");
  const [page, setPage] = useState("12");
  const [popular, setPopular] = useState(false);
  const [age, setAge] = React.useState("");
  const [search, setSearch] = useState("");
  const { data: paramsData, refetch } = useQuery(
    ["paramsData", code, search, page, popular],
    () => getProductParamsTrueData(code, search, page, popular)
  );

  const handleClear = () => {
    setSearch("");
    setCode("");
    setAge("");
    setPopular("");
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
      />
      <Products
        popular={popular}
        setPopular={setPopular}
        paramsData={paramsData}
        refetch={refetch}
        setPage={setPage}
      />
    </>
  );
}

export default Home;
