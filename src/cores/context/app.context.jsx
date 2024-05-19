import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";
import { decodeToken } from "../../helper/decodeToken";

export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const SET_ROLE = "SET_ROLE";

export const AppContext = createContext({
	state: {
		token: null,
		isAuthenticated: false,
		role: "user",
	},
	dispatchAuth: () => {},
});

const token = localStorage.getItem("token");

const initialState = {
	token: token,
	isAuthenticated: token !== null ? true : false,
	role: token !== null ? decodeToken(token).role : "user",
};

const authReducer = (state, action) => {
	switch (action.type) {
		case SET_TOKEN:
			return {
				...state,
				token: action.payload,
			};
		case SET_AUTHENTICATED:
			return {
				...state,
				isAuthenticated: action.payload,
			};
		case SET_ROLE:
			return {
				...state,
				role: action.payload,
			};
		default:
			return state;
	}
};

const AuthContext = ({ children }) => {
	const [state, dispatchAuth] = useReducer(authReducer, initialState);

	useEffect(() => {
		const currentUrl = window.location.href;
		const targetUrl = "https://www.orderus.vn/?token=";
		if (currentUrl.startsWith(targetUrl)) {
			const queryParameters = new URLSearchParams(window.location.search);
			const tokenFromUrl = queryParameters.get("token");
			if (tokenFromUrl) {
				localStorage.setItem("token", tokenFromUrl);
				dispatchAuth({ type: SET_TOKEN, payload: tokenFromUrl });
				dispatchAuth({ type: SET_AUTHENTICATED, payload: true });
				dispatchAuth({ type: SET_ROLE, payload: decodeToken(token).role });
			}
		}
		const tokenFromLocalStorage = localStorage.getItem("token");
		if (tokenFromLocalStorage) {
			dispatchAuth({ type: SET_TOKEN, payload: tokenFromLocalStorage });
			dispatchAuth({ type: SET_AUTHENTICATED, payload: true });
			dispatchAuth({ type: SET_ROLE, payload: decodeToken(token).role });
		}
	}, []);

	return (
		<AppContext.Provider value={{ state, dispatchAuth }}>
			{children}
		</AppContext.Provider>
	);
};

export default AuthContext;

AuthContext.propTypes = {
	children: PropTypes.node.isRequired,
};
