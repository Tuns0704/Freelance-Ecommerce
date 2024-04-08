import instance from "./axios.config";

export const order = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/order`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
