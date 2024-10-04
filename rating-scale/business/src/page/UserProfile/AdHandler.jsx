import { useEffect, useState } from "react";
import {
  GetAdDetails,
  UpdateAdDetails,
} from "../../service/opreations/advertismentApi";
import AuthStore from "../../stores/authStore";
import { useNavigate } from "react-router-dom";
import { ImageUploadService } from "../../utils/imageUpload";
import { IMAGE_BASE } from "../../constants/path-constants";
import configStore from "../../stores/configStore";
import { customToast } from "../../utils/customToast";

export default function AdHandler() {
  const [state, setState] = useState([
    {
      id: 1,
      title: "link1",
      image: "",
      url: "",
    },
    {
      id: 1,
      title: "link2",
      image: "",
      url: "",
    },
    {
      id: 1,
      title: "link3",
      image: "",
      url: "",
    },
  ]);

  const [loaclimage, setLocalImage] = useState({
    fileInput1: null,
    fileInput2: null,
    fileInput3: null,
  });

  const [file, setFile] = useState({
    fileInput1: null,
    fileInput2: null,
    fileInput3: null,
  });

  const token = AuthStore((state) => state.userToken);
  const setSkeletonLoader = configStore((state) => state.setSkeletonLoader);

  const navigate = useNavigate();

  const imageSelectHandler = (event) => {
    const selectedFile = event.target.files[0];
    const blobUrl = URL.createObjectURL(selectedFile);

    const formData = new FormData();
    formData.append("image", selectedFile);

    setFile({ ...file, [event.target.id]: formData });

    setLocalImage({ ...loaclimage, [event.target.id]: blobUrl });
  };

  const updateurl = (event) => {
    const { id, value } = event.target;

    let index = state.findIndex((e) => e.title === id);

    if (index !== -1) {
      setState((prevState) => {
        const newState = [...prevState];
        newState[index] = { ...newState[index], ["url"]: value };
        return newState;
      });
    }
  };

  const imageUploadHandler = async (index, filete) => {
    setSkeletonLoader(true);

    const data = [...state];
    const fileName = await ImageUploadService(file[filete]);

    data[index].image = fileName.image;

    await UpdateAdDetails(token, navigate, { ads: JSON.stringify(data) });

    setState((prevState) => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], ["image"]: fileName.image };
      return newState;
    });

    setLocalImage({ ...loaclimage, [filete]: null });

    console.log(data, index);

    setSkeletonLoader(false);

    customToast("Advertisment updated successfully", "success");
  };

  useEffect(() => {
    (async () => {
      const data = await GetAdDetails(token, navigate);

      if (data.length && data[0]?.ads) {
        setState(JSON.parse(data[0]?.ads));
      }
    })();
  }, []);

  const updateUrls = async () => {
    setSkeletonLoader(true);

    await UpdateAdDetails(token, navigate, { ads: JSON.stringify(state) });

    customToast("Urls updated successfully", "success");

    setSkeletonLoader(false);
  };

  return (
    <div className="container relative px-3">
      <div className="flex justify-between gap-2">
        <label
          htmlFor="fileInput1"
          className="h-36 bg-violet-100 border rounded-md w-64 border-purple-900 border-dashed  flex items-center justify-center cursor-pointer relative overflow-hidden"
        >
          {!state[0].image && !loaclimage.fileInput1 && (
            <span className="border rounded-full px-3 py-2 border-gray-400">
              <i className="fa fa-upload" aria-hidden="true"></i>
            </span>
          )}

          {(state[0].image || loaclimage.fileInput1) && (
            <img
              className="w-full h-full object-cover"
              src={
                loaclimage.fileInput1
                  ? loaclimage.fileInput1
                  : state[0].image
                  ? IMAGE_BASE + state[0].image
                  : ""
              }
              alt=""
            />
          )}

          {loaclimage.fileInput1 && (
            <button
              onClick={() => imageUploadHandler(0, "fileInput1")}
              className=" bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border base-bg absolute top-1 left-1 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
            </button>
          )}

          <input
            type="file"
            id="fileInput1"
            hidden
            onChange={(e) => imageSelectHandler(e)}
          />
        </label>

        <label
          htmlFor="fileInput2"
          className="h-36 border rounded-md w-64 border-purple-900 border-dashed  flex items-center justify-center cursor-pointer overflow-hidden relative bg-violet-200"
        >
          {!state[1].image && !loaclimage.fileInput2 && (
            <span className="border rounded-full px-3 py-2 border-gray-400">
              <i className="fa fa-upload" aria-hidden="true"></i>
            </span>
          )}

          {(state[1].image || loaclimage.fileInput2) && (
            <img
              className="w-full h-full object-cover"
              src={
                loaclimage.fileInput2
                  ? loaclimage.fileInput2
                  : state[1].image
                  ? IMAGE_BASE + state[1].image
                  : ""
              }
              alt=""
            />
          )}

          {loaclimage.fileInput2 && (
            <button
              onClick={() => imageUploadHandler(1, "fileInput2")}
              className=" bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border base-bg absolute top-1 left-1 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
            </button>
          )}

          <input
            type="file"
            id="fileInput2"
            hidden
            onChange={(e) => imageSelectHandler(e)}
          />
        </label>

        <label
          htmlFor="fileInput3"
          className=" h-36 border rounded-md w-64 border-purple-900 border-dashed flex items-center justify-center cursor-pointer overflow-hidden relative bg-violet-200 "
        >
          {!state[2].image && !loaclimage.fileInput3 && (
            <span className="border rounded-full px-3 py-2 border-gray-400">
              <i className="fa fa-upload" aria-hidden="true"></i>
            </span>
          )}

          {(state[2].image || loaclimage.fileInput3) && (
            <img
              className="w-full h-full object-cover"
              src={
                loaclimage.fileInput3
                  ? loaclimage.fileInput3
                  : state[2].image
                  ? IMAGE_BASE + state[2].image
                  : ""
              }
              alt=""
            />
          )}

          {loaclimage.fileInput3 && (
            <button
              onClick={() => imageUploadHandler(2, "fileInput3")}
              className=" bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-2 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border base-bg absolute top-1 left-1 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M9.25 13.25a.75.75 0 0 0 1.5 0V4.636l2.955 3.129a.75.75 0 0 0 1.09-1.03l-4.25-4.5a.75.75 0 0 0-1.09 0l-4.25 4.5a.75.75 0 1 0 1.09 1.03L9.25 4.636v8.614Z" />
                <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
              </svg>
            </button>
          )}

          <input
            type="file"
            id="fileInput3"
            hidden
            onChange={(e) => imageSelectHandler(e)}
          />
        </label>
      </div>

      <div className=" text-red-700 mt-5 ">Recommended size (250 x 270) *</div>

      <div className="flex justify-between mt-5 gap-2">
        <div className="w-64">
          <label htmlFor="link1">URL for ad 1</label>
          <input
            value={state[0].url}
            onChange={(e) => updateurl(e)}
            id="link1"
            type="text"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none mt-2 "
          />
        </div>

        <div className="w-64">
          <label htmlFor="link1">URL for ad 2</label>
          <input
            value={state[1].url}
            onChange={(e) => updateurl(e)}
            id="link2"
            type="text"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none mt-2 "
          />
        </div>

        <div className="w-64">
          <label htmlFor="link1">URL for ad 3</label>
          <input
            value={state[2].url}
            onChange={(e) => updateurl(e)}
            id="link3"
            type="text"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none mt-2 "
          />
        </div>
      </div>

      <button
        onClick={() => updateUrls()}
        className="text-white bg-primary-600 hover:bg-primary-700 base-bg font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-5"
      >
        update urls
      </button>
    </div>
  );
}
