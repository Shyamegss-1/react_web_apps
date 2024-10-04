import * as valid from "./static-data-interface";

// ----------------------------------------------------------

import LaptopIcon from "@mui/icons-material/Laptop";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import TabletIcon from "@mui/icons-material/Tablet";

export const WINDOWSIZE: valid.windowInterface[] = [
  { id: "XL", size: "xl", title: "window", icon: <LaptopIcon /> },
  { id: "MD", size: "md", title: "tablet", icon: <TabletIcon /> },
  { id: "XS", size: "sm", title: "phone", icon: <PhoneAndroidIcon /> },
];
