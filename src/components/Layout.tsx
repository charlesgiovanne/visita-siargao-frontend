import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar className={`z-50 ${isHomePage ? 'absolute top-0 left-0 right-0 bg-transparent' : 'bg-white/75 backdrop-blur-lg'}`} />
      <main key={location.pathname} className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
