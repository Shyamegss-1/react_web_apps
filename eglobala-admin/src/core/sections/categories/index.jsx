import React, { useState } from "react";
import CategoryTable from "./categoriesTable";
import EditCategories from "./edit-Categories";

import { useNavigate } from "react-router-dom";

// * hook

import useOnceEffect from "../../hooks/useOnce";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { getSubcategoryData } from "../../../services/operations/subcategoryApi";

export default function Index({ open, setOpen, openHandler }) {
  const { token, loading } = useSelector((e) => e.auth);

  const navigate = useNavigate();

  const [state, setState] = useState([]);

  useOnceEffect(async () => {
    const data = await getSubcategoryData(token, navigate, true);
    setState(data);
  }, [loading]);

  return (
    <div>
      {state.length > 0 ? (
        <CategoryTable
          openHandler={openHandler}
          data={state}
          setOpen={setOpen}
          setData={setState}
        />
      ) : (
        <Box my={30}>
          <Typography variant="inherit" textAlign="center">
            We couldn't find any information to show.
          </Typography>
          <Typography variant="inherit" textAlign="center">
            Click{" "}
            <span onClick={() => openHandler("c")} className="stle-dir">
              here
            </span>{" "}
            to add new category
          </Typography>
        </Box>
      )}

      <EditCategories open={open} setOpen={setOpen} setData={setState} />
    </div>
  );
}
