import { useQuery } from "@tanstack/react-query";
import { GETRECENTADDEDREVIEW } from "../../../service/operations/companyOperations";

import { LoadingReviewsCard } from "../../listing/sections/LoadingSkeletons";

function removeHttpsAndWww(url: string): string {
  let cleanedUrl = url?.replace(/^https:\/\//, "");
  cleanedUrl = cleanedUrl?.replace(/^www\./, "");

  return cleanedUrl;
}
export default function RecentReviews() {
  const { data, isLoading } = useQuery({
    queryKey: ["recentaddedreview"],
    queryFn: () => GETRECENTADDEDREVIEW(),
  });

  console.log(data);

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
    <>
      <div className="container">
        <div className="section-title text-center">
          <h2 className="fs-1">Recently Posted Reviews!</h2>
          <p className="mt-3 fs-5">
            All reviews are from genuine users. Post your user experience and
            let our community grow.{" "}
          </p>
        </div>
      </div>
      <div className="container mt-5">
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row">
                {data.data.map((el) => (
                  <div className="col-lg-3 col-md-6 col-6 mt-2">
                    <div className="testi-box">
                      <div className="text-text">
                        <h2 className="text-white">
                          <a
                            href="listing-details02ee.html?slug="
                            style={{ color: "white" }}
                          >
                            {el.companyname ?? removeHttpsAndWww(el.website)}
                          </a>
                        </h2>

                        <p className="text-white mt-2">{el.review}</p>
                        <p className="fs-6 text-white reviewer-name mt-2">
                          {el.name}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
