import {
	HomeIcon,
	UserCircleIcon,
	RectangleStackIcon,
	ClipboardDocumentListIcon,
	Cog6ToothIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/solid";

import Home from "./../features/Home/index";
import CategoryManage from "../features/CategoryManage";
import Products from "./../features/Products/index";
import UserManage from "../features/UserManage";

const icon = {
	className: "w-5 h-5 text-inherit",
};

export const adminRoutes = [
	{
		layout: "dashboard",
		pages: [
			{
				icon: <HomeIcon {...icon} />,
				name: "Trang chủ",
				path: "/home",
				element: <Home />,
			},
			{
				icon: <UserCircleIcon {...icon} />,
				name: "Quản lý khách hàng",
				path: "/user-manage",
				element: <UserManage />,
			},
			{
				icon: <ShoppingBagIcon {...icon} />,
				name: "Quản lý đơn đặt hàng",
				path: "/order-manage",
				element: <UserManage />,
			},
			{
				icon: <RectangleStackIcon {...icon} />,
				name: "Quản lý danh mục",
				path: "/category-manage",
				element: <CategoryManage />,
			},
			{
				icon: <ClipboardDocumentListIcon {...icon} />,
				name: "Quản lý sản phẩm",
				path: "/product-manage",
				element: <Products />,
			},
			{
				icon: <Cog6ToothIcon {...icon} />,
				name: "Cài đặt",
				path: "/admin-settings",
				element: <Products />,
			},
		],
	},
];

export default adminRoutes;
