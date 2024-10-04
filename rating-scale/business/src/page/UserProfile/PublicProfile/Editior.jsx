/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

import Select from "react-select";
import InputField from "../../../components/InputField/InputField";
import { useEffect, useState } from "react";
import { GetCategory } from "../../../service/opreations/userDetailsApi";

import { useNavigate } from "react-router-dom";
import AuthStore from "../../../stores/authStore";

import { PhoneInput } from "react-international-phone";

export default function Editior({
  inputHandler,
  state,
  LogoUploadHandler,
  bannerUploadHandler,
  locallogo,
  setPhone,
  phone,
  localBanner,
  setLocalBanner,
  updateSocialLink,
  formHandler,
  formError,
  register,
  updateHandler,
  socialLinks,
  setSelectedCategory,
  setCategory,
  category,
}) {
  const navigate = useNavigate();
  const token = AuthStore((state) => state.userToken);

  const [ssss, setstate] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await GetCategory(token, navigate);

      const d = data.map((e) => {
        return { value: e.title, label: e.title };
      });

      setstate(d);
    })();
  }, []);

  const setSelectedCategoryHandler = (fur) => {
    setCategory(fur);

    const data = fur?.map((element) => {
      return element.value;
    });

    setSelectedCategory(data.join(","));
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <div className="w-[30%] p-2 overflow-hidden">
          <img
            src={locallogo !== "" ? locallogo : "/upload.png"}
            className="w-full max-h-32 max-w-28 object-cover bg-white border rounded-md shadow-sm"
            alt=""
          />
        </div>
        <div>
          <h4 className="font-bold text-lg">Logo</h4>
          <div>
            <button
              onClick={() => {
                document.getElementById("minusdevice").click();
              }}
              className="rounded-full bg-purple-200 text-purple-950 font-bold p-2 px-4 mt-2"
            >
              upload
            </button>

            <input
              type="file"
              onChange={(event) => LogoUploadHandler(event)}
              hidden
              id="minusdevice"
            />
          </div>

          <p className="mt-2">Recommended size 400px x 300px.</p>
          <p className="mt-0">Maximum file size 1MB.</p>
        </div>
      </div>

      <form autoComplete="off" onSubmit={formHandler(updateHandler)}>
        <div>
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Business Name
          </label>
          <InputField
            value={state.businessname}
            name="businessname"
            placeholder="Business Name"
            {...register("businessname", {
              required: true,
              onChange: (event) => inputHandler(event),
            })}
            error={formError.businessname}
          />
        </div>

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Website
          </label>

          <InputField
            value={state.website}
            name="website"
            disabled
            placeholder="https://example.com"
            {...register("website", {
              required: true,
              onChange: (event) => inputHandler(event),
            })}
            error={formError.website}
          />
        </div>

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Address
          </label>
          <InputField
            value={state.location}
            name="location"
            placeholder="xyz street,city,country"
            {...register("location", {
              required: true,
              onChange: (event) => inputHandler(event),
            })}
            error={formError.location}
          />
        </div>

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Work Email
          </label>

          <InputField
            value={state.workemail}
            name="workemail"
            placeholder="youremial@gmail.com"
            {...register("workemail", {
              required: true,
              onChange: (event) => inputHandler(event),
            })}
            error={formError.email}
          />
        </div>

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Email
          </label>
          <InputField
            value={state.email}
            name="email"
            disabled
            placeholder="youremial@gmail.com"
            {...register("email", {
              required: true,
              onChange: (event) => inputHandler(event),
            })}
            error={formError.email}
          />
        </div>

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Phone
          </label>
          {/* <InputField
            value={state.phone}
            name="phone"
            placeholder="+1 2649 875"
            {...register("phone", {
              required: true,
              onChange: (event) => inputHandler(event),
            })}
            error={formError.phone}
          /> */}

          <PhoneInput
            inputClassName="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none"
            defaultCountry="us"
            name="phone"
            value={phone}
            onChange={(phone) => setPhone(phone)}
          />
        </div>

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Category
          </label>

          {ssss.length ? (
            <Select
              isMulti
              value={category}
              name=""
              onChange={(e) => setSelectedCategoryHandler(e)}
              styles={{ outline: "none" }}
              options={ssss}
              className="basic-multi-select"
              classNamePrefix="select"
            />
          ) : (
            <InputField type="text" disabled />
          )}
        </div>

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            About
          </label>

          <textarea
            rows={7}
            value={state.about}
            name="about"
            placeholder="about"
            className={` ${
              formError.about && "border-red-600"
            } block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none `}
            {...register("about", {
              required: true,
              onChange: (event) => inputHandler(event),
            })}
          />
        </div>

        {!localBanner ? (
          <div className="flex items-center gap-2 mb-8 mt-5">
            <div className="w-[30%] p-2 overflow-hidden">
              <img
                src={localBanner !== "" ? localBanner : "/upload.png"}
                className="w-full max-h-32  max-w-28 object-cover bg-white border rounded-md shadow-sm"
                alt=""
              />
            </div>

            <div>
              <h4 className="font-bold text-lg">Banner</h4>
              <div>
                <button
                  type="button"
                  onClick={() => {
                    document.getElementById("plusdevice").click();
                  }}
                  className="rounded-full bg-purple-200 text-purple-950 font-bold p-2 px-4 mt-2"
                >
                  upload
                </button>
                <input
                  type="file"
                  onChange={(event) => bannerUploadHandler(event)}
                  hidden
                  id="plusdevice"
                />
              </div>

              <p className="mt-2">Recommended size 1400px x 1200px.</p>
              <p className="mt-0">Maximum file size 1MB.</p>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            <label className="block mb-2 text-sm font-bold text-gray-900">
              Banner
            </label>
            <div
              style={{
                background: `url(${localBanner})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: " center",
              }}
              className="w-full h-32 rounded-lg bg-no-repeat bg-cover relative"
            >
              <span
                onClick={() => setLocalBanner("")}
                className="bg-white opacity-60 rounded-full text-gray-500 px-1 absolute right-3 top-3 cursor-pointer"
              >
                <i className="fa fa-times-circle-o " aria-hidden="true"></i>
              </span>
            </div>
          </div>
        )}

        {/* <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Color Scheme
          </label>

          <div className="rounded-lg p-3 shadow-sm shadow-indigo-100 border flex justify-between items-center">
            <span
              className="rounded-md px-5 py-5"
              style={{
                backgroundColor: !colorScheme ? `#02b9b5` : colorScheme,
              }}
            ></span>
            <span
              onClick={colorModal}
              className="px-3 py-2 bg-slate-300 rounded hover:shadow text-sm font-semibold"
              role="button"
            >
              change
            </span>
          </div>
        </div> */}

        <div className="mt-5">
          <label className="block mb-2 text-sm font-bold text-gray-900">
            Social Links (optionl)
          </label>

          <input
            value={socialLinks[0].url}
            name="facebook"
            placeholder="faebook"
            onChange={(event) => updateSocialLink(event)}
            className="block w-full rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none "
          />

          <input
            value={socialLinks[1].url}
            name="instagram"
            placeholder="instagram"
            onChange={(event) => updateSocialLink(event)}
            className="block w-full mt-2 rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none "
          />

          <input
            value={socialLinks[2].url}
            name="twitter"
            placeholder="twitter"
            onChange={(event) => updateSocialLink(event)}
            className="block w-full mt-2 rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none "
          />

          <input
            value={socialLinks[3].url}
            name="linkdin"
            placeholder="linkdin"
            onChange={(event) => updateSocialLink(event)}
            className="block w-full mt-2 rounded-md border-0 p-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 outline-none "
          />
        </div>

        <input type="submit" hidden id="CwQLTu" />
      </form>
    </div>
  );
}
