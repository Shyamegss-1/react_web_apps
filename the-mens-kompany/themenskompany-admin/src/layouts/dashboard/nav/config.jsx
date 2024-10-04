// component
import SvgColor from "../../../components/svg-color";
import {
  BLOG,
  CONTACT,
  COUPON,
  HOME,
  HOMEBANNER,
  ORDER,
  PAYMENTDETAILS,
  PRODUCTS,
  SOCIALLINKS,
  USER,
} from "../../../constants/route-path";

// ----------------------------------------------------------------------

const icon = (src) => <SvgColor src={src} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: "Dashboard",
    path: HOME,
    icon: icon("ic_dashboard"),
  },
  {
    title: "Contact",
    path: CONTACT,
    icon: icon("ic_contact"),
  },
  {
    title: "Coupon",
    path: COUPON,
    icon: icon("ic_coupon"),
  },
  {
    title: "Products",
    path: PRODUCTS,
    icon: icon("ic_product"),
  },
  {
    title: "Order",
    icon: icon("ic_cart"),
    key: 1,
    path: "/order",
    collapsable: [
      {
        title: "user",
        path: USER,
        icon: icon("ic_dot"),
      },
      {
        title: "order",
        path: ORDER,
        icon: icon("ic_dot"),
      },
      {
        title: "payment details",
        path: PAYMENTDETAILS,
        icon: icon("ic_dot"),
      },
    ],
  },
  {
    title: "Mangae content",
    icon: icon("ic_content"),
    key: 1,
    path: "content",
    collapsable: [
      {
        title: "Home page Banner",
        path: HOMEBANNER,
        icon: icon("ic_dot"),
      },
      {
        title: "social links / contact info",
        path: SOCIALLINKS,
        icon: icon("ic_dot"),
      },
      {
        title: "blogs",
        path: BLOG,
        icon: icon("ic_dot"),
      },
    ],
  },
];

export default navConfig;
