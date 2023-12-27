import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import AuthContext from "./cores/context/app.context.jsx";
import { AppRouter } from "./routes/app.router.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<BrowserRouter>
			<ThemeProvider>
				<AuthContext>
					<AppRouter />
					<App />
				</AuthContext>
			</ThemeProvider>
		</BrowserRouter>
	</React.StrictMode>
);
