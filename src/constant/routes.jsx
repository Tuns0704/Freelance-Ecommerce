import Home from "../features/Home";
import Products from "../features/Products";
import ReportPrice from "../features/ReportPrices";

export const routes = [
	{
		name: "Trang chủ",
		path: "/home",
		element: <Home />,
	},
	{
		name: "Sản phẩm",
		path: "/products",
		element: <Products />,
	},
	{
		name: "Báo giá",
		path: "/report-price",
		element: <ReportPrice />,
	},
	// {
	// 	name: "Sign In",
	// 	path: "/sign-in",
	// 	element: <SignIn />,
	// },
	// {
	// 	name: "Sign Up",
	// 	path: "/sign-up",
	// 	element: <SignUp />,
	// },
	// {
	// 	name: "Docs",
	// 	href: "https://www.material-tailwind.com/docs/react/installation",
	// 	target: "_blank",
	// 	element: "",
	// },
];

export default routes;
