// import AuthContext from "../cores/context/app.context";
// import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "../container/app.container";
import Home from "../features/Home/index";
import routes from "../constant/routes";
import { Login } from "./../features/Login/index";
import { Register } from "./../features/Register/index";

export const AppRouter = () => {
	// const {
	// 	state: { isAuthenticated },
	// } = useContext(AuthContext);
	return (
		<Routes>
			<Route path="/" element={<AppContainer />}>
				<Route path="" element={<Home />} />
				{routes.map(
					({ path, element }, key) =>
						element && <Route key={key} exact path={path} element={element} />
				)}
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="*" element={<Navigate to="/home" replace />} />
			</Route>
		</Routes>
	);
};