import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { BASEROUTE, IMAGEBASE } from "../../../utils/constants";
import { SEARCHCOMPANYBYKEY } from "../../../service/operations/companyOperations";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router-dom";

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

function removeHttpsAndWww(url: string): string {
  let cleanedUrl = url?.replace(/^https:\/\//, "");
  cleanedUrl = cleanedUrl?.replace(/^www\./, "");

  return cleanedUrl;
}

const HomeBanner: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const debouncedSearchTerm = useDebouncedValue(inputValue, 500);

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (inputValue.length >= 3) {
        const data = await SEARCHCOMPANYBYKEY(debouncedSearchTerm);

        setResult(data.results);
        setLoading(false);
      }
    })();
  }, [debouncedSearchTerm]);

  const inputSearch = document.getElementById("searchdomain_input")!;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
        inputSearch.style.borderRadius = "24px 24px 24px 24px";
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    setIsMenuOpen(value.length >= 3);

    if (value.length >= 3) {
      inputSearch.style.borderRadius = "24px 24px 0px 0px";
    } else {
      inputSearch.style.borderRadius = "24px 24px 24px 24px";
    }

    if (inputValue.includes(".")) {
      inputSearch.style.borderRadius = "24px 24px 24px 24px";
    }
  };

  const handleInputClick = () => {
    if (inputValue.length > 3) {
      setIsMenuOpen(true);
      inputSearch.style.borderRadius = "24px 24px 0px 0px";
    }
  };

  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 order-2 order-lg-1 mt-lg-0 mt-4">
          <div className="banner-text ">
            <h1 className="text-dark">
              Choose the Best Software
              <br />
              <span style={{ color: "#432791 !important;" }}>
                {" "}
                with Insightful Reviews
              </span>
            </h1>

            <h3 className="text-dark mb-3 fs-4">
              - From brands all around the world
            </h3>

            <div className="search-domain">
              <form className="position-relative" id="searchdomain_input">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  onClick={handleInputClick}
                  placeholder="Type here..."
                />
                {isMenuOpen && !inputValue.includes(".") && (
                  <div
                    ref={menuRef}
                    className="position-absolute w-100 search_result"
                  >
                    {!loading ? (
                      <ul>
                        <Link
                          to={
                            BASEROUTE +
                            "/listing/" +
                            removeHttpsAndWww(inputValue)
                          }
                        >
                          <li>
                            <span style={{ marginRight: "18px" }}>
                              <Icon icon="ic:sharp-search" fontSize="22" />
                            </span>{" "}
                            {inputValue.replaceAll(" ", "")}.com
                          </li>
                        </Link>
                        <hr />

                        {result.length ? (
                          <>
                            {result.map((e: { website: string }) => (
                              <Link
                                to={
                                  BASEROUTE +
                                  "/listing/" +
                                  removeHttpsAndWww(e.website)
                                }
                              >
                                <li>
                                  <span>
                                    <img src="/svg/companyIcon.svg" alt="" />
                                  </span>
                                  {removeHttpsAndWww(e.website)}
                                </li>
                              </Link>
                            ))}
                          </>
                        ) : (
                          <div className=" text-center my-4">No Result ...</div>
                        )}
                      </ul>
                    ) : (
                      <div
                        className="d-flex justify-content-center align-self-center"
                        style={{ padding: "5rem 0" }}
                      >
                        <div className="lokader"></div>
                      </div>
                    )}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 order-1 order-lg-1">
          <div className="banner-img">
            <img
              src={IMAGEBASE + "/img/home-banner-main.png"}
              alt=""
              className="img-fluid w-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
