// import AuthContext from "../cores/context/app.context";
// import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppContainer from "../container/app.container";
import Home from "../features/Home/index";
import routes from "../constant/routes";
import Login from "./../features/Login/index";
import Register from "./../features/Register/index";
import ProductDetail from "../features/ProductDetail";
import Products from "../features/Products";
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
import ReportPrice from "../features/ReportPrices";

export const AppRouter = () => {
	const [userRole, setUserRole] = useState("");
	const { state } = useContext(AppContext);
	console.log(userRole);

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			setUserRole(decodeToken(token).role);
		}
	}, [userRole]);

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
						<Route path="/products" element={<Products />} />
						<Route path="/report-price" element={<ReportPrice />} />
						<Route path="/product-detail/:id" element={<ProductDetail />} />
						<Route path="/about-us" element={<AboutUs />} />
						<Route path="/contact-us" element={<ContactUs />} />
						<Route path="/installment-policy" element={<InstallmentPolicy />} />
						<Route path="/warranty-policy" element={<WarrantyPolicy />} />
						<Route path="/purchase-policy" element={<PurchasePolicy />} />
						<Route path="*" element={<Navigate to="/home" replace />} />
						{state.isAuthenticated && (
							<Route path="/profile" element={<Profile />} />
						)}
					</Route>
				</>
			)}
		</Routes>
	);
};
