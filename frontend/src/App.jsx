import { lazy, Suspense } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import SearchBar from "./components/SearchBar";

const Home = lazy(() => import("./pages/Home"));
const Collection = lazy(() => import("./pages/Collection"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Product = lazy(() => import("./pages/Product"));
const Cart = lazy(() => import("./pages/Cart"));
const Login = lazy(() => import("./pages/Login"));
const PlaceOrder = lazy(() => import("./pages/PlaceOrder"));
const Orders = lazy(() => import("./pages/Orders"));
const Profile = lazy(() => import("./pages/Profile"));

const App = () => {
  const location = useLocation();

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ScrollToTop />
      <Navbar />
      <SearchBar />
      <Toaster duration={2000} position="top-center" />
      <Suspense fallback={<div />}>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Collection />} path="/collection" />
          <Route element={<About />} path="/about" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<Product />} path="/product/:productId" />
          <Route element={<Cart />} path="/cart" />
          <Route element={<Login />} path="/login" />
          <Route element={<PlaceOrder />} path="/place-order" />
          <Route element={<Orders />} path="/orders" />
          <Route element={<Profile />} path="/profile" />
        </Routes>
      </Suspense>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
