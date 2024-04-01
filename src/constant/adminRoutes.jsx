import { HomeIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import Home from "./../features/Home/index";
import Profile from "./../features/Profile/index";
import CategoryManage from "../features/CategoryManage";

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
				name: "Trang cá nhân",
				path: "/profile",
				element: <Profile />,
			},
			{
				icon: <UserCircleIcon {...icon} />,
				name: "Quản lý danh mục",
				path: "/category-manage",
				element: <CategoryManage />,
			},
		],
	},
];

export default adminRoutes;
