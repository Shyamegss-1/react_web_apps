import { Card, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { contactService } from "../../../services/apiServices/apiService";
import ContactTable from "../../sections/@contact/contactTable";

export default function Index() {
  const [first, setfirst] = useState([]);

  useEffect(() => {
    contactService().then((e) => setfirst(e.data.data));
  }, []);

  return (
    <>
      <Container>
        <Card>
          <ContactTable user={first} />
        </Card>
      </Container>
    </>
  );
}
