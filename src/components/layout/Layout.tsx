import { useLocation } from "react-router-dom";
import { Navbar } from "../Navbar";
import Footer from "./Footer";
import { ROUTES } from "../../constants";

const AUTH_ROUTES = [ROUTES.LOGIN, ROUTES.REGISTER];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const isAuthPage = (AUTH_ROUTES as readonly string[]).includes(pathname);

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
