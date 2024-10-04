import { useQuery } from "@tanstack/react-query";
import {
  GETUSERDETAILS,
  UPDATEUSERDETAILS,
  USERREVIEWSTATS,
} from "../../../service/operations/userOperations";
import useAuthStore from "../../../store/authStore";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useBackdropLoader } from "../../../components/backdropLoader/backdropLoader";
import { PhoneInput } from "react-international-phone";
import { ImageUploadService } from "../../../utils/imageHandler";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  image: string;
};

export default function Index() {
  const [phone, setPhone] = useState<string>("+1");

  const [blob, setBlob] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const token: string = useAuthStore((state) => state.userToken)!;
  const userLoginHandler = useAuthStore((state) => state.signin);

  const { startLoading, closeLoading } = useBackdropLoader();

  const { data, isPending } = useQuery({
    queryKey: ["userreviews"],
    queryFn: () => USERREVIEWSTATS(token),
  });

  const { data: userData, isPending: isNotYet } = useQuery({
    queryKey: ["userdetails"],
    queryFn: () => GETUSERDETAILS(token),
  });

  useEffect(() => {
    if (userData) {
      if (!isNotYet) {
        Object.entries(userData.data).forEach(([key, value]) => {
          setPhone(userData?.data?.phone ?? "+1");
          setValue(key, value);
        });
      }
    }
  }, [userData, setValue, isNotYet]);

  if (isPending || !userData) return <p>Loading...</p>;

  const stats: { true: number; false: number; null: number } = data?.data ?? {};

  const updateHandler = async (event: Inputs) => {
    const authStore = JSON.parse(localStorage.getItem("authStore")! ?? {});

    event.phone = phone;

    startLoading();

    if (image) {
      const res = await ImageUploadService(image);
      event.image = res.image;
    } else {
      event.image = authStore.state.userData.image;
    }

    const updatedData = await UPDATEUSERDETAILS(token, event);

    if (updatedData.status === 200) {
      authStore.state.userData = updatedData.data;

      userLoginHandler(token, updatedData.data);

      localStorage.setItem("authStore", JSON.stringify(authStore));
      toast.success("Details updated successfully");
    }

    closeLoading();
  };

  const imageUploadHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const image: File | null = event.target.files?.[0];

    if (image) {
      const formData: FormData = new FormData();
      formData.append("image", image);

      const reader: FileReader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img: HTMLImageElement = new Image();
        if (e.target && typeof e.target.result === "string") {
          img.src = e.target.result;

          img.onload = () => {
            const width: number = img.width;
            const height: number = img.height;

            if (width > 300 || height > 300) {
              alert("Image dimensions should not exceed 300x300 pixels");
            } else {
              const blob: string = URL.createObjectURL(image);
              setBlob(blob);
              setImage(formData);
            }
          };
        }
      };

      reader.readAsDataURL(image);
    }
  };

  return (
    <div className="user-admin-rightside">
      <div className="row">
        <div className="col-12">
          <div className="table_box mt-3">
            <table className="table table-bordered text-center">
              <thead>
                <tr>
                  <th
                    colSpan={4}
                    className="bg-light"
                    style={{ backgroundColor: "#7053c1" }}
                  >
                    <h4 className="text-center table_h1 text-black">
                      My Reviews
                    </h4>
                  </th>
                </tr>
                <tr>
                  <th
                    scope="col"
                    className="w-25"
                    style={{ backgroundColor: "#75ff753d" }}
                  >
                    <h5 className="fs-6">Live</h5>
                  </th>
                  <th
                    scope="col"
                    className="w-25"
                    style={{ backgroundColor: "#fdff003d" }}
                  >
                    <h5 className="fs-6">Moderation</h5>
                  </th>

                  <th
                    scope="col"
                    className="w-25"
                    style={{ backgroundColor: "#ff00003d" }}
                  >
                    <h5 className="fs-6">Rejected</h5>
                  </th>
                  <th
                    scope="col"
                    className="w-25"
                    style={{ backgroundColor: "#858eed85" }}
                  >
                    <h5 className="fs-6">Total</h5>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h4>{stats.true ?? 0}</h4>
                  </td>
                  <td>
                    <h4>{stats.null ?? 0}</h4>{" "}
                  </td>

                  <td>
                    <h4>{stats.false ?? 0}</h4>
                  </td>
                  <td>
                    <h4>
                      {Object.keys(stats).length
                        ? Object.values(stats).reduce((acc, u) => (acc += u), 0)
                        : 0}
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="user-profile-details" id="profiledetails">
        <h4>Profile Details</h4>

        <form onSubmit={handleSubmit(updateHandler)}>
          <div className="row">
            <div className="col-lg-12 mt-3">
              <div className="form-field">
                <label>Profile Picture</label>
                <input
                  type="file"
                  name="c_logo"
                  id=""
                  className="form-control"
                  onChange={(e) => imageUploadHandler(e)}
                />
                <small className="mx-1">Image size (100x100)px</small>
              </div>
            </div>
            <div className="col-lg-12 mt-3">
              <div className="form-field">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("name", { required: "This Field is required" })}
                />
                {errors.name && (
                  <p className="error-p">{errors.name.message}...</p>
                )}
              </div>
            </div>

            <div className="col-lg-6 mt-3">
              <div className="form-field">
                <label>Phone Number</label>

                {phone && (
                  <PhoneInput
                    defaultCountry="ua"
                    value={phone}
                    inputClassName="form-control"
                    onChange={(phone) => setPhone(phone)}
                  />
                )}
                {/* <input
                  type="number"
                  className="form-control"
                  {...register("phone", { required: "This Field is required" })}
                /> */}
                {errors.phone && (
                  <p className="error-p">{errors.phone.message}...</p>
                )}
              </div>
            </div>
            <div className="col-lg-6 mt-3">
              <div className="form-field">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  disabled
                  className="form-control"
                  {...register("email", { required: "This Field is required" })}
                />

                {errors.email && (
                  <p className="error-p">{errors.email.message}...</p>
                )}
              </div>
            </div>

            <div className="col-lg-12 mt-3">
              <div className="form-field">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("address", {
                    required: "This Field is required",
                  })}
                />

                {errors.address && (
                  <p className="error-p">{errors.address.message}...</p>
                )}
              </div>
            </div>

            <div className="col-lg-12 mt-3">
              <div className="form-field">
                <button type="submit" name="profilesubmit">
                  UPDATE
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
