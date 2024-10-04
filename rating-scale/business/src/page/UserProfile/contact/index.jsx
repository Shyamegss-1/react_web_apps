/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import { useEffect, useState } from "react";
import { GetUserContact } from "../../../service/opreations/userDetailsApi";

import { useNavigate } from "react-router-dom";
import AuthStore from "../../../stores/authStore";
import { dateFormater } from "../../../utils/helpers";

export default function Index() {
  const [openId, setOpenId] = useState(0);

  const [data, setData] = useState([]);

  const [loader, setLoader] = useState();

  const openHandler = (index) => {
    if (openId === index) setOpenId(0);
    else setOpenId(index);
  };

  const navigate = useNavigate();
  const token = AuthStore((state) => state.userToken);

  useEffect(() => {
    (async () => {
      setLoader(true);

      const data = await GetUserContact(token, navigate);

      setData(data.data);

      setLoader(false);
    })();
  }, []);

  return (
    <div className="max-w-[1500px] m-auto">
      <div className="my-9">
        <h1 className="text-3xl mb-10 font-bold">Message's from user</h1>

        {!loader ? (
          <>
            {data.length ? (
              data.map((element, index) => (
                <ContactCard
                  key={index}
                  index={index + 1}
                  openId={openId}
                  openHandler={openHandler}
                  data={element}
                />
              ))
            ) : (
              <div className=" flex justify-center items-center py-36 my-6 rounded-2xl bg-white">
                <h1 className="text-4xl font-bold text-gray-600">
                  No user messages received so far.
                </h1>
              </div>
            )}
          </>
        ) : (
          <>
            {[...Array(10)].map((_, e) => (
              <div
                key={e}
                className="p-7 bg-gray-300 mt-5 rounded-lg cursor-pointer animate-pulse"
              ></div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

const ContactCard = ({ index, openId, openHandler, data }) => {
  const { email, createdAt, question } = data;

  return (
    <div
      className={`p-6 bg-white mt-5 rounded-xl shadow-sm cursor-pointer transition-transform transform duration-500 ease-in-out ${
        index === openId
          ? "transition-opacity opacity-100 duration-300 translate-y-0"
          : "transition-all delay-300 translate-y-1"
      }`}
      onClick={() => openHandler(index)}
    >
      <div className="flex justify-between px-3 items-center">
        <div className="w-3/4 space-x-10">
          <span>{index}.</span>

          <span>
            <span className="font-bold">Message From </span>
            <span className=" bg-gray-100 rounded-md py-2 px-3 ml-2">
              {email}
            </span>
          </span>

          <span>
            <span className="font-bold">Received On </span>
            <span className=" bg-gray-100 rounded-md py-2 px-3 ml-2">
              {dateFormater(createdAt)}
            </span>
          </span>
        </div>

        <span
          className={`w-auto space-x-5 rounded-lg text-white hover:bg-purple-800  shadow-md  ${
            index === openId
              ? "bg-gray-300 px-10 py-2 hover:bg-gray-800"
              : "base-bg px-4 py-2 hover:bg-violet-600"
          }`}
        >
          <span className="text-[17px] font-semibold">
            {index === openId ? "collapse" : "show message"}
          </span>
        </span>
      </div>

      {index === openId && (
        <>
          <hr className={"border-white my-7"} />
          <div className="bg-gray-100 rounded-md py-2 px-3 ml-2">
            {question}
          </div>
        </>
      )}
    </div>
  );
};
