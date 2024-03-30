// import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import adminRoutes from "../constant/adminRoutes";
import Footer from "../cores/components/footer";
import { IconButton } from "@material-tailwind/react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Sidenav } from "../cores/components/sidenav";
import { DashboardNavbar } from "./../cores/components/dashboard-navbar";
import {
	useMaterialTailwindController,
	setOpenConfigurator,
} from "../cores/context/admin.context";

const AdminContainer = () => {
	const [controller, dispatch] = useMaterialTailwindController();
	const { sidenavType } = controller;
	return (
		<div className="min-h-screen bg-blue-gray-50/50">
			<Sidenav
				routes={adminRoutes}
				brandImg={
					sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
				}
			/>
			<div className="p-4 xl:ml-80">
				<DashboardNavbar />
				<IconButton
					size="lg"
					color="white"
					className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
					ripple={false}
					onClick={() => setOpenConfigurator(dispatch, true)}
				>
					<Cog6ToothIcon className="h-5 w-5" />
				</IconButton>
				<Routes>
					{adminRoutes.map(
						({ layout, pages }) =>
							layout === "dashboard" &&
							pages.map(({ path, element }) => (
								<Route key={path} exact path={path} element={element} />
							))
					)}
				</Routes>
				<div className="text-blue-gray-600">
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default AdminContainer;
