import { useQuery } from "@tanstack/react-query";
import { GETCOMPANYCATEGORY } from "../../service/operations/companyOperations";
import { Link, useSearchParams } from "react-router-dom";
import { BASEROUTE, IMAGEURL } from "../../utils/constants";
import { useState } from "react";

import ResponsivePagination from "react-responsive-pagination";

import TopCategories from "./sections/topCategories";

const alpha = Array.from(Array(26)).map((_e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

function getAllQueryParameters(): Record<string, string> {
  const queryString = window.location.search;
  const urlSearchParams = new URLSearchParams(queryString);
  const queryParams: Record<string, string> = {};

  for (const [key, value] of urlSearchParams.entries()) {
    queryParams[key] = value;
  }

  return queryParams;
}

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const allQueryParams = getAllQueryParameters();

  const page = searchParams.get("page");
  const filter = searchParams.get("filter");

  const { isPending, data } = useQuery({
    queryKey: ["categoryData", currentPage, searchParams, filter],
    queryFn: () =>
      GETCOMPANYCATEGORY(
        page ? `?page=${page}` : "",
        filter ? `${page ? "&" : "?"}filter=${filter}` : ""
      ),
  });

  // console.log(data);

  const setParamerteHandler = (al: string) => {
    const ppp: any = { ...allQueryParams };
    delete ppp?.filter;
    ppp.page = 1;
    setSearchParams({ filter: al, ...ppp });
  };

  const resetFilterFunction = () => {
    searchParams.delete("filter");
    const updatedQueryString = searchParams.toString();
    setSearchParams(updatedQueryString);
  };

  return (
    <div className="container">
      <div className="pop-cate-box">
        <h2 className="text-center">Popular Categories</h2>
        <div className="row mt-4">
          <TopCategories />
        </div>
      </div>

      <h2 className="text-center fw-bolder">All Categories</h2>

      <div className="d-flex justify-content-between cate-cart-board">
        <ul className="d-flex gap-3">
          {alphabet.map((char) => (
            <li
              onClick={() => setParamerteHandler(char)}
              className={`fw-bold alphabet-list ${
                searchParams.get("filter") === char ? "active" : ""
              }`}
            >
              {char}
            </li>
          ))}
        </ul>

        <button className="theme-btn1" onClick={() => resetFilterFunction()}>
          Reset filter
        </button>
      </div>

      {isPending ? (
        <div className="row">
          {[...Array(20)].map((_, e) => (
            <div className="col-lg-3 mb-4" key={e}>
              <div className="loading-card">
                <div className="loading-card-inner">
                  <div className="loading-card-icon"></div>
                  <div className="loading-card-title"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {data && data.data.length ? (
            <div className="row">
              {data &&
                data.data.map(
                  (c: { title: string; icon: string }, e: number) => (
                    <div className="col-lg-3 mb-4" key={e}>
                      <CategoryCard title={c.title} icon={c.icon} />
                    </div>
                  )
                )}
            </div>
          ) : (
            <div className="py-5 text-center ">
              <h1 className="">
                No Category Starts With "{searchParams.get("filter")}"
              </h1>
              <p>
                Try other alphabet ,or click{" "}
                <span
                  className="retetetetet"
                  onClick={() => resetFilterFunction()}
                  role="button"
                >
                  reset
                </span>{" "}
                for all categories
              </p>
            </div>
          )}
        </>
      )}

      <div className="row p-5">
        <div className="mt-5 flex justify-content-center">
          <ResponsivePagination
            current={+searchParams.get("page") || currentPage}
            total={Math.ceil(data?.length / 20)}
            onPageChange={(event) => {
              setCurrentPage(event);
              const ppp = { ...allQueryParams };
              delete ppp?.page;
              setSearchParams({ page: event, ...ppp });
            }}
          />
        </div>
      </div>
    </div>
  );
}

const CategoryCard = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <Link
      to={
        BASEROUTE +
        "/category/" +
        title.trim().replaceAll(" ", "-").toLowerCase()
      }
    >
      <div className="singe-category">
        <img src={IMAGEURL + icon} />
        <h5 className="ps-3">{title}</h5>
      </div>
    </Link>
  );
};
