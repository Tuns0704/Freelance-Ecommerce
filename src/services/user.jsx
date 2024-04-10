import instance from "./axios.config";

export const getListUser = () =>
	instance.get(`${import.meta.env.VITE_API_URL}/auth`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getUserProfile = () =>
	instance.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getUserCart = (userId) =>
	instance.get(`${import.meta.env.VITE_API_URL}/cart/items/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getUserOrder = (userId) =>
	instance.get(`${import.meta.env.VITE_API_URL}/order/user/${userId}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
