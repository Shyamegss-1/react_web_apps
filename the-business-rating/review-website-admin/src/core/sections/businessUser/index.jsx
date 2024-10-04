import React, { useState } from "react";
import UserTable from "./UserTable";
// import EditCategories from "./edit-Categories";

import { useNavigate } from "react-router-dom";

// * hook

import useOnceEffect from "../../hooks/useOnce";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import {
  deleteUserData,
  getBusinessUser,
  getUserData,
} from "../../../services/operations/userAPI";
import toast from "react-hot-toast";

export default function Index({ open, setOpen, openHandler }) {
  const { token, loading } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([]);

  const [selectedOption, setSelectedOption] = useState({});

  useOnceEffect(async () => {
    const data = await getBusinessUser();
    setState(data);
  }, [loading]);

  const deleteHandler = async (ui) => {
    const res = await deleteUserData(ui, token, navigate, true);

    res === "success"
      ? toast.success("user deleted successfully")
      : toast.success("something went wrong ! try again");

    if (res === "success") {
      const d = state.filter((e) => e.id !== ui);
      setState(d);
    }
  };

  return (
    <div>
      {state.length > 0 ? (
        <UserTable
          openHandler={openHandler}
          data={state}
          setOpen={setOpen}
          setData={setState}
          setSelectedOption={setSelectedOption}
          deleteHandler={deleteHandler}
        />
      ) : (
        <Box my={30}>
          <Typography variant="inherit" textAlign="center">
            We couldn't find any information to show.
          </Typography>
        </Box>
      )}
    </div>
  );
}
