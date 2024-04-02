// import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import adminRoutes from "../constant/adminRoutes";
import { Sidenav } from "../cores/components/sidenav";
import { DashboardNavbar } from "./../cores/components/dashboard-navbar";
import { useMaterialTailwindController } from "../cores/context/admin.context";

const AdminContainer = () => {
	const [controller] = useMaterialTailwindController();
	const { sidenavType } = controller;
	return (
		<div className="min-h-screen bg-blue-gray-50/50">
			<Sidenav
				routes={adminRoutes}
				brandImg={
					sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
				}
				brandName={"OrderUS"}
			/>
			<div className="p-4 xl:ml-80">
				<DashboardNavbar />
				<Routes>
					{adminRoutes.map(
						({ layout, pages }) =>
							layout === "dashboard" &&
							pages.map(({ path, element }) => (
								<Route key={path} exact path={path} element={element} />
							))
					)}
				</Routes>
			</div>
		</div>
	);
};

export default AdminContainer;
