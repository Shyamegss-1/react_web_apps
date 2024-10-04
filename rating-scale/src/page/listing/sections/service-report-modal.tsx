import React, { useState } from "react";
import PopupPortal from "../../../components/portal/popupPortal";
import { Link, useNavigate, useParams } from "react-router-dom";

import useAuthStore from "../../../store/authStore";
import { BASEROUTE } from "../../../utils/constants";
import { REPORTREVIEW } from "../../../service/operations/reviewOperations";
import { toast } from "sonner";

interface ServiceData {
  // Define the type for your service data here
}

interface ReportOption {
  id: number;
  title: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ServiceData;
}

export default function ServiceReportModal({ isOpen, onClose, data }: Props) {
  const [state, setState] = useState<boolean>(false);
  const [display, setDisplay] = useState<number>(1);
  const [report, setReport] = useState<string>("Harmful or illegal");

  const navigate = useNavigate();
  const token = useAuthStore((state) => state.userToken);
  const { id } = useParams();

  const submitHandler = async () => {
    if (token) {
      const f = { ...data, report };
      onClose();
      const response = await REPORTREVIEW(f, token);

      if (response.status === 200) {
        toast.success("Report posted! We'll get in touch shortly. !");
      }
    } else {
      navigate(BASEROUTE + "/login");
    }
  };

  function getSubdomain(domain: string): string {
    const s = domain.split(".");
    const newdomain = `${s[s.length - 2]}.${s[s.length - 1]}`;
    return newdomain;
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.checked);
  };

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReport(e.target.value);
  };

  const is = (
    <div className="p-3">
      <p>
        You can use this flagging process if you’re a consumer.
        <Link to="/flagging-process" className="text-primary">
          Read more.
        </Link>{" "}
      </p>
      <p>
        If you’re from {getSubdomain(id.replaceAll("-", "."))} and want to flag
        this review, please use your{" "}
        <Link to="#" className="text-primary">
          business account
        </Link>
        .
      </p>
      <div className="mt-3">
        <input
          type="checkbox"
          className="form-check-input me-2"
          name="popop"
          id="popop"
          checked={state}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="popop">
          I’m not from {getSubdomain(id.replaceAll("-", "."))}
        </label>
      </div>
      <button
        onClick={() => setDisplay(2)}
        disabled={!state}
        id="sdasd"
        className="btn btn-primary mt-2"
      >
        next
      </button>
    </div>
  );

  const has = (
    <div className="p-3">
      <div>
        {dataa.map((e) => (
          <div key={e.id} className="form-check">
            <label
              className="form-check-label"
              style={{ cursor: "pointer" }}
              htmlFor={"exampleRadios" + e.id}
            >
              {e.title}
              <input
                className="form-check-input"
                type="radio"
                checked={report === e.title}
                name="exampleRadios"
                onChange={handleReportChange}
                id={"exampleRadios" + e.id}
                value={e.title}
              />
            </label>
          </div>
        ))}
      </div>
      <div className="mt-4 d-flex gap-2">
        <button className="btn btn-secondary" onClick={() => setDisplay(1)}>
          Back
        </button>
        <button className="btn btn btn-primary" onClick={submitHandler}>
          Submit
        </button>
      </div>
    </div>
  );

  return (
    <PopupPortal isOpen={isOpen} onClose={onClose}>
      <div className="box-review-report">
        <h3 className="p-3">
          Do you think there’s a problem with this review ?
        </h3>
        <hr />
        {display === 1 && is}
        {display === 2 && has}
      </div>
    </PopupPortal>
  );
}

const dataa: ReportOption[] = [
  { id: 1, title: "Harmful or illegal" },
  { id: 2, title: "Personal information" },
  { id: 3, title: "Advertising or promotional" },
  { id: 4, title: "Not based on a genuine experience" },
  { id: 5, title: "Other" },
];
