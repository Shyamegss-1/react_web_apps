import HomeOutline from "mdi-material-ui/HomeOutline";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import RateReviewIcon from "@mui/icons-material/RateReview";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import FlagIcon from "@mui/icons-material/Flag";

const navigation = () => {
  return [
    {
      title: "Dashboard",
      icon: HomeOutline,
      path: "/admin",
    },
    {
      title: "Reviews",
      icon: RateReviewIcon,
      path: "/admin/review",
    },
    {
      title: "Users",
      icon: PersonIcon,
      path: "/admin/user",
    },
    {
      title: "Business users",
      icon: PersonIcon,
      path: "/admin/businessuser",
    },
    {
      title: "Subscriptions",
      icon: SubscriptionsIcon,
      path: "/admin/subscription",
    },
    {
      title: "Report",
      icon: FlagIcon,
      path: "/admin/report",
    },
    {
      title: "Listing",
      icon: FormatListBulletedIcon,
      path: "/admin/listing",
    },
    {
      title: "Blogs",
      icon: ArticleIcon,
      path: "/admin/blog",
    },
    {
      title: "Footer",
      icon: FormatColorTextIcon,
      path: "/admin/footer",
    },
  ];
};

export default navigation;
