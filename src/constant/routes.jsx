import Products from "@features/Products";
import ReportPrice from "@features/ReportPrices";
import ContactUs from "@features/ContactUs/index";

export const routes = [
	{
		name: "Báo giá nhanh",
		path: "/report-price",
		element: <ReportPrice />,
	},
	{
		name: "Sản phẩm",
		path: "/products",
		element: <Products />,
	},
	{
		name: "Liên hệ",
		path: "/contact-us",
		element: <ContactUs />,
	},
];

export default routes;
