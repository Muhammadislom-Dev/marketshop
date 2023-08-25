import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { Route, Routes } from "react-router-dom";
import Blog from "../components/Blog/Blog";
import Home from "../pages/Home/Home";
import BlogAbout from "../pages/Home/components/Blog/Blog";
import LikePage from "../pages/LikePage/LikePage";
import AboutProduct from "../pages/AboutProduct/AboutProduct";
import Profile from "../pages/Profile/Profile";
import BlogPage from "../components/BlogPage/BlogPage";
import Product from "../pages/Product/Product";
import Support from "../components/Support/Support";

function AppRoutes() {
  const token = localStorage.getItem("accessToken");
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blog/about/:id"
          element={
            <>
              <Blog />
              <BlogAbout />
            </>
          }
        />
        <Route
          path="/blog"
          element={
            <>
              <BlogAbout />
            </>
          }
        />
        <Route
          path="/like"
          element={
            <>
              <LikePage />
            </>
          }
        />
        <Route
          path="/products/about/:id"
          element={
            <>
              <AboutProduct />
            </>
          }
        />
        <Route path="/profile" element={<>{token ? <Profile /> : ""}</>} />
        <Route path="/:id" element={<Product />} />
        <Route path="/support" element={<Support />} />
      </Routes>
    </>
  );
}
export default AppRoutes;
