interface navItem {
  title: string;
  icon: string;
  path: string;
}

const navigation: navItem[] = [
  { title: "Dashboard", path: "/dashboard", icon: "/icon/icon-home.svg" },
  { title: "Review users", path: "/review-users", icon: "/icon/icon-user.svg" },
  {
    title: "Business users",
    path: "/business-users",
    icon: "/icon/icon-user.svg",
  },
  { title: "Blog", path: "/blog", icon: "/icon/icon-blog.svg" },
  {
    title: "Business Listing",
    path: "/listing",
    icon: "/icon/icon-listing.svg",
  },
];

export default navigation;
