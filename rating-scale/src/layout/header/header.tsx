import { Icon } from "@iconify/react/dist/iconify.js";
import useAuthStore from "../../store/authStore";
import { BASEROUTE, IMAGEBASE, UIAVATAR } from "../../utils/constants";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const token = useAuthStore((state) => state.userToken);
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const LogoutHandler = () => {
    logout();
    navigate(BASEROUTE + "/sign-in");
    toast.success("Logout successfully !!");
  };

  return (
    <header>
      <div className="container">
        <div className="main-header">
          <div className="logo">
            <NavLink to={BASEROUTE + "/"}>
              <img src={IMAGEBASE + "/img/logo-2.png"} />
            </NavLink>
          </div>

          <div className="nav-links">
            <ul>
              <li>
                <NavLink to={BASEROUTE + "/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={BASEROUTE + "/category"}>Categories</NavLink>
              </li>
              <li>
                <NavLink to={BASEROUTE + "/blogs"}>Blogs</NavLink>
              </li>
            </ul>
          </div>

          <div className="nav-btns d-flex">
            {!token ? (
              <NavLink to={BASEROUTE + "/sign-in"} className="theme-btn1">
                Sign In
              </NavLink>
            ) : (
              <div className="user-laof ">
                <div className="user-profile">
                  <div
                    className="btn-user"
                    style={{
                      background: `url(${UIAVATAR}sahil) no-repeat center`,
                    }}
                  ></div>

                  <ul className="dropdown">
                    <li>
                      <Link
                        to={BASEROUTE + "/user-profile/detail"}
                        className="d-flex align-items-center gap-1"
                      >
                        <Icon icon="solar:user-bold" /> Profile
                      </Link>
                    </li>

                    <li>
                      <Link
                        onClick={() => LogoutHandler()}
                        to="#"
                        className="d-flex align-items-center gap-1 "
                      >
                        <Icon icon="ic:twotone-logout" /> Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <a
              href="https://thepreview.pro/rating-business/"
              className="theme-btn2 ms-2"
            >
              For Business
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

const StreamedDataComponent = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/");

        if (!response.body) {
          throw new Error("ReadableStream not yet supported in this browser.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        let receivedLength = 0;
        let chunks = [];

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            console.log("Stream complete");
            break;
          }

          receivedLength += value.length;
          chunks.push(decoder.decode(value, { stream: true }));

          // Concatenate chunks and update the state
          const chunkString = chunks.join("");
          setData((prevData) => [...prevData, chunkString]);
        }
      } catch (error) {
        console.error("Error fetching stream:", error);
        setError(error.toString());
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Streamed Data</h1>
      {error && <div>Error: {error}</div>}
      <div>
        {data.map((chunk, index) => (
          <div key={index}>{chunk}</div>
        ))}
      </div>
    </div>
  );
};
