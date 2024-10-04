import { useQuery } from "@tanstack/react-query";
import MediaSection from "./sections/mediaSection";
import {
  GETADVERTISMENT,
  GETLISTINGMEDIA,
  GETLISTINGPUURCHSESTATUS,
  GETREVIEWS,
  LISTCOMPANY,
} from "../../service/operations/companyOperations";
import { json, useParams, useSearchParams } from "react-router-dom";

import ListingReviews from "./sections/listingReviews";
import DetailSection from "./sections/detailSection";
import { IMAGEURL } from "../../utils/constants";
import { Icon } from "@iconify/react/dist/iconify.js";
import PostReviewModal from "./sections/postReviewModal";
import { useState } from "react";
import {
  LoadingDetailSection,
  LoadingReviewsCard,
} from "./sections/LoadingSkeletons";
import ServiceReportModal from "./sections/service-report-modal";

import ResponsivePagination from "react-responsive-pagination";

export default function Index() {
  const [reviewModal, setReviewModal] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState<boolean>(false);
  const [reportData, setReportData] = useState<object>({});
  const [searchParams, setSearchParams] = useSearchParams();

  const { id } = useParams();

  const { data, isPending: notyet } = useQuery({
    queryKey: ["listcompany"],
    queryFn: () =>
      LISTCOMPANY({ websiteLink: id?.toString().toLowerCase() ?? "" }),
  });

  const { data: purchaseStatus } = useQuery({
    queryKey: ["purchaseStatus"],
    queryFn: () =>
      GETLISTINGPUURCHSESTATUS({
        websiteLink: getSubdomain(id?.toString().toLowerCase() ?? ""),
      }),
  });

  const details = data?.data?.details?.[0];

  const listingId: string = details?.id;

  const { data: reviewData, isPending: isReviewPending } = useQuery({
    queryKey: ["listreviews", searchParams.get("page")],
    queryFn: () => GETREVIEWS(listingId, searchParams?.get("page") ?? 1),
    enabled: !!details,
  });

  const { data: mediaData } = useQuery({
    queryKey: ["listingmedia"],
    queryFn: () => GETLISTINGMEDIA(listingId),
    enabled: !!details,
  });

  const { data: advertismentData } = useQuery({
    queryKey: ["listingads"],
    queryFn: () => GETADVERTISMENT(listingId),
    enabled: !!details,
  });

  const openReportModal = (reviewId: string) => {
    setReportModal(true);
    setReportData({
      listingId: details.id,
      reviewId: reviewId,
    });
  };

  const closeReportModal = () => {
    setReportModal(false);
  };

  return (
    <>
      <section
        className="consumer-tail-banner-a"
        style={
          details && details?.banner
            ? {
                background: `url(${
                  IMAGEURL + details.banner
                }) no-repeat center`,
                backgroundSize: "cover",
              }
            : {}
        }
      >
        {!notyet ? (
          <div className="consumer-tail-content-baox">
            <DetailSection
              details={details}
              avgRating={reviewData?.avg[0]}
              isReviewPending={isReviewPending}
              totalReviews={reviewData?.data?.length ?? 0}
              setReviewModal={setReviewModal}
            />
          </div>
        ) : (
          <div className="container">
            <LoadingDetailSection />
          </div>
        )}
      </section>
      <section className="listing-buttons mt-4">
        <div className="container">
          <div className="listing-butn d-flex justify-content-between">
            {/* <LoadingButton /> */}
            <ul className="list-unstyled d-flex">
              <li>
                <a href="#!">About</a>
              </li>

              <li>
                <a href="#!">Reviews</a>
              </li>
            </ul>

            <ul className="list-unstyled d-flex gap-2 ">
              <a>
                <Icon icon="devicon:facebook" fontSize={34} />
              </a>
              <a>
                <Icon icon="skill-icons:instagram" fontSize={34} />
              </a>
              <a>
                <Icon icon="fa6-brands:square-x-twitter" fontSize={34} />
              </a>
              <a>
                <Icon icon="devicon:linkedin" fontSize={34} />
              </a>
            </ul>
          </div>
          <div className="about-media mt-5">
            <div className="row">
              <div className="col-lg-8">
                <div className="about-description">
                  <h2 className="fw-bold">About</h2>
                  {details?.about?.length && <p>{details.about}</p>}
                </div>

                <div className=" mt-5">
                  <div className="contact-detail-box mb-3 me-4">
                    <p className="d-flex">
                      <span className="fw-bold d-flex align-items-center">
                        <Icon icon={"ic:baseline-phone"} className="me-2" />
                        Phone :
                      </span>
                      <span className="ms-2">
                        {details?.phone ? details?.phone : "+1 ***** *****"}
                      </span>
                    </p>
                  </div>

                  <div className="contact-detail-box mb-3">
                    <p className="d-flex">
                      <span className="fw-bold d-flex align-items-center">
                        <Icon icon={"ic:baseline-email"} className="me-2" />
                        Email :
                      </span>
                      <span className="ms-2">
                        {details?.workemail
                          ? details?.workemail
                          : "*****@" + id}
                      </span>
                    </p>
                  </div>
                  <div className="contact-detail-box mb-3">
                    <p className="d-flex">
                      <span className="fw-bold d-flex align-items-center">
                        <Icon icon={"mdi:location"} className="me-2" />
                        Address :
                      </span>
                      <span className="ms-2">
                        1 Cvs Dr, Woonsocket, Rhode Island, 02895, United States{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {purchaseStatus?.data?.hasp && mediaData?.data?.length && (
                <div className="col-lg-4">
                  <h2 className=" fw-bold">Media</h2>
                  <MediaSection data={mediaData.data} />
                </div>
              )}

              {purchaseStatus?.data?.hasp && advertismentData?.data?.length && (
                <div className="col-8">
                  <div className="">
                    <img
                      src={
                        IMAGEURL +
                        JSON.parse(advertismentData?.data[0].ads)[0].image
                      }
                      alt=""
                    />
                  </div>
                </div>
              )}

              <div className="col-lg-12 mt-5">
                <div className="review-card-sec">
                  <div className="review-title">
                    <h2>Reviews</h2>
                  </div>

                  <div className="row">
                    <div className="col-8">
                      {data && (
                        <PostReviewModal
                          reviewModal={reviewModal}
                          state={data.data}
                          closeHandler={setReviewModal}
                        />
                      )}
                    </div>
                  </div>

                  {isReviewPending ? (
                    <div className="row">
                      {[...Array(6)].map((_, e) => (
                        <div className="col-lg-8">
                          <LoadingReviewsCard key={e} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {reviewData.totalReviews > 5 ? (
                        <>
                          <div className="row mt-5">
                            <div className="col-8">
                              <ResponsivePagination
                                current={+searchParams.get("page") || 1}
                                total={Math.ceil(reviewData.totalReviews / 5)}
                                onPageChange={(event) => {
                                  setSearchParams({ page: event });
                                }}
                              />
                            </div>
                            {!isReviewPending && (
                              <ListingReviews
                                reportHandler={openReportModal}
                                data={reviewData}
                              />
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="no-data-container mt-5">
                          <h2>No Reviews Yet ...</h2>
                        </div>
                      )}
                    </>
                  )}

                  {reportModal && (
                    <ServiceReportModal
                      data={reportData}
                      isOpen={reportModal}
                      onClose={closeReportModal}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// reusable function

function getSubdomain(domain: string) {
  const s = domain.split(".");
  const newdomain = `${s[s.length - 2]}.${s[s.length - 1]}`;

  return newdomain;
}

// function findLines(array) {
//   const lines = [];

//   // Extract horizontal lines
//   for (let row = 0; row < array.length; row++) {
//     lines.push(array[row]);
//   }

//   // Extract vertical lines
//   for (let col = 0; col < array[0].length; col++) {
//     const verticalLine = [];
//     for (let row = 0; row < array.length; row++) {
//       verticalLine.push(array[row][col]);
//     }
//     lines.push(verticalLine);
//   }

//   // Extract diagonal lines
//   const diagonal1 = [];
//   for (let i = 0; i < array.length; i++) {
//     diagonal1.push(array[i][i]);
//   }
//   lines.push(diagonal1);

//   const diagonal2 = [];
//   for (let i = 0; i < array.length; i++) {
//     diagonal2.push(array[i][array.length - 1 - i]);
//   }
//   lines.push(diagonal2);

//   return lines;
// }

// function containsArray(mainArray, subArray) {
//   // console.log(
//   //   mainArray.toString() === subArray.toString(),
//   //   mainArray.toString(),
//   //   subArray.toString()
//   // );

//   return true;
// }

// function create5x5Array(sortedArray) {
//   const array5x5 = [];
//   for (let i = 0; i < 5; i++) {
//     const row = [];
//     for (let j = 0; j < 5; j++) {
//       const index = i * 5 + j;
//       const value = sortedArray[index] !== undefined ? sortedArray[index] : "";
//       row.push(value);
//     }
//     array5x5.push(row);
//   }
//   return array5x5;
// }

// const array_5x5 = [
//   [1, 2, 3, 4, 5],
//   [6, 7, 8, 9, 10],
//   [11, 12, 13, 14, 15],
//   [16, 17, 18, 19, 20],
//   [21, 22, 23, 24, 25],
// ];

// const lines = findLines(array_5x5);

// const sortedArray = [
//   1, 3, 5, 6, 11, 12, 13, 10, 14, 2, 15, 7, 8, 9, 24, 25, 21, 23, 16, 17, 18,
//   22, 19, 20,
// ];

// sortedArray.sort((a, b) => a - b);

// let ardsadray5x5 = create5x5Array(sortedArray);
// console.log(ardsadray5x5);

// ardsadray5x5 = findLines(ardsadray5x5);

// // for (let i = 0; i < lines.length; i++) {
// //   let found = false;
// //   for (let j = 0; j < ardsadray5x5.length; j++) {
// //     if (containsArray(ardsadray5x5[j], lines[i])) {
// //       // console.log(
// //       //   "New array matches a line in the original array:",
// //       //   ardsadray5x5[j]
// //       // );
// //       found = true;
// //     }
// //   }
// //   // if (!found) {
// //   //   console.log("No match found for line:", lines[i]);
// //   // }
// // }

// function compareArrays(array1, array2) {
//   for (let i = 0; i < array1.length; i++) {
//     for (let j = 0; j < array1[i].length; j++) {
//       // If one element is undefined and the other is not, they don't match
//       if (
//         (array1[i][j] === undefined && array2[i][j] !== undefined) ||
//         (array1[i][j] !== undefined && array2[i][j] === undefined)
//       ) {
//         return false;
//       }
//       // If both elements are defined and they don't match, arrays don't match
//       if (
//         array1[i][j] !== undefined &&
//         array2[i][j] !== undefined &&
//         array1[i][j] !== array2[i][j]
//       ) {
//         return false;
//       }
//     }
//   }
//   // If all elements match or are both undefined, arrays match
//   return true;
// }

// const array1 = [
//   [1, 2, 3, 4, 5],
//   [6, 7, 8, 9, 10],
//   [11, 12, 13, 14, 15],
//   [16, 17, 18, 19, 20],
//   [21, 22, 23, 24, 25],
// ];

// const array2 = [
//   [1, 2, 3, 5, 6],
//   [7, 8, 9, 10, 11],
//   [12, 13, 14, 15, 16],
//   [17, 18, 19, 20, 21],
//   [22, 23, 24, 25, undefined],
// ];

// console.log(compareArrays(array1, array2)); // Output: false
