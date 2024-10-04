import React, { useState } from "react";
import DepartmentTable from "./departmentTable";
import EditCategories from "./edit-Categories";

import { Link, useNavigate } from "react-router-dom";

// * hook

import useOnceEffect from "../../hooks/useOnce";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  deleteReviewData,
  getReviewData,
  updateReviewStatus,
} from "../../../services/operations/reviewsAPI";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function Index({ open, setOpen, openHandler }) {
  const { token, loading } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([]);

  const [selectedOption, setSelectedOption] = useState({});

  useOnceEffect(async () => {
    const data = await getReviewData(token, navigate, true);
    setState(data);
  }, [loading]);

  const deleteHandler = async (ui) => {
    const res = await deleteReviewData(ui, token, navigate, true);

    res === "success"
      ? toast.success("review deleted successfully")
      : toast.success("something went wrong ! try again");

    if (res === "success") {
      const d = state.filter((e) => e.id !== ui);
      setState(d);
    }
  };

  const ReviewVerifyHandler = async (id) => {
    console.log(id);

    let y = [...state];
    let x = y.find((e) => e.id === id);
    let status = "";
    if (x.active !== undefined) {
      x.active = !x.active;

      console.log(id);
      status = await updateReviewStatus({ id, status: x.active });
    } else {
      status = await updateReviewStatus({ id, status: x.active });
      x.active = false;
    }

    if (status === "success") {
      setState(y);
      toast.success("status updated");
    }
  };

  return (
    <div>
      {state.length > 0 ? (
        <DepartmentTable
          setSelectedOption={setSelectedOption}
          openHandler={openHandler}
          data={state}
          setOpen={setOpen}
          setData={setState}
          deleteHandler={deleteHandler}
          ReviewVerifyHandler={ReviewVerifyHandler}
        />
      ) : (
        <Box my={30}>
          <Typography variant="inherit" textAlign="center">
            We couldn't find any information to show .
          </Typography>
          <Typography variant="inherit" textAlign="center">
            We could Not find any reviews !!
          </Typography>
        </Box>
      )}

      <EditCategories
        open={open}
        setOpen={setOpen}
        setData={setState}
        selectedOption={selectedOption}
      />
    </div>
  );
}
