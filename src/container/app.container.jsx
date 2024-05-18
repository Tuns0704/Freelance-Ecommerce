// import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../cores/components/navbar";
import routes from "../constant/routes";
import Footer from "../cores/components/footer";

const AppContainer = () => {
	return (
		<div className="bg-white bg-opacity-95">
			<Navbar routes={routes} />
			<div className="sm:mx-20 mx-5 font-opensans">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
};

export default AppContainer;
