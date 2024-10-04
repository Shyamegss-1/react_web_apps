import { Component } from "react";
import SubTable from "./subTable";

import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import CustomBreadcrumbs from "../../core/components/custom-breadcrumbs/custom-breadcrumbs";
import { getSubscriptionDetails } from "../../services/operations/listing";

export default class Index extends Component {
  constructor() {
    super();

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    (async () => {
      const data = await getSubscriptionDetails();

      this.setState({ data });
    })();
  }

  render() {
    return (
      <div>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" mt={10}>
            <CustomBreadcrumbs
              heading="Subscription"
              links={[
                {
                  name: "Dashboard",
                  href: "/admin",
                },
                {
                  name: "Listing",
                  href: "#",
                },
              ]}
              sx={{
                mb: { xs: 3, md: 5 },
              }}
            />
          </Stack>

          <SubTable data={this.state.data} />
        </Container>
      </div>
    );
  }
}
