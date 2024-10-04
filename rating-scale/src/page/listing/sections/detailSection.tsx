import { Icon } from "@iconify/react/dist/iconify.js";
import { IMAGEURL } from "../../../utils/constants";
import React from "react";

interface data {
  website: string;
  companyname: string;
  icon: string;
  banner: string;
}

function removeHttpsAndWww(url: string) {
  let cleanedUrl = url?.replace(/^https:\/\//, "");
  cleanedUrl = cleanedUrl?.replace(/^www\./, "");

  if (cleanedUrl.includes(".")) cleanedUrl = cleanedUrl.split(".")[0];

  return cleanedUrl;
}

export default function DetailSection({
  details,
  avgRating,
  isReviewPending,
  totalReviews,
  setReviewModal,
}: {
  details: data;
  avgRating: { average_rating: string };
  isReviewPending: boolean;
  totalReviews: number;
  setReviewModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const ModalOpenHandler = () => setReviewModal(true);

  return (
    <ul className="list-unstyled d-flex justify-content-between align-items-center flex-warp mb-0">
      <li>
        <div className="main-back-sec d-flex align-items-center">
          <div className="main-back-img">
            <img
              src={
                details.icon ? IMAGEURL + details.icon : "/img/building-ic.jpg"
              }
              alt=""
              className="w-100 h-100"
            />
          </div>
          <div className="gmail-content ms-3">
            <div className="list-name-starts">
              <div className="listing-name">
                <h2>
                  {details.companyname
                    ? details.companyname
                    : removeHttpsAndWww(details.website)}
                </h2>
              </div>
            </div>

            <div className="d-flex align-items-center gap-2 mt-1">
              {!isReviewPending && (
                <p>
                  {Number(avgRating.average_rating).toFixed(1)}{" "}
                  <span>({totalReviews} Reviews)</span>
                </p>
              )}
              <div className="listing-stars">
                <ul className="list-unstyled d-flex align-items-center gap-1">
                  {[...Array(5)].map((_, e) => (
                    <li key={e}>
                      <Icon
                        icon={
                          e < Number(avgRating?.average_rating)
                            ? "emojione:star"
                            : "ic:baseline-star"
                        }
                        fontSize={24}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="gmail-content-btns">
          <ul className="list-unstyled d-flex">
            <li>
              <span onClick={ModalOpenHandler}>
                <Icon
                  icon="carbon:review"
                  fontSize={24}
                  style={{ marginRight: "6px" }}
                />
                Write a review
              </span>
            </li>
            <li>
              <span>
                <Icon
                  icon="bitcoin-icons:verify-filled"
                  fontSize={24}
                  style={{ marginRight: "6px" }}
                />
                Claim
              </span>
            </li>
            <li>
              <a href={details.website} target="_blank">
                <Icon
                  icon="ic:outline-link"
                  fontSize={24}
                  style={{ marginRight: "6px" }}
                />
                Visit
              </a>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  );
}
