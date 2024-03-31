import instance from "./axios.config";

export const addToCart = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/cart`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
