import { Link, Outlet } from "react-router-dom";
import { BASEROUTE, IMAGEBASE, IMAGEURL } from "../../utils/constants";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function Index() {
  const [l, setL] = useState<object>({});

  useEffect(() => {
    const storedData = localStorage.getItem("authStore");

    const parsedData = storedData ? JSON.parse(storedData) : {};

    setL(parsedData);
  }, []);

  return (
    <section className="user-admin-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mt-3">
            <div className="user-sidebar">
              <div className="user-profile">
                <img
                  width={"100px"}
                  src={
                    l.state?.userData.image
                      ? IMAGEURL + l.state?.userData?.image
                      : IMAGEBASE + "/img/user-d.png"
                  }
                  alt=""
                />
                <h4 className="mt-2">{l.state?.userData?.name}</h4>
              </div>
              <hr className="mt-5" />
              <div className="user-navs mt-4 text-start">
                <ul>
                  <Link to={BASEROUTE + "/user-profile/detail"}>
                    <li>
                      <Icon icon="mdi:user" /> Profile Details
                    </li>
                  </Link>
                  <Link to={BASEROUTE + "/user-profile/reviews"}>
                    <li>
                      <Icon icon="material-symbols:reviews" /> Reviews
                    </li>
                  </Link>

                  <Link to={BASEROUTE + "/user-profile/updatepassword"}>
                    <li>
                      <Icon icon="mdi:password" /> update password
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-9">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
