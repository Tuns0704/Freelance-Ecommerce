import { createContext, useEffect, useReducer } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext({
	state: {
		user: {},
		role: "",
		token: "",
		isAuthenticated: false,
	},
	dispatchAuth: () => {},
});

const initialState = {
	user: {},
	role: "",
	token: "",
	isAuthenticated: false,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const LoginAction = (payload) => {
	return { type: LOGIN, payload };
};

export const LogoutAction = () => {
	return { type: LOGOUT };
};

const authReducer = (state, action) => {
	switch (action.type) {
		case LOGIN:
			localStorage.setItem("authInfo", JSON.stringify(action.payload));
			return { ...state, isAuthenticated: true, ...action.payload };
		case LOGOUT:
			localStorage.removeItem("authInfo");
			return initialState;
		default:
			return state;
	}
};

const AuthContext = ({ children }) => {
	const [state, dispatchAuth] = useReducer(authReducer, initialState);

	useEffect(() => {
		const authInfo = JSON.parse(localStorage.getItem("authInfo"));
		if (authInfo) {
			dispatchAuth(LoginAction(authInfo));
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
