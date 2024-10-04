import { Icon } from "@iconify/react/dist/iconify.js";
import { dateFormater } from "../../../utils/helpers";
import { IMAGEBASE } from "../../../utils/constants";

interface reviewData {
  title: string;
  createdAt: Date;
  name: string;
  review: string;
  id: string;
  rating: number;
}

export default function ListingReviews({
  data,
  reportHandler,
}: {
  data: { data: [] };
  reportHandler: (id: string) => void;
}) {
  return (
    <>
      {data.data.map((item: reviewData, index) => (
        <div className="col-lg-8 my-3">
          <div className="review-card-one" key={index}>
            <div className="rating-starts d-flex justify-content-between">
              <ul className="d-flex list-unstyled">
                {[...Array(5)].map((_, e) => (
                  <li key={e}>
                    <Icon
                      icon={
                        e < item.rating ? "emojione:star" : "ic:baseline-star"
                      }
                      fontSize={24}
                    />
                  </li>
                ))}
              </ul>

              <div>
                <Icon
                  onClick={() => reportHandler(item.id)}
                  style={{ cursor: "pointer" }}
                  icon={"material-symbols:flag"}
                  fontSize={24}
                />
              </div>
            </div>

            <h2>{item.title}</h2>
            <p>{item.review}</p>
            <div className="reviewer-detail d-flex align-items-center">
              <div className="reviewer-img">
                <img
                  src={IMAGEBASE + "/img/user-d.png"}
                  alt=""
                  className="w-100"
                />
              </div>
              <div className="reviewer-name-side ms-3">
                <h3>{item.name}</h3>
                <p>
                  Added on - <span>{dateFormater(item.createdAt)}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
