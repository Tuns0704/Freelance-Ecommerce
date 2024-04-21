import instance from "./axios.config";

export const checkDiscountCode = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/order/discountCode`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getDiscounts = () =>
	instance.get(`${import.meta.env.VITE_API_URL}/discount`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getDiscount = (id) =>
	instance.get(`${import.meta.env.VITE_API_URL}/discount/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const addDiscount = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/discount`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const updateDiscount = (id, body) =>
	instance.put(`${import.meta.env.VITE_API_URL}/discount/${id}`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const deleteDiscount = (id) =>
	instance.delete(`${import.meta.env.VITE_API_URL}/discount/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
