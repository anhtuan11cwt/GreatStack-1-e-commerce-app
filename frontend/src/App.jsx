import { lazy, Suspense, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import AdminLogin from "./admin/components/AdminLogin";
import AdminNavbar from "./admin/components/AdminNavbar";
import AdminSidebar from "./admin/components/AdminSidebar";
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
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminAdd = lazy(() => import("./admin/pages/AdminAdd"));
const AdminList = lazy(() => import("./admin/pages/AdminList"));
const AdminOrders = lazy(() => import("./admin/pages/AdminOrders"));

const AdminEdit = lazy(() => import("./admin/pages/AdminEdit"));

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const [token, setToken] = useState(
    () => localStorage.getItem("admin_token") || "",
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isAdminRoute && !token && localStorage.getItem("token")) {
    return <Navigate replace to="/" />;
  }

  if (token) {
    const adminContent = (() => {
      if (location.pathname === "/admin/login") {
        return <Navigate replace to="/admin/orders" />;
      }
      if (
        location.pathname === "/admin/add" ||
        location.pathname === "/admin/list" ||
        location.pathname === "/admin/orders" ||
        location.pathname.startsWith("/admin/edit/")
      ) {
        return (
          <>
            <AdminNavbar setSidebarOpen={setSidebarOpen} setToken={setToken} />
            <AdminSidebar open={sidebarOpen} setOpen={setSidebarOpen} />
            {sidebarOpen && (
              <button
                className="fixed inset-0 z-20 cursor-default bg-black/50 md:hidden"
                onClick={() => setSidebarOpen(false)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setSidebarOpen(false);
                }}
                tabIndex={-1}
                type="button"
              />
            )}
            <div className="min-h-screen bg-gray-50/50 pt-[57px] md:ml-64">
              <Suspense fallback={<div />}>
                <Routes>
                  <Route
                    element={<AdminAdd token={token} />}
                    path="/admin/add"
                  />
                  <Route
                    element={<AdminList token={token} />}
                    path="/admin/list"
                  />
                  <Route
                    element={<AdminEdit token={token} />}
                    path="/admin/edit/:id"
                  />
                  <Route element={<AdminOrders />} path="/admin/orders" />
                </Routes>
              </Suspense>
            </div>
          </>
        );
      }
      return <Navigate replace to="/admin/orders" />;
    })();

    return (
      <>
        <Toaster duration={2000} position="top-center" />
        {adminContent}
      </>
    );
  }

  if (isAdminRoute) {
    let content;

    if (location.pathname === "/admin") {
      content = <Navigate replace to="/admin/login" />;
    } else if (location.pathname === "/admin/login") {
      content = <AdminLogin setToken={setToken} />;
    } else {
      content = <Navigate replace to="/admin/login" />;
    }

    return (
      <>
        <Toaster duration={2000} position="top-center" />
        {content}
      </>
    );
  }

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
          <Route element={<NotFound />} path="*" />
        </Routes>
      </Suspense>
      {location.pathname !== "/login" && <Footer />}
    </div>
  );
};

export default App;
