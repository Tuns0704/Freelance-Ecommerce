// import AuthContext from "../cores/context/app.context";
// import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "../container/app.container";
import Home from "../features/Home/index";
import routes from "../constant/routes";
import Login from "./../features/Login/index";
import Register from "./../features/Register/index";
import ProductDetail from "../features/ProductDetail";
import AboutUs from "../features/AboutUs";
import ContactUs from "../features/ContactUs";
import InstallmentPolicy from "../features/InstallmentPolicy";
import WarrantyPolicy from "../features/WarrantyPolicy";
import PurchasePolicy from "../features/PurchasePolicy";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./../cores/context/app.context";
import Profile from "../features/Profile";
import { decodeToken } from "../helper/decodeToken";
import AdminContainer from "../container/admin.container";
import Cart from "../features/Cart";
import Order from "../features/Order";
import OrderPayment from "../features/OrderPayment";

export const AppRouter = () => {
	const [userRole, setUserRole] = useState("");
	const { state } = useContext(AppContext);
	const urlParams = new URLSearchParams(window.location.search);
	const tokenURL = urlParams.get("token");
	const [token, setToken] = useState(tokenURL ? tokenURL : "");

	const localStorageToken = localStorage.getItem("token");

	useEffect(() => {
		if (localStorageToken) {
			setToken(localStorageToken);
		}
		if (token !== "") {
			setUserRole(decodeToken(token).role);
		}
	}, [localStorageToken, token]);

	return (
		<Routes>
			{userRole === "admin" ? (
				<>
					<Route path="/dashboard/*" element={<AdminContainer />} />
					<Route path="*" element={<Navigate to="/dashboard/home" replace />} />
				</>
			) : (
				<>
					<Route path="/" element={<AppContainer />}>
						<Route path="" element={<Home />} />
						{routes.map(
							({ path, element }, key) =>
								element && (
									<Route key={key} exact path={path} element={element} />
								)
						)}
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/product-detail/:id" element={<ProductDetail />} />
						<Route path="/about-us" element={<AboutUs />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="/installment-policy" element={<InstallmentPolicy />} />
						<Route path="/warranty-policy" element={<WarrantyPolicy />} />
						<Route path="/purchase-policy" element={<PurchasePolicy />} />
						<Route path="/orderPayment/:id" element={<OrderPayment />} />
						<Route path="/order" element={<Order />} />
						<Route path="*" element={<Navigate to="/home" replace />} />
						{state.isAuthenticated && (
							<>
								<Route path="/profile" element={<Profile />} />
								<Route path="/cart" element={<Cart />} />
							</>
						)}
					</Route>
				</>
			)}
		</Routes>
	);
};
