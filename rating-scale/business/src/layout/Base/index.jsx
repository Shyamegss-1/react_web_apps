import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

export default function Index() {
  return (
    <div>
      <div>
        <Header />
      </div>

      <div className="">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
