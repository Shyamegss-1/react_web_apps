import { API_PATH } from "../../constants/path-constant";
import { fetch } from "../fetchService";

export const productRandService = () =>
  fetch("get", API_PATH + `product`, {}, {});

export const userService = () => fetch("get", API_PATH + `admin/users`, {}, {});

export const orderService = () =>
  fetch("get", API_PATH + `admin/order`, {}, {});

export const paymentService = () =>
  fetch("get", API_PATH + `admin/payment`, {}, {});

export const contactService = () =>
  fetch("get", API_PATH + `admin/contact`, {}, {});

export const userDetailService = (key) =>
  fetch("post", API_PATH + `user`, { ...{ id: key } }, {});

export const userBillingAddress = (key) =>
  fetch("get", API_PATH + `user/billaddress?id=${key}`, {}, {});

export const userShippingAddress = (key) =>
  fetch("get", API_PATH + `user/shipaddress?id=${key}`, {}, {});

// ==============================================================================
export const contentBannerService = () =>
  fetch("get", API_PATH + `cms/get-bdata`, {}, {});

export const contentSolidService = () =>
  fetch("get", API_PATH + `cms/get-solid`, {}, {});

export const contentSolidUpdateService = (object) =>
  fetch("post", API_PATH + `cms/get-solid`, { ...object }, {});

export const PostImage = (object) =>
  fetch("post", API_PATH + `cms/post-img`, { ...object }, {});

export const BannerUpdateService = (object) =>
  fetch("post", API_PATH + `cms/get-bdata`, { ...object }, {});

export const PostInsertHandler = (object) =>
  fetch("put", API_PATH + `cms/post-cchce`, { ...object }, {});

export const PostUpdateHandler = (object) =>
  fetch("post", API_PATH + `cms/post-cchce`, { ...object }, {});

export const PostDatatHandler = () =>
  fetch("get", API_PATH + `cms/post-cchce`, {}, {});

// ===========================================================================================================

export const CouponDataHandler = () =>
  fetch("get", API_PATH + `cms/get-cpn`, {}, {});

export const CouponAddHandler = (object) =>
  fetch("put", API_PATH + `cms/get-cpn`, { ...object }, {});

export const CouponUpdateHandler = (object) =>
  fetch("post", API_PATH + `cms/get-cpn`, { ...object }, {});

export const CouponDeleteHandler = (id) =>
  fetch("delete", API_PATH + `cms/get-cpn?d=${id}`, {}, {});

export const OrderByIDService = (id) =>
  fetch("get", API_PATH + `admin/orderbyid?u=${id}`, {}, {});
