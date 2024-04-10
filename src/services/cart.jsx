import instance from "./axios.config";

export const addToCart = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/cart`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const deleteFromCart = (productId) =>
	instance.delete(`${import.meta.env.VITE_API_URL}/cart/delete/${productId}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const updateCart = (body) =>
	instance.patch(`${import.meta.env.VITE_API_URL}/cart/update`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
