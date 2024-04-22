import { Navbar, IconButton, Button } from "@material-tailwind/react";
import { Bars3Icon, ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import {
	useMaterialTailwindController,
	setOpenSidenav,
} from "../context/admin.context";
import { AppContext } from "./../context/app.context";
import { SET_TOKEN, SET_AUTHENTICATED } from "./../context/app.context";
import { useContext } from "react";

export function DashboardNavbar() {
	const [controller, dispatch] = useMaterialTailwindController();
	const { dispatchAuth } = useContext(AppContext);

	const { fixedNavbar, openSidenav } = controller;

	const handleLogout = () => {
		const urlWithoutToken = window.location.href.split("?")[0];
		window.history.replaceState({}, document.title, urlWithoutToken);

		localStorage.removeItem("token");
		dispatchAuth({ type: SET_TOKEN, payload: null });
		dispatchAuth({ type: SET_AUTHENTICATED, payload: false });

		window.location.reload();
	};

	return (
		<Navbar
			color={"transparent"}
			className={`rounded-xl p-0 transition-all sticky top-4 z-40 shadow-md"
			}`}
			fullWidth
			blurred={fixedNavbar}
		>
			<div className="flex bg-white p-5 border rounded-xl border-blue-gray-100 justify-between gap-6 md:flex-row md:items-center mb-2">
				<h1 className="text-blue-gray-900 font-bold text-3xl">OrderUS.vn</h1>
				<div className="flex gap-2 justify-end">
					<IconButton
						className="grid xl:hidden"
						onClick={() => setOpenSidenav(dispatch, !openSidenav)}
					>
						<Bars3Icon className="h-6 w-6" />
					</IconButton>
					<IconButton className="grid xl:hidden" onClick={() => handleLogout()}>
						<ArrowLeftCircleIcon className="h-6 w-6" />
					</IconButton>
					<Button
						onClick={() => handleLogout()}
						className="hidden xl:flex items-center gap-2"
					>
						<p>Đăng xuất</p>
					</Button>
				</div>
			</div>
		</Navbar>
	);
}

export default DashboardNavbar;
