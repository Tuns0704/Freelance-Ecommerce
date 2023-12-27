// import { Routes, Route, Navigate, useLocation } from "react-router-dom";
// import Navbar from "./cores/components/navbar";
// import routes from "./constant/routes";
import { ToastContainer } from "react-toastify";
import { AppRouter } from "./routes/app.router";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/grid";
import "swiper/css/scrollbar";

function App() {
	// const { pathname } = useLocation();

	return (
		<>
			<AppRouter />
			<ToastContainer
				position="top-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</>
	);
}

export default App;
