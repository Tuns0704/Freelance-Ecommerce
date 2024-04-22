import { useState, useEffect, createElement, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
	Collapse,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
import {
	Bars3Icon,
	XMarkIcon,
	UserCircleIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { AppContext } from "./../context/app.context";
import { SET_TOKEN, SET_AUTHENTICATED } from "./../context/app.context";

export function Navbar({ routes }) {
	const navigate = useNavigate();
	const { state, dispatchAuth } = useContext(AppContext);
	const [openNav, setOpenNav] = useState(false);

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const handleLogout = () => {
		const urlWithoutToken = window.location.href.split("?")[0];
		window.history.replaceState({}, document.title, urlWithoutToken);

		localStorage.removeItem("token");
		dispatchAuth({ type: SET_TOKEN, payload: null });
		dispatchAuth({ type: SET_AUTHENTICATED, payload: false });
	};

	const navigateLogin = () => {
		navigate("/login");
	};

	const navigateProfile = () => {
		navigate("/profile");
	};

	const navigateCart = () => {
		navigate("/cart");
	};

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			{routes.map((route) => (
				<Typography
					key={route.name}
					as="li"
					variant="small"
					color="inherit"
					className="capitalize font-opensans"
				>
					{route.href ? (
						<a
							href={route.href}
							target={route.target}
							className="flex items-center gap-1 p-1 font-bold"
						>
							{route.icon &&
								createElement(route.icon, {
									className: "w-[18px] h-[18px] opacity-75 mr-1",
								})}
							{route.name}
						</a>
					) : (
						<Link
							to={route.path}
							target={route.target}
							className="flex items-center gap-1 p-1 font-bold"
						>
							{route.icon &&
								createElement(route.icon, {
									className: "w-[18px] h-[18px] opacity-75 mr-1",
								})}
							{route.name}
						</Link>
					)}
				</Typography>
			))}
		</ul>
	);

	return (
		<nav className="sticky rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 mb-10 mx-5 sm:mx-20 z-50 top-3 px-4 py-3">
			<div className="flex items-center justify-between text-white">
				<Link to="/">
					<Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold font-opensans">
						Orderus.vn
					</Typography>
				</Link>
				<div className="hidden lg:block">{navList}</div>
				<div className="hidden gap-2 lg:flex">
					<div className="flex items-center gap-2">
						<div className="flex gap-2">
							{state.isAuthenticated ? (
								<>
									<Button
										onClick={() => navigateCart()}
										variant="text"
										size="sm"
										color="white"
										className="font-opensans"
									>
										<ShoppingCartIcon className="w-6 h-6" />
									</Button>
									<Button
										onClick={() => navigateProfile()}
										variant="text"
										size="sm"
										color="white"
										className="font-opensans"
									>
										<UserCircleIcon className="w-6 h-6" />
									</Button>
									<Button
										onClick={() => handleLogout()}
										variant="text"
										size="sm"
										color="white"
										className="font-opensans"
									>
										Đăng xuất
									</Button>
								</>
							) : (
								<Button
									onClick={() => navigateLogin()}
									variant="text"
									size="sm"
									color="white"
									className="font-opensans"
								>
									Đăng nhập
								</Button>
							)}
						</div>
					</div>
				</div>
				<IconButton
					variant="text"
					size="sm"
					color="white"
					className="ml-auto text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<XMarkIcon strokeWidth={2} className="h-6 w-6" />
					) : (
						<Bars3Icon strokeWidth={2} className="h-6 w-6" />
					)}
				</IconButton>
			</div>
			<Collapse
				className={`rounded-xl bg-white text-blue-gray-900`}
				open={openNav}
			>
				<div className="container p-4 mx-auto">
					{navList}
					<div className="flex flex-col gap-2">
						{state.isAuthenticated ? (
							<>
								<Button
									onClick={() => navigateCart()}
									size="sm"
									className="font-opensans"
									fullWidth
								>
									Giỏ hàng
								</Button>
								<Button
									onClick={() => navigateProfile()}
									size="sm"
									className="font-opensans"
									fullWidth
								>
									Hồ sơ
								</Button>
								<Button
									onClick={() => handleLogout()}
									size="sm"
									className="font-opensans"
									fullWidth
								>
									Đăng xuất
								</Button>
							</>
						) : (
							<Button
								onClick={() => navigateLogin()}
								variant="text"
								size="sm"
								className="font-opensans"
								fullWidth
							>
								Đăng nhập
							</Button>
						)}
					</div>
				</div>
			</Collapse>
		</nav>
	);
}

Navbar.propTypes = {
	brandName: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object).isRequired,
	action: PropTypes.node,
};

export default Navbar;
