/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import AnimatedCounter from "../../../components/AnimatedCounter";
import {
  BackIcon,
  CalanderIcon,
  ExchangeIcon,
  ReviewIcon,
  StarIcon,
} from "../../../components/icons/customIcons";

export default function ReviewStats({ state, calc, report }) {
  return (
    <div>
      <div className="my-12">
        <h1 className="text-2xl font-bold">Your Review Statictics</h1>
      </div>

      <div className="md:py-4 lg:py-9 md:px-4 lg:px-8   flex bg-white rounded-2xl justify-center">
        <div className="flex items-center flex-col w-80 border-r justify-center">
          <div className="flex text">
            <span className="text-3xl">
              <ReviewIcon />
            </span>
            <span className="text-6xl font-bold ml-1">{calc?.total ?? 0}</span>
          </div>

          <p className="font-bold mt-3">Your Total Reviews</p>
        </div>

        <div className="flex items-center flex-col w-80 border-r justify-center">
          <div className="flex text">
            <span className="text-3xl">
              <CalanderIcon className={"w-14 h-14 text-violet-900"} />
            </span>
            <span className="text-xl md:text-2xl lg:text-4xl xl:text-6xl font-bold ml-1">
              {calc?.currentMonthReviews ?? 0}
            </span>
          </div>

          <p className="font-bold mt-3">This Month</p>
        </div>

        <div className="flex items-center flex-col w-80 border-r justify-center">
          <div className="flex text">
            <span className="text-3xl">
              <BackIcon />
            </span>
            <span className="text-6xl font-bold ml-1">
              {calc?.previousMonthReviews ?? 0}
            </span>
          </div>

          <p className="font-bold mt-3">Last Month</p>
        </div>

        <div className="flex items-center flex-col w-80 border-r justify-center">
          <div className="flex text">
            <span className="text-3xl">
              <ExchangeIcon />
            </span>

            <span className="text-6xl font-bold ml-1">
              {(calc?.percentageChange &&
                Number(calc?.percentageChange)?.toFixed(0)) ??
                0}
            </span>
          </div>

          <p className="font-bold mt-3">Analytics (%)</p>
        </div>

        <div className="flex items-center flex-col w-80  justify-center">
          <div className="flex text">
            <span className="text-3xl">
              <StarIcon className={"w-14 h-14 text-violet-900"} />
            </span>
            <span className="text-6xl font-bold ml-1">
              {calc?.averageRating?.toFixed(2) ?? 0}
            </span>
          </div>

          <p className="font-bold mt-3">Rating (Out Of 5)</p>
        </div>
      </div>
    </div>
  );
}

// const WavePulse = ({ inner, ...other }) => {
//   return (
//     <span className="d-main" {...other}>
//       <div className="s-cihl" style={{ ...inner }}></div>
//     </span>
//   );
// };
