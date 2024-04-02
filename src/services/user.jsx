import instance from "./axios.config";

export const getListUser = () =>
	instance.get(`${import.meta.env.VITE_API_URL}/auth`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
