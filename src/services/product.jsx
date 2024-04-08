import axios from "axios";
import instance from "./axios.config";

export const reportPrice = (productId) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay/searchById/${productId}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const getProduct = (productId) =>
	axios.get(`${import.meta.env.VITE_API_URL}/ebay/item/${productId}`, {
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
