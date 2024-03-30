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
			color={fixedNavbar ? "white" : "transparent"}
			className={`rounded-xl transition-all ${
				fixedNavbar
					? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
					: "px-0 py-1"
			}`}
			fullWidth
			blurred={fixedNavbar}
		>
			<div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center mb-2">
				<h1 className="text-blue-gray-900 font-bold text-3xl">OrderUS</h1>
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
