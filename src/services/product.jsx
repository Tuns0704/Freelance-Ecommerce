import axios from "axios";
import instance from "./axios.config";

export const reportPrice = (productId) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay/searchItem/${productId}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getProduct = (productId) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay/searchById/${productId}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const addProductByLink = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/ebay/searchById`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const addProductByStoreName = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/ebay/search`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const deleteProductById = (id) =>
	instance.delete(`${import.meta.env.VITE_API_URL}/ebay/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getListProduct = (searchParams) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay?${searchParams}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const updateProduct = (id, body) =>
	instance.put(`${import.meta.env.VITE_API_URL}/ebay/${id}`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getSaleProductByCategory = (category) =>
	axios.get(
		`${
			import.meta.env.VITE_API_URL
		}/ebay?category=${category}&marketingPrice=true`,
		{
			headers: {
				"Content-Type": "application/json",
			},
			validateStatus: (status) => status < 400,
		}
	);
