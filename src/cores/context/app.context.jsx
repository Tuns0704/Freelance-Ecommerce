import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

export const SET_TOKEN = "SET_TOKEN";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";

export const AppContext = createContext({
	state: {
		token: null,
		isAuthenticated: false,
	},
	dispatchAuth: () => {},
});

const initialState = {
	token: null,
	isAuthenticated: false,
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
		default:
			return state;
	}
};

const AuthContext = ({ children }) => {
	const [state, dispatchAuth] = useReducer(authReducer, initialState);

	useEffect(() => {
		const queryParameters = new URLSearchParams(window.location.search);
		const tokenFromUrl = queryParameters.get("token");
		if (tokenFromUrl) {
			localStorage.setItem("token", tokenFromUrl);
			dispatchAuth({ type: SET_TOKEN, payload: tokenFromUrl });
			dispatchAuth({ type: SET_AUTHENTICATED, payload: true });
		}
		const tokenFromLocalStorage = localStorage.getItem("token");
		if (tokenFromLocalStorage) {
			dispatchAuth({ type: SET_TOKEN, payload: tokenFromLocalStorage });
			dispatchAuth({ type: SET_AUTHENTICATED, payload: true });
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
