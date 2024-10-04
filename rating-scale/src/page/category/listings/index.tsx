import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { GETLISTINGBYCATEGORY } from "../../../service/operations/companyOperations";
import { BASEROUTE, IMAGEBASE, IMAGEURL } from "../../../utils/constants";

interface Listing {
  companyname: string;
  averageRating: number;
  totalReviews: number;
  icon: string;
}

function removeHttpsAndWww(url: string): string {
  let cleanedUrl = url?.replace(/^https:\/\//, "");
  cleanedUrl = cleanedUrl?.replace(/^www\./, "");

  return cleanedUrl;
}

export default function Index() {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["listingbyCategoryData", id],
    queryFn: () => GETLISTINGBYCATEGORY(id?.replaceAll("-", " ") ?? ""),
  });

  if (isLoading) {
    return <p>...loading</p>;
  }

  return (
    <div className="container my-2">
      <h3 className="my-5 fw-bold">
        {data.length} Listing result for the '{id?.replaceAll("-", " ")}'
        category.{" "}
      </h3>
      <div className="row">
        <div className="col-7">
          {data?.data.map((listing: Listing, index: number) => (
            <ListingCard data={listing} key={index} />
          ))}
        </div>

        <div className="col-4 business-review-right-side">
          <div className="business-top-categories mt-4">
            <div className="w-100 text-start">
              <h4 className="text-start">Top Categories</h4>
              <div className="underline w-100 mt-3"></div>
            </div>
            <div className="top-categories-list">
              <ul>
                {TopCategoryList.map((e, i) => (
                  <li key={i}>
                    <Link to="document-solutions">{e.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ListingCardProps {
  data: Listing;
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => (
  <div className="software-list-box mt-3">
    <div className="software-list-header">
      <div className="d-flex justify-content-between">
        <div className=" d-flex">
          <div className="software-logo">
            <Link
              to={BASEROUTE + "/listing/" + removeHttpsAndWww(data.website)}
            >
              <img
                src={IMAGEURL + data.icon}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = IMAGEBASE + "/img/building-ic.jpg";
                }}
                alt=""
              />
            </Link>
          </div>
          <div className="software-short-desc pt-3">
            <Link
              to={BASEROUTE + "/listing/" + removeHttpsAndWww(data.website)}
            >
              <h4>{data.companyname}</h4>
            </Link>
            <div className=" ratings d-flex align-items-center">
              <span className="me-2 fs-5 fw-bold">
                ({data.averageRating ?? 0})
              </span>
              {[...Array(5)].map((_, index) => (
                <li key={index}>
                  <Icon
                    icon={
                      index < Math.floor(data.averageRating)
                        ? "emojione:star"
                        : "ic:baseline-star"
                    }
                    fontSize={24}
                  />
                </li>
              ))}
            </div>
            <small className="fw-normal text-secondary mt-1">
              {data.totalReviews} reviews
            </small>
          </div>
        </div>
        <div className="listing_action">
          <div className="claim-website text-end">
            <Link
              to={BASEROUTE + "/listing/" + removeHttpsAndWww(data.website)}
            >
              <button className=" theme-btn1 unfill">
                View Company reviews
              </button>
            </Link>

            <button className="theme-btn1 ">Claim website/listing</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const TopCategoryList: { id: number; title: string }[] = [
  {
    id: 1,
    title: "Document Solutions",
  },
  {
    id: 2,
    title: "Education Management",
  },
  {
    id: 3,
    title: "Electrical Power",
  },
  {
    id: 4,
    title: "Transportation",
  },
  {
    id: 5,
    title: "WebOps Platform",
  },
  {
    id: 6,
    title: "Workflow Solutions",
  },
  {
    id: 7,
    title: "Workforce Management",
  },
  {
    id: 8,
    title: "Accounting",
  },
];
