import AuthStore from "../../stores/authStore";
import { useEffect, useState } from "react";
import configStore from "../../stores/configStore";
import { ImageUploadService } from "../../utils/imageUpload";
import {
  GetMedia,
  InsertNewMedia,
  deleteMedia,
} from "../../service/opreations/advertismentApi";
import cryptoJs from "crypto-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dateFormater } from "../../utils/helpers";
import { IMAGE_BASE } from "../../constants/path-constants";

export default function MediaHandler() {
  const skeletonLoader = configStore((state) => state.skeletonLoader);
  const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);

  const token = AuthStore((state) => state.userToken);
  const user = AuthStore((state) => state.userDetails);

  const navigate = useNavigate();

  const [mediaType, setMediaType] = useState("photo");
  const [selectedMedia, setSelectedMedia] = useState("");

  const [media, setMedia] = useState([]);

  const [laLocale, setLaLocale] = useState("");

  useEffect(() => {
    (async () => {
      const data = await GetMedia(token, navigate);
      setMedia(data);
    })();
  }, []);

  const fileHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const formData = new FormData();

      if (mediaType === "photo" && selectedFile.size <= 250 * 1024) {
        formData.append("image", selectedFile);
        setSelectedMedia(formData);

        const blobUrl = URL.createObjectURL(selectedFile);
        setLaLocale(blobUrl);
      } else if (
        mediaType === "video" &&
        selectedFile.size <= 10 * 1024 * 1024
      ) {
        formData.append("video", selectedFile);
        setSelectedMedia(formData);

        const blobUrl = URL.createObjectURL(selectedFile);
        setLaLocale(blobUrl);
      } else {
        alert("Invalid file size. Please check the file requirements.");
      }
    }
  };

  const uploadMediaHandler = async () => {
    if (mediaType === "photo") {
      setSkeletonLoader(true);
      const fileName = await ImageUploadService(selectedMedia);

      const data = {
        media_url: fileName.image,
        listingId: user.details[0]?.id,
        media_type: "photo",
      };

      await InsertNewMedia(token, navigate, { ...data });
      setSkeletonLoader(false);
    } else {
      const res = await VideoUploadService(selectedMedia);
      const data = {
        media_url: res.video,
        listingId: user.details[0]?.id,
        media_type: "video",
      };

      setSkeletonLoader(true);
      await InsertNewMedia(token, navigate, { ...data });

      setSkeletonLoader(false);
    }

    const data = await GetMedia(token, navigate);
    setMedia(data);
  };

  const handleDelete = async (id) => {
    const userConfirmed = window.confirm("Do you want to proceed?");

    if (userConfirmed) {
      setSkeletonLoader(true);
      await deleteMedia(token, navigate, id);
    }

    const data = await GetMedia(token, navigate);
    setMedia(data);

    setSkeletonLoader(false);
  };

  return (
    <div className="px-4">
      <div
        onClick={() =>
          setMediaType((state) => (state === "video" ? "photo" : "video"))
        }
        className="py-2 px-3 flex bg-gray-200 rounded-md gap-3 mb-3 cursor-pointer"
      >
        <span
          className={`rounded-md text-2xl py-2 w-full text-center ${
            mediaType === "photo" && " bg-zinc-800 text-teal-50"
          }`}
        >
          Photo
        </span>

        <span
          className={`rounded-md text-2xl py-2 w-full text-center ${
            mediaType === "video" && " bg-zinc-800 text-teal-50"
          }`}
        >
          Video
        </span>
      </div>

      <div className="my-3" id="p-loader" style={{ display: "none" }}>
        <div className="border rounded-xl overflow-hidden">
          <div
            id="m-loader"
            className="rounded-lg p-2 base-bg h-4 flex justify-center items-center text-white w-1 ease-in-out transition-transform"
          >
            <span id="progre-loader">0%</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="w-full">
          {/* <div className="w-full h-[19px] relative rounded-full border border-lime-950 my-4">
            <div className="w-10 h-[19px] left-0 top-0 absolute bg-violet-800 rounded-[50px]" />
          </div> */}

          {!selectedMedia ? (
            <label
              htmlFor="file-input"
              className="py-10 flex bg-purple-100 cursor-pointer flex-col border-2 border-purple-900 rounded-lg border-dashed items-center justify-center"
            >
              <h1 className="text-3xl mb-2 font-bold">Upload Your File</h1>
              <p>(Note : Choose Media type first)</p>
              <p>Max image size 250 kb</p>
              <p>Max video size 10 mb</p>

              <input
                onChange={(e) => fileHandler(e)}
                type="file"
                disabled={mediaType === ""}
                accept={
                  mediaType === "photo"
                    ? "image/*"
                    : "video/mp4, video/x-m4v, video/*"
                }
                name="file-input"
                id="file-input"
                className="block sr-only w-full border border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500  file:bg-transparent file:border-0 file:bg-gray-100 file:mr-4 file:py-2"
              />
            </label>
          ) : (
            <div className="rounded-xl overflow-hidden w-full h-48 relative">
              <img className=" w-full" src={laLocale} alt="" />

              <span
                onClick={() => setSelectedMedia("")}
                className="absolute top-1 left-1 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-zinc-700"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>

        <div className="w-full">
          <button
            onClick={uploadMediaHandler}
            disabled={skeletonLoader || !selectedMedia}
            className="text-sm w-full text-white font-medium base-bg px-4 py-2 flex items-center rounded-lg space-x-3 cursor-pointer hover:shadow-sm"
          >
            <span className="text-base text-center w-full">Add</span>
          </button>
        </div>
      </div>

      <div>
        <hr className="my-5" />
        {media.map((e, index) => (
          <div
            key={index}
            className="flex justify-between  p-3 bg-gray-200 rounded-md mb-2 items-center"
          >
            <div className="flex gap-5 items-center">
              <span className="w-8 rounded-md h-8 border bg-gray-200 overflow-hidden">
                {e.media_type === "photo" ? (
                  <img
                    src={IMAGE_BASE + e.media_url}
                    alt=""
                    style={{ objectFit: "cover", height: "100%" }}
                  />
                ) : (
                  <img
                    src={
                      "https://media.istockphoto.com/id/639310276/photo/road-trip-to-mount-cook-lake-pukaki-new-zealand.webp?b=1&s=170667a&w=0&k=20&c=Eo28DX8_dzyPPSgtUSeb17gXidbi20H-DfNpPnl_9Tc="
                    }
                    style={{ objectFit: "cover", height: "100%" }}
                    alt=""
                  />
                )}
              </span>

              <div>
                <span>Media Type</span> : <span>{e.media_type}</span>
              </div>

              <div>
                <span>{dateFormater(e.createdAt)}</span>
              </div>
            </div>

            <div className="">
              <span
                onClick={() => handleDelete(e.id)}
                className="px-2 py-1 bg-red-500 rounded-lg text-white cursor-pointer"
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const getHash = () => {
  return cryptoJs.MD5("456456456456456456").toString();
};

const VideoUploadService = async (object) => {
  let hashCode = getHash();

  document.getElementById("p-loader").style.display = `block`;

  const response = await axios.post(
    `https://rating-scale.com/media/video.php?api_key=${hashCode}`,
    object,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        document.getElementById("m-loader").style.width = `${percentage}%`;
        document.getElementById("progre-loader").innerText = `${percentage}%`;
      },
    }
  );

  document.getElementById("p-loader").style.display = `none`;

  return response.data;
};
