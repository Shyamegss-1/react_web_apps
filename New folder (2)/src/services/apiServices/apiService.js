import { fetch } from "../fetchService";

const PRODUCTION_PATH = "https://consuela-iota.vercel.app/";
const DEVELOPEMENT_PATH = "http://localhost:4100";

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
