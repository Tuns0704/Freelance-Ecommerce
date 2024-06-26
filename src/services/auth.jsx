import axios from "axios";

export const login = (body) =>
	axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const register = (body) =>
	axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const forgotPassword = (body) =>
	axios.post(`${import.meta.env.VITE_API_URL}/auth/forgot-password`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const resetPassword = (body) =>
	axios.post(`${import.meta.env.VITE_API_URL}/auth/reset-password`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
