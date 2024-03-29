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
				<Route path="/products" element={<Products />} />
				<Route path="/report-price" element={<Products />} />
				<Route path="/product-detail/:id" element={<ProductDetail />} />
				<Route path="/about-us" element={<AboutUs />} />
				<Route path="/contact-us" element={<ContactUs />} />
				<Route path="/installment-policy" element={<InstallmentPolicy />} />
				<Route path="/warranty-policy" element={<WarrantyPolicy />} />
				<Route path="/purchase-policy" element={<PurchasePolicy />} />
				<Route path="*" element={<Navigate to="/home" replace />} />
			</Route>
		</Routes>
	);
};
