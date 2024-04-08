import instance from "./axios.config";

export const getSettings = () =>
	instance.get(`${import.meta.env.VITE_API_URL}/setting`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const updateSettings = (formData) =>
	instance.put(`${import.meta.env.VITE_API_URL}/setting`, formData, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
		validateStatus: (status) => status < 400,
	});
