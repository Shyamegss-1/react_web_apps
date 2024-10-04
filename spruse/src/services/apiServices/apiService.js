import { fetch } from "../fetchService";

const PRODUCTION_PATH = "https://premium-pro-cleaner.vercel.app";
const DEVELOPEMENT_PATH = "http://localhost:4000";

export const giftCardService = body => {
	return fetch("post", PRODUCTION_PATH + "/api/v1/gift", { ...body }, {});
};

export const GetgiftCardService = () => {
	return fetch("get", PRODUCTION_PATH + "/api/v1/getGift", {}, {});
};

export const createPaymentChuck = body => {
	return fetch(
		"post",
		PRODUCTION_PATH + "/api/v1/payment/ini-creckc",
		{ ...body },
		{}
	);
};

export const GetPaymenTData = () => {
	return fetch("get", PRODUCTION_PATH + "/api/v1/payment/ini-creckc", {}, {});
};

export const giftCardRedeemeService = code => {
	return fetch(
		"get",
		PRODUCTION_PATH + `/api/v1/gift?discountcode=${code}`,
		{},
		{}
	);
};

export const bookingService = options => {
	return fetch("post", PRODUCTION_PATH + `/api/v1/booking`, { ...options }, {});
};

export const GetBookingService = () => {
	return fetch("get", PRODUCTION_PATH + `/api/v1/booking`, {}, {});
};

export const GeCouponService = () => {
	return fetch("get", PRODUCTION_PATH + `/api/v1/ssd-d`, {}, {});
};

// ----------------------------------------------------------------------------------

export const getBookingDates = () => {
	return fetch("get", PRODUCTION_PATH + `/api/v1/appo_v7`, {}, {});
};

export const setUserData = object => {
	return fetch("post", PRODUCTION_PATH + `/api/v1/user_v7`, { ...object }, {});
};

export const getUserData = object => {
	return fetch("get", PRODUCTION_PATH + `/api/v1/user_v7`, { ...object }, {});
};
export const setBookingCell = object => {
	return fetch("post", PRODUCTION_PATH + `/api/v1/appo_v7`, { ...object }, {});
};

export const bookingDeleteService = id => {
	return fetch("delete", PRODUCTION_PATH + `/api/v1/booking?i=${id}`, {}, {});
};

export const giftCardDeleteService = id => {
	return fetch("delete", PRODUCTION_PATH + `/api/v1/gift?i=${id}`, {}, {});
};

export const PaymentDeleteService = id => {
	return fetch(
		"delete",
		PRODUCTION_PATH + `/api/v1/payment/ini-creckc?i=${id}`,
		{},
		{}
	);
};

export const couponDeleteService = id => {
	return fetch("delete", PRODUCTION_PATH + `/api/v1/ssd-d?i=${id}`, {}, {});
};
