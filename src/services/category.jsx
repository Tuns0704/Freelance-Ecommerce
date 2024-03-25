import axios from "axios";

export const getListCategory = () =>
	axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
