import { Suspense, lazy, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AppContext } from "@context/app.context";

import routes from "@constant/routes";
import adminRoutes from "@constant/adminRoutes";
import Loading from "@components/loading";

const AppContainer = lazy(() => import("../container/app.container"));
const AdminContainer = lazy(() => import("../container/admin.container"));

const Home = lazy(() => import("@features/Home/index"));
const Login = lazy(() => import("@features/Login/index"));
const Register = lazy(() => import("@features/Register/index"));
const ProductDetail = lazy(() => import("@features/ProductDetail"));
const AboutUs = lazy(() => import("@features/AboutUs"));
const ContactUs = lazy(() => import("@features/ContactUs"));
const InstallmentPolicy = lazy(() => import("@features/InstallmentPolicy"));
const WarrantyPolicy = lazy(() => import("@features/WarrantyPolicy"));
const PurchasePolicy = lazy(() => import("@features/PurchasePolicy"));
const Profile = lazy(() => import("@features/Profile"));
const Cart = lazy(() => import("@features/Cart"));
const Order = lazy(() => import("@features/Order"));
const OrderPayment = lazy(() => import("@features/OrderPayment"));
const ResetPassword = lazy(() => import("@features/ResetPassword"));

export const AppRouter = () => {
	const { state } = useContext(AppContext);

	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				{state.role === "admin" ? (
					<>
						<Route path="/dashboard" element={<AdminContainer />}>
							<Route path="/dashboard/home" element={<Home />} />
							{adminRoutes.map(
								({ layout, pages }) =>
									layout === "dashboard" &&
									pages.map(({ path, element }, key) => (
										<Route
											key={key}
											path={`/dashboard/${path}`}
											element={element}
										/>
									))
							)}
						</Route>
						<Route
							path="*"
							element={<Navigate to="/dashboard/home" replace />}
						/>
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
							<Route
								path="/installment-policy"
								element={<InstallmentPolicy />}
							/>
							<Route path="/warranty-policy" element={<WarrantyPolicy />} />
							<Route path="/purchase-policy" element={<PurchasePolicy />} />
							<Route path="/reset-password" element={<ResetPassword />} />
							<Route path="*" element={<Navigate to="/" replace />} />
							{state.isAuthenticated && (
								<>
									<Route path="/profile" element={<Profile />} />
									<Route path="/cart" element={<Cart />} />
									<Route path="/orderPayment/:id" element={<OrderPayment />} />\
									<Route path="/order" element={<Order />} />
								</>
							)}
						</Route>
					</>
				)}
			</Routes>
		</Suspense>
	);
};
