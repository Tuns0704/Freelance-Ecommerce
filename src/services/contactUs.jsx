import axios from "axios";

export const sendContactUs = (body) =>
	axios.post(`${import.meta.env.VITE_API_URL}/contactus`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
