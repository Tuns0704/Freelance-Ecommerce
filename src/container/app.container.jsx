// import { useContext } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../cores/components/navbar";
// import AuthContext from "../cores/context/app.context";
import routes from "../constant/routes";
import Footer from "../cores/components/footer";

const AppContainer = () => {
	const { pathname } = useLocation();
	return (
		<>
			<Navbar routes={routes} />
			<div className="sm:mx-20 mx-5 font-opensans">
				<Outlet />
			</div>
			{pathname !== "/login" && pathname !== "/register" && <Footer />}
		</>
	);
};

export default AppContainer;
