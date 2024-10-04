import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const BaseLayout = () => {
  return (
    <div>
      <div>
        <Header />
      </div>
      <Outlet />

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default BaseLayout;
