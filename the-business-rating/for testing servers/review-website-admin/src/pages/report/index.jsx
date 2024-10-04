import React, { useState } from "react";
import ReviewReportTable from "./reviewReportTable";
import { getReviewReport } from "../../services/operations/reviewsAPI";
import { DeleteConfirmationPopup, TemporaryDrawer } from "./utility";

export default function Index() {
  const [state, setState] = useState([]);
  const [open, setOpen] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  React.useEffect(() => {
    (async () => {
      const data = await getReviewReport();

      setState(data);
    })();
  }, []);

  const reviewDeleteHandler = () => {
    setOpen(false);
  };

  const drawerHandler = (row) => {
    setDrawer(!drawer);
    setSelectedRow(row);
  };

  return (
    <div>
      <ReviewReportTable
        setOpen={setOpen}
        data={state}
        setSelectedRow={setSelectedRow}
        drawerHandler={drawerHandler}
      />

      <DeleteConfirmationPopup
        open={open}
        reviewDeleteHandler={reviewDeleteHandler}
        setOpen={setOpen}
      />

      {Object.keys(selectedRow).length > 0 && (
        <TemporaryDrawer
          state={drawer}
          setState={setDrawer}
          selectedRow={selectedRow}
        />
      )}
    </div>
  );
}
