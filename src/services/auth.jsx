import axios from "axios";

export const loginGoogle = () =>
	axios.get(`${import.meta.env.VITE_API_URL}/auth/google/login`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const loginFacebook = () =>
	axios.get(`${import.meta.env.VITE_API_URL}/auth/facebook/login`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
