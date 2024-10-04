import { useEffect, useState } from "react";
import Editior from "./Editior";
import ColorSchemeModal from "./colorSchemeModal";
import { useNavigate } from "react-router-dom";
import { routes } from "../../../constants/router-path";
import { useForm } from "react-hook-form";
import AuthStore from "../../../stores/authStore";

import { ImageUploadService } from "../../../utils/imageUpload";
import { UpdateUserBusinessProfile } from "../../../service/opreations/userDetailsApi";
import configStore from "../../../stores/configStore";
import { customToast } from "../../../utils/customToast";
import { IMAGE_BASE } from "../../../constants/path-constants";

export default function Index() {
  // React Hook Form

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  // State
  const [state, setState] = useState({
    website: "",
    about: "",
    businessname: "",
    location: "",
    email: "",
    phone: "",
    jobtitle: "",
    workemail: "",
  });

  const [socialLinks, setSocialLinks] = useState([
    {
      title: "facebook",
      icon: "fa-facebook",
      url: "",
    },
    {
      title: "instagram",
      icon: "fa-instagram",
      url: "",
    },
    {
      title: "twitter",
      icon: "fa-twitter",
      url: "",
    },
    {
      title: "linkdin",
      icon: "fa-linkedin",
      url: "",
    },
  ]);

  const [locallogo, setLocalLogo] = useState("");
  const [localBanner, setLocalBanner] = useState("");
  const [colorModal, setColorModal] = useState(false);
  const [colorScheme, setColorScheme] = useState("");
  const [logoFormData, setLogoFormData] = useState(null);
  const [bannerFormData, setBannerFormData] = useState(null);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [phone, setPhone] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  // File Upload Handlers

  const LogoUploadHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      const blobUrl = URL.createObjectURL(selectedFile);

      reader.onload = (e) => {
        const blob = new Blob([e.target.result], { type: selectedFile.type });

        const imageSize = blob.size / 1000;

        const img = new Image();
        img.src = blobUrl;

        img.onload = function () {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          if (width <= 400 && height <= 300 && imageSize <= 1000) {
            setLocalLogo(blobUrl);
            const formData = new FormData();
            formData.append("image", selectedFile);
            setLogoFormData(formData);
          } else {
            alert("Recommended size 400px x 300px. && Maximum file size 1MB.");
          }
        };
      };

      reader.readAsArrayBuffer(selectedFile);
    } else {
      alert("No file selected.");
    }
  };

  const bannerUploadHandler = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      const blobUrl = URL.createObjectURL(selectedFile);
      reader.onload = (e) => {
        const blob = new Blob([e.target.result], { type: selectedFile.type });

        const imageSize = blob.size / 1000;

        const img = new Image();
        img.src = blobUrl;

        img.onload = function () {
          const width = img.naturalWidth;
          const height = img.naturalHeight;

          if (width <= 1400 && height <= 1200 && imageSize <= 1000) {
            setLocalBanner(blobUrl);
            const formData = new FormData();
            formData.append("image", selectedFile);
            setBannerFormData(formData);
          } else {
            alert("Recommended size 400px x 300px. && Maximum file size 1MB.");
          }
        };
      };

      reader.readAsArrayBuffer(selectedFile);
    } else {
      console.log("No file selected.");
    }
  };

  // Input Change Handler

  const inputHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  // Social Link Update Handler
  const updateSocialLink = (event) => {
    const { name, value } = event.target;

    setSocialLinks((prevLinks) => {
      return prevLinks.map((link) => {
        if (link.title === name) {
          return { ...link, url: value };
        }
        return link;
      });
    });
  };

  const usersDetails = AuthStore((state) => state.userDetails);
  const token = AuthStore((state) => state.userToken);
  const screenLoader = configStore((state) => state.setScreenLoader);

  useEffect(() => {
    // Update form values and component state when user details change

    if (usersDetails) {
      // Set form values using React Hook Form's setValue
      setValue("businessname", usersDetails.companyname);
      setValue("location", usersDetails.address);
      setValue("email", usersDetails.email);
      setValue("website", usersDetails.website);
      setValue("phone", usersDetails.phone);
      setValue(
        "workemail",
        usersDetails.details ? usersDetails?.details[0]?.workemail : ""
      );
      setValue(
        "about",
        usersDetails.details ? usersDetails?.details[0]?.about : ""
      );

      setPhone(usersDetails.details ? usersDetails?.details[0]?.phone : 1);

      if (usersDetails?.details) {
        const rp = usersDetails?.details[0]?.category?.split(",")?.map((e) => {
          return { value: e, label: e };
        });

        setCategory(rp);
      }

      // Set component state
      setState({
        website: usersDetails.website,
        about: usersDetails.details ? usersDetails?.details[0]?.about : "",
        businessname: usersDetails.companyname,
        location: usersDetails.address,
        email: usersDetails.email,
        phone: usersDetails.phone,
        jobtitle: usersDetails.jobtitle,
        workemail: usersDetails.details
          ? usersDetails?.details[0]?.workemail
          : "",
      });

      // Set banner and logo using component state
      setBanner(
        usersDetails.details && usersDetails?.details[0]?.banner
          ? IMAGE_BASE + usersDetails?.details[0]?.banner
          : null
      );
      setLogo(
        usersDetails.details && usersDetails?.details[0]?.icon
          ? IMAGE_BASE + usersDetails?.details[0]?.icon
          : null
      );

      // Set color scheme using user details
      setColorScheme(
        usersDetails.details ? usersDetails?.details[0]?.colorScheme : ""
      );

      // Set social links using user details or default value
      usersDetails?.details && usersDetails?.details[0]?.sociallinks
        ? setSocialLinks(JSON.parse(usersDetails.details[0].sociallinks))
        : setSocialLinks(socialLinks);
    }
  }, [usersDetails]);

  const updateHadler = async (event) => {
    // Show screen loader while updating user profile
    screenLoader(true);

    // Update user icon (logo) if a new logo is uploaded
    if (locallogo !== "") {
      const res = await ImageUploadService(logoFormData);
      event.icon = res.image;
    } else {
      // Use the existing user icon if no new logo is uploaded
      event.icon = usersDetails?.details[0]?.icon;
    }

    // Update user banner if a new banner is uploaded
    if (localBanner !== "") {
      const rest = await ImageUploadService(bannerFormData);
      event.banner = rest.image;
    } else {
      // Use the existing user banner if no new banner is uploaded
      event.banner = usersDetails?.details[0]?.banner;
    }

    event.phone = phone;

    // Combine data for API call
    const data = Object.assign(
      { socialLinks, colorScheme, category: selectedCategory },
      event
    );

    // Call API to update user business profile
    const response = await UpdateUserBusinessProfile(token, navigate, data);

    // Handle API response
    if (response === 200) {
      customToast("Your business listing updated successfully", "success");
    }

    // Hide screen loader after updating user profile
    screenLoader(false);

    // Return data if needed
    return data;
  };

  return (
    <>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-3/12 xl:w-3/12 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto bg-white border-r border-gray-200">
          <div className="flex justify-between py-5 px-4 border-b border-gray-200">
            <span
              onClick={() => navigate(routes.DASHBOARD)}
              className="text-sm text-slate-900 font-medium bg-gray-200 px-4 py-1 flex items-center rounded-lg space-x-3 cursor-pointer hover:shadow-sm"
            >
              <span className="text-lg">
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </span>
              <span className="text-base">Exit</span>
            </span>

            <span
              onClick={() => document.getElementById("CwQLTu").click()}
              className="text-sm text-white font-medium base-bg px-4 py-1 flex items-center rounded-lg space-x-3 cursor-pointer hover:shadow-sm"
            >
              <span className="text-base">Save</span>
            </span>
          </div>

          <div className="py-5 px-4">
            <Editior
              formHandler={handleSubmit}
              formError={errors}
              register={register}
              updateHandler={updateHadler}
              colorModal={() => setColorModal(true)}
              state={state}
              inputHandler={inputHandler}
              LogoUploadHandler={LogoUploadHandler}
              locallogo={locallogo}
              localBanner={localBanner}
              colorScheme={colorScheme}
              bannerUploadHandler={bannerUploadHandler}
              setLocalBanner={setLocalBanner}
              updateSocialLink={updateSocialLink}
              socialLinks={socialLinks}
              setSelectedCategory={setSelectedCategory}
              selectedCategory={selectedCategory}
              category={category}
              setCategory={setCategory}
              phone={phone}
              setPhone={setPhone}
            />
          </div>
        </div>
      </aside>

      <div className={"sm:ml-[35%] md:ml-[25%]"}>
        <div className="bg-white h-screen">
          <div className="container m-auto p-4 ">
            <div
              className="bg-slate-300 pt-7"
              style={
                localBanner
                  ? {
                      background: `url(${localBanner})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: " center",
                    }
                  : !localBanner && logo !== null
                  ? {
                      background: `url(${banner})`,
                      backgroundRepeat: "no-repeat",
                      backgroundSize: "cover",
                      backgroundPosition: " center",
                    }
                  : {}
              }
            >
              <div className="bg-white w-3/4 flex justify-between items-center p-5 m-auto rounded-t-lg">
                <div className="flex items-center space-x-3">
                  <div className="border w-16 rounded-lg  ">
                    <img
                      src={
                        locallogo !== ""
                          ? locallogo
                          : locallogo === "" && logo !== null
                          ? logo
                          : "https://cdn-icons-png.flaticon.com/512/4812/4812244.png"
                      }
                      alt=""
                      className="fluid"
                    />
                  </div>
                  <div>
                    <div className="text-xl font-bold">
                      {state.businessname?.trim().length
                        ? state.businessname
                        : "Your Business Name"}
                    </div>
                    <div className="text-base">
                      reviews{" "}
                      <span>
                        <i
                          className="fa fa-star text-warning"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-star text-warning"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-star text-warning"
                          aria-hidden="true"
                        ></i>
                        <i
                          className="fa fa-star text-warning"
                          aria-hidden="true"
                        ></i>{" "}
                        (5)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="">
                  <button className="border px-6 py-2 font-medium rounded-full">
                    verified
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white w-3/4 flex justify-between items-center p-5 m-auto rounded-b-lg border">
              <div className="space-x-3">
                <button className="bg-gray-200 px-6 py-2 rounded-md">
                  Details
                </button>

                <button className="border px-6 py-2 rounded-md">Media</button>
                <button className="border px-6 py-2 rounded-md">Review</button>
              </div>

              <div className="space-x-3">
                <button
                  className=" text-white px-6 py-2 rounded-md"
                  style={{
                    backgroundColor: !colorScheme ? `#02b9b5` : colorScheme,
                  }}
                >
                  Contact
                </button>
                <button
                  className="text-white px-6 py-2 rounded-md"
                  style={{
                    backgroundColor: !colorScheme ? `#02b9b5` : colorScheme,
                  }}
                >
                  Visit website
                </button>
              </div>
            </div>

            <div className="w-3/4 mt-6 m-auto flex">
              <div className="w-4/6">
                <p className="font-medium">About {state.businessname}</p>
                <p className="mt-3 text-base font-normal">
                  {state?.about?.length
                    ? state.about
                    : "Write something about your Business"}
                </p>
              </div>

              <div className="w-2/6 space-y-2">
                <div className="bg-slate-300 py-3 px-14 rounded-md flex justify-between">
                  {socialLinks.map((e) => (
                    <span
                      key={e.title}
                      style={{
                        backgroundColor: !colorScheme ? `#02b9b5` : colorScheme,
                      }}
                      className="h-10 rounded-full w-10 flex justify-center items-center text-white hover:bg-white cursor-pointer"
                    >
                      <i className={`fa ${e.icon}`} aria-hidden="true"></i>
                    </span>
                  ))}
                </div>

                <div className="bg-slate-300 p-3 rounded-md">
                  <p className="font-medium">Advertisement</p>
                  <p className="mt-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Amet, perferendis voluptatum autem tenetur libero eum nulla
                    eveniet, fuga nobis architecto quidem
                  </p>
                </div>
                <div className="bg-slate-300 p-3 rounded-md">
                  <ul className="px-5 space-y-2">
                    <li className="space-x-3">
                      <span className="text-lg">
                        <i className="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      <span className="text-[16px] font-semibold">
                        {state.workemail}
                      </span>
                    </li>

                    <li className="space-x-3">
                      <span className="text-lg">
                        <i className="fa fa-phone" aria-hidden="true"></i>
                      </span>
                      <span className="text-[16px] font-semibold">
                        {state.phone}
                      </span>
                    </li>

                    <li className="space-x-3">
                      <span className="text-lg">
                        <i className="fa fa-map-marker" aria-hidden="true"></i>
                      </span>
                      <span className="text-[16px] font-semibold">
                        {state.location?.trim().length
                          ? state.location
                          : "Your Business's address"}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ColorSchemeModal
        colorScheme={colorScheme}
        open={colorModal}
        setColorScheme={setColorScheme}
        closeHandler={() => setColorModal(false)}
      />
    </>
  );
}
