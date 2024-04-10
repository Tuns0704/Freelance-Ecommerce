import instance from "./axios.config";

export const order = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/order`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const orderDetail = (id) =>
	instance.get(`${import.meta.env.VITE_API_URL}/order/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const updateOrder = (id, formData) =>
	instance.put(
		`${import.meta.env.VITE_API_URL}/order/payment/${id}`,
		formData,
		{
			headers: {
				"Content-Type": "multipart/form-data",
			},
			validateStatus: (status) => status < 400,
		}
	);

export const adminUpdateOrder = (id, body) =>
	instance.put(`${import.meta.env.VITE_API_URL}/order/${id}`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getListOrder = () =>
	instance.get(`${import.meta.env.VITE_API_URL}/order`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
