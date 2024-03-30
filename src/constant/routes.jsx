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
];

export default routes;
