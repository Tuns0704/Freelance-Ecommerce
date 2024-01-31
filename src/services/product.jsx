import axios from "axios";

export const reportPrice = (url) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay/searchByUrl?url=${url}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
