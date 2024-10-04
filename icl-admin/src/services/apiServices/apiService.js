import { API_PATH } from "../../constants/path-constant";
import { fetch } from "../fetchService";

export const HOMEBANNER = (object) =>
  fetch("post", `${API_PATH}homeslider.php`, { ...object }, {});

export const BLOGSERVICE = () => fetch("get", `${API_PATH}blogs.php`, {}, {});

export const BLOGDETAILSERVICE = (id) =>
  fetch("post", `${API_PATH}blog-single.php`, { ...id }, {});

export const ABOUTSERVICE = (id) =>
  fetch("post", `${API_PATH}about.php`, { ...id }, {});

export const CATEGORYSERVICE = (object) =>
  fetch("post", `${API_PATH}category.php`, { ...object }, {});

// -------------------------------------------------------------------------------------------------------------------

export const USERSIGNUP = (data) =>
  fetch("post", `${API_PATH}sign-up.php`, { ...data }, {});

export const OTPVERIFIYSERVICE = (data) =>
  fetch("post", `${API_PATH}verify-email.php`, { ...data }, {});

export const USERLOGINSERVICE = (data) =>
  fetch("post", `${API_PATH}login.php`, { ...data }, {});

// -------------------------------------------------------------------------------------------------------------------

export const PRODUCTSERVICE = () =>
  fetch(
    "post",
    `${"https://onlinewebsitedemo.com/ikshitachoudhary/admin/api/"}product.php`,
    {},
    {}
  );

export const PRODUCTEDITSERVICE = (data) =>
  fetch("post", `${API_PATH}product-edit.php`, { ...data }, {});

export const USERSERVICE = (data) =>
  fetch("post", `${API_PATH}users.php`, { ...data }, {});

export const PRODUCTVARIANT = (data) =>
  fetch("post", `${API_PATH}product-varient.php`, { ...data }, {});

export const CONTACTSERVICE = (data) =>
  fetch("post", `${API_PATH}contact.php`, { ...data }, {});

export const ORDERSERVICE = (data) =>
  fetch("post", `${API_PATH}order.php`, { ...data }, {});

export const VISITSERVICE = (data) =>
  fetch("post", `${API_PATH}visits.php`, { ...data }, {});
