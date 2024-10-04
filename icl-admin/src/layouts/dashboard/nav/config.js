// component
import SvgColor from "../../../components/svg-color";
import {
  ABOUTUS,
  ADMIN,
  BLOG,
  CONTACT,
  HOMEBANNER,
  PRODUCTPAGE,
  CATEGORIES,
  USER,
  ORDER,
  COUPON,
  PAYMENTGATEWAY,
  SUBSCRIBE,
  SEO,
  SETTING,
  NEWSLETTER,
} from "../../../constants/route-path";

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor
    src={`${process.env.PUBLIC_URL}/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const navConfig = [
  {
    title: "dashboard",
    path: ADMIN,
    icon: icon("ic_analytics"),
  },
  {
    title: "Banner",
    path: HOMEBANNER,
    icon: icon("ic_banner"),
  },
  {
    title: "user",
    path: USER,
    icon: icon("ic_user"),
  },
  {
    title: "product",
    path: PRODUCTPAGE,
    icon: icon("ic_cart"),
  },
  {
    title: "Order",
    path: ORDER,
    icon: icon("ic_order"),
  },
  {
    title: "category",
    path: CATEGORIES,
    icon: icon("ic_category"),
  },
  {
    title: "coupon",
    path: COUPON,
    icon: icon("ic_coupon"),
  },
  {
    title: "Payment gateway",
    path: PAYMENTGATEWAY,
    icon: icon("ic_money"),
  },
  {
    title: "blog",
    path: BLOG,
    icon: icon("ic_blog"),
  },
  {
    title: "about",
    path: ABOUTUS,
    icon: icon("ic_about"),
  },
  {
    title: "subscribe",
    path: SUBSCRIBE,
    icon: icon("ic_subscribe"),
  },
  {
    title: "newsletter",
    path: NEWSLETTER,
    icon: icon("ic_subscribe"),
  },
  {
    title: "Contact",
    path: CONTACT,
    icon: icon("ic_contact"),
  },
  {
    title: "S.E.O",
    path: SEO,
    icon: icon("ic_seo"),
  },
  {
    title: "Setting",
    path: SETTING,
    icon: icon("ic_setting"),
  },
];

export default navConfig;
