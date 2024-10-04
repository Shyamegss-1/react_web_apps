import HomeOutline from "mdi-material-ui/HomeOutline";
import BagChecked from "mdi-material-ui/BagChecked";
import StairsUp from "mdi-material-ui/StairsUp";
import Domain from "mdi-material-ui/Domain";
import CategoryIcon from "@mui/icons-material/Category";

const navigation = () => {
  return [
    {
      title: "Dashboard",
      icon: HomeOutline,
      path: "/admin/",
    },
    {
      title: "Department",
      icon: Domain,
      path: "/admin/department",
    },
    {
      title: "Categories",
      icon: CategoryIcon,
      path: "/admin/category",
    },
    {
      title: "Jobs",
      icon: BagChecked,
      path: "/admin/jobs",
    },
    {
      title: "Applicants",
      icon: StairsUp,
      path: "/admin/carrer",
    },
  ];
};

export default navigation;
