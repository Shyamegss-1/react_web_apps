import { useQuery } from "@tanstack/react-query";
import { GETRECENTADDED } from "../../../service/operations/companyOperations";
import { BASEROUTE, IMAGEURL } from "../../../utils/constants";
import { Link } from "react-router-dom";
import { LoadingReviewsCard } from "../../listing/sections/LoadingSkeletons";
import { Key } from "react";

function removeHttpsAndWww(url: string): string {
  let cleanedUrl = url?.replace(/^https:\/\//, "");
  cleanedUrl = cleanedUrl?.replace(/^www\./, "");

  return cleanedUrl;
}

export default function RecentlyAdded() {
  const { data, isLoading } = useQuery({
    queryKey: ["recentadded"],
    queryFn: () => GETRECENTADDED(),
  });

  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          {[...Array(6)].map((_, e) => (
            <div className="col-lg-4 col-md-6 mt-4">
              <LoadingReviewsCard key={e} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="section-title">
        <h2>Recently Added</h2>
      </div>

      <div className="row">
        {data.data.map(
          (
            el: {
              website: string;
              icon: string;
              companyname: string;
              category: string;
            },
            e: Key | null | undefined
          ) => (
            <div className="col-lg-4 col-md-6 mt-4" key={e}>
              <Link
                to={BASEROUTE + "/listing/" + removeHttpsAndWww(el.website)}
              >
                <div className="recent-listing-box d-flex align-items-center">
                  <div className="listing-img">
                    <img
                      src={
                        el.icon ? IMAGEURL + el.icon : "/img/building-ic.jpg"
                      }
                    />
                  </div>
                  <div className="listing-desc">
                    <h5>{el.companyname ?? removeHttpsAndWww(el.website)}</h5>
                    <p>
                      <b>Category:</b> {el.category ?? "----"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
}
