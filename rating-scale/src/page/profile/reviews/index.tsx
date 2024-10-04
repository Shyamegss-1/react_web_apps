import { Icon } from "@iconify/react/dist/iconify.js";
import { GETUSERREVIEWS } from "../../../service/operations/userOperations";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../../store/authStore";
import { Link, useSearchParams } from "react-router-dom";
import { IMAGEBASE } from "../../../utils/constants";

function removeHttpsAndWww(url: string) {
  let cleanedUrl = url?.replace(/^https:\/\//, "");
  cleanedUrl = cleanedUrl?.replace(/^www\./, "");

  return cleanedUrl;
}

interface data {
  active: boolean;
  title: string;
  listing: {
    website: string;
  };
  review: string;
}

interface ReviewData {
  length: number;
  data: data[];
}

export default function Index() {
  const token: string = useAuthStore((state) => state.userToken)!;

  const [searchParams, setSearchParams] = useSearchParams();

  const pageN: string = searchParams.get("p")!;
  const filter: string = searchParams.get("f")!;

  const { data, isPending }: { data: ReviewData; isPending: boolean } =
    useQuery({
      queryKey: ["userreviewsdata", pageN, filter],
      queryFn: () =>
        GETUSERREVIEWS(
          token,
          pageN ? `?page=${pageN}` : "",
          filter ? `&f=${filter}` : ""
        ),
    });

  const pageHandler = async (page: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const p: string = page.toString();
    setSearchParams({ p, ...(filter ? { f: filter } : {}) });
  };

  const paramsHandler = (parmas: string) => {
    setSearchParams({ f: parmas, p: "1" });
  };

  const reviewDeletehandler = (reviewId: string) => {};

  return (
    <div className="">
      <div className=" my-reviews" id="myreviews">
        <div className="reviews_filter d-flex justify-content-between align-items-center">
          <h4 className="m-0">My Reviews</h4>
          <div>
            <select
              defaultValue="all"
              onChange={(e) => paramsHandler(e.target.value)}
              className="form-control w-100"
            >
              <option value="all">All Reviews</option>
              <option value="false">Rejected Reviews</option>
              <option value="null">Moderation Reviews</option>
              <option value="true">Live Reviews</option>
            </select>
          </div>
        </div>

        {!isPending &&
          data &&
          data.data.map((e: data, index: number) => (
            <ReviewCard key={index} data={e} />
          ))}
      </div>

      <div className="ms-4">
        {Math.ceil(data?.length / 5) > 1 && (
          <nav aria-label="Page navigation example me-5">
            <ul className="pagination">
              {[...Array(Math.ceil(data?.length / 5) || 5)].map((_, e) => {
                return (
                  <li className="page-item">
                    <a
                      onClick={() => pageHandler(e + 1)}
                      className="page-link"
                      style={{ cursor: "pointer" }}
                    >
                      {e + 1}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

const ReviewCard = ({ data }: { data: data }) => (
  <div className="software-details-boxes mt-3">
    {/* <Link to="#">
      <button className="btn btn-success d-flex align-items-center review-edit-btn">
        <Icon icon="material-symbols:edit" fontSize={24} />
      </button>
    </Link>
    <Link to="#" className="review-delete-btn">
      <button className="btn btn-danger d-flex align-items-center ">
        <Icon icon="material-symbols:delete" fontSize={24} />
      </button>
    </Link> */}

    <div className="user-profile-info d-flex">
      <div className="user--pic">
        <img
          height={"50px"}
          width={"50px"}
          src={IMAGEBASE + "/img/building-ic.jpg"}
          alt=""
        />
      </div>
      <div className="user-short-info mx-4">
        <h5 className="fw-bold">{removeHttpsAndWww(data?.listing?.website)}</h5>
        <button
          className="btn btn-secondary py-1 px-1 fs-6"
          style={
            data?.active
              ? { background: "green" }
              : data?.active === false
              ? { background: "red" }
              : { background: "#a5a5a5" }
          }
        >
          {data?.active
            ? "active"
            : data?.active === false
            ? "removed"
            : "Moderation"}
        </button>{" "}
      </div>
    </div>
    <hr className="mt-4" />
    <div className="review-description">
      <h5 className="mt-4 fw-bold">"{data?.title}"</h5>
      <p>{data?.review}</p>
    </div>
  </div>
);
