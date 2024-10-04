/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { dateFormater } from "../../../utils/helpers";
import Drawer from "../../../components/customDrawer/customDrawer";
import { UserReviewReply } from "../../../service/opreations/reviewDetailsApi";
import AuthStore from "../../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { customToast } from "../../../utils/customToast";

/* eslint-disable react/prop-types */
export default function ReviewTable({
  reviews,
  filterHandler,
  total,
  page,
  setPage,
}) {
  // state

  const [open, setOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({});

  const [reply, setReply] = useState("");

  const navigate = useNavigate();
  const token = AuthStore((state) => state.userToken);

  const replySubmitHandler = async () => {
    const data = await UserReviewReply(token, navigate, {
      reply,
      id: currentReview.id,
    });
    if (data === 200) {
      customToast("Reply send successfully", "success");

      currentReview.reply = reply;
      setReply("");
    }
  };

  return (
    <div className="mb-10">
      <h1 className="mt-16 text-4xl font-semibold">Reviews</h1>

      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-3">
            <span className="p-3 rounded-sm  bg-red-100"></span>
            <span>Removed</span>
          </span>

          <span className="flex items-center gap-3 ">
            <span className="p-3 rounded-sm bg-yellow-100"></span>
            <span>Moderation</span>
          </span>

          <span className="flex items-center gap-3">
            <span className="p-3 rounded-sm border"></span>
            <span>Active</span>
          </span>
        </div>

        <div className="w-64">
          <select
            name=""
            onChange={filterHandler}
            id=""
            className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
          >
            <option value="" disabled selected>
              Select your filter
            </option>
            <option value="lth">Rating : Low to High</option>
            <option value="htl">Rating : High to Low</option>
            <option value="true">Live Reviews</option>
            <option value="null">Moderate Reviews</option>
            <option value="false">Removed Reviews</option>
          </select>
        </div>
      </div>

      {reviews.length ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-2xl mt-10">
          <table className="w-full text-sm text-left rtl:text-right text-black dark:text-gray-400">
            <thead className="border-b uppercase bg-white text-black">
              <tr className="">
                <th scope="col" className="p-4"></th>

                <th scope="col" className="px-6 py-5 text-sm">
                  Review
                </th>

                <th scope="col" className="px-6 py-5 text-sm">
                  user
                </th>

                <th scope="col" className="px-6 py-5 text-sm">
                  rating
                </th>

                <th scope="col" className="px-6 py-5 text-sm">
                  date
                </th>

                <th scope="col" className="px-6 py-5 text-sm">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((el, index) => (
                <tr
                  key={index}
                  className={`border-b text-black hover:bg-gray-50 dark:hover:bg-gray-50 ${
                    el.active
                      ? "bg-white"
                      : el.active === null
                      ? "bg-yellow-50"
                      : "bg-red-50"
                  }`}
                >
                  <td className="w-4 p-4">{index + 1}</td>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 "
                  >
                    <p className="line-clamp-1">{el.review}</p>
                  </th>
                  <td className="px-6 py-4">
                    <p className="">{el.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="">{el.rating}/5</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="line-clamp-1">{dateFormater(el.createdAt)}</p>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <span
                        onClick={() => {
                          setOpen(true);
                          setCurrentReview(el);
                        }}
                        className="w-auto text-sm text-white font-medium base-bg px-4 py-2 rounded-lg cursor-pointer hover:shadow-sm"
                      >
                        <span className="text-base">Preview</span>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <nav
            className="flex flex-column flex-wrap md:flex-row justify-between items-center p-4 bg-white"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-900 mb-4 md:mb-0 block w-full md:inline md:w-auto"></span>

            {Math.ceil(total / 5) > 1 && (
              <div>
                <ol className="flex justify-center gap-1 text-xs font-medium">
                  {[...Array(total ? Math.ceil(total / 5) : 0)].map(
                    (_, index) => (
                      <li
                        onClick={() => setPage(index + 1)}
                        key={index}
                        className={`block h-8 w-8 rounded text-center leading-8 cursor-pointer ${
                          page === index + 1
                            ? "border-purple-800 bg-violet-800  text-white"
                            : "border text-black"
                        }`}
                      >
                        {index + 1}
                      </li>
                    )
                  )}
                </ol>
              </div>
            )}
          </nav>
        </div>
      ) : (
        <div className=" flex justify-center items-center py-36 my-6 rounded-2xl bg-white">
          <h1 className="text-4xl font-bold text-gray-600">No Reviews Yet</h1>
        </div>
      )}

      <Drawer isOpen={open} setIsOpen={setOpen}>
        <div className=" px-5 py-6">
          <div className=" flex justify-between">
            <h1 className="text-xl font-semibold">
              {currentReview.name}'s review
            </h1>
            <div
              className={`relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none text-black py-1.5 px-3 text-xs rounded-lg ${
                currentReview.active
                  ? "border border-gray-400"
                  : currentReview.active === null
                  ? "bg-yellow-200"
                  : "bg-red-200"
              }`}
            >
              <span>
                {currentReview.active
                  ? "Live"
                  : currentReview.active === null
                  ? "Moderation"
                  : "Removed"}
              </span>
            </div>
          </div>

          <hr className="my-7" />

          <div className="flex mt-4">
            <p className="w-1/4 font-semibold capitalize">user</p>
            <p className="w-3/4">{currentReview.name}</p>
          </div>

          <div className="flex mt-4">
            <p className="w-1/4 font-semibold capitalize">Email</p>
            <p className="w-3/4">{currentReview?.user?.email} </p>
          </div>

          <div className="flex mt-4">
            <p className="w-1/4 font-semibold capitalize">Rating</p>
            <p className="w-3/4">{currentReview.rating} out of 5</p>
          </div>

          <div className="flex mt-4">
            <p className="w-1/4 font-semibold capitalize">Date of experience</p>
            <p className="w-3/4">{dateFormater(currentReview.date)}</p>
          </div>

          <div className="flex mt-4">
            <p className="w-1/4 font-semibold capitalize">Review Title</p>
            <p className="w-3/4">{currentReview.title}</p>
          </div>

          <div className="flex mt-4">
            <p className="w-1/4 font-semibold capitalize">review </p>
            <p className="w-3/4">{currentReview.review}</p>
          </div>

          {currentReview.reply ? (
            <div className="flex mt-4 relative">
              <p className="w-1/4 font-semibold capitalize">Your Reply </p>
              <p className="w-3/4">{currentReview.reply}</p>
              <div
                title="edit reply"
                className="  absolute -top-5 -left-4 px-2 py-1 bg-violet-400 rounded-full cursor-pointer"
              >
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="text-lg font-medium">Reply to user</div>
              <textarea
                name=""
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                id=""
                className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none mt-5"
                cols="30"
                rows="10"
              />
              <p className="my-2 text-yellow-600 font-light">
                * Atlest 20 characters.
              </p>
              <div>
                <button
                  onClick={() => replySubmitHandler()}
                  disabled={reply.trim().length < 20}
                  className="font-bold uppercase whitespace-nowrap select-none text-white py-2 px-3 mt-3 text-xs rounded-md base-bg disabled:bg-gray-400"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </Drawer>
    </div>
  );
}
