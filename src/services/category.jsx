/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import instance from "./axios.config";

export const getListCategory = () =>
	axios.get(`${import.meta.env.VITE_API_URL}/categories`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const addCategory = (body) =>
	instance.post(`${import.meta.env.VITE_API_URL}/categories`, body, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});

export const deleteCategory = (id) =>
	instance.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
		headers: {
			"Content-Type": "application/json",
		},
		validateStatus: (status) => status < 400,
	});
