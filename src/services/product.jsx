import axios from "axios";

export const reportPrice = (productId) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay/searchById/${productId}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getListProduct = (page) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay?page=${page}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
