/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, createElement, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
	Collapse,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
import {
	Bars3Icon,
	XMarkIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
	ShoppingCartIcon,
	ArrowLeftCircleIcon,
} from "@heroicons/react/24/outline";
import {
	MenuHandler,
	MenuList,
	MenuItem,
	Menu,
} from "@material-tailwind/react";
import {
	AppContext,
	SET_TOKEN,
	SET_AUTHENTICATED,
	SET_ROLE,
} from "@context/app.context";

export function Navbar({ routes }) {
	const navigate = useNavigate();
	const { state, dispatchAuth } = useContext(AppContext);
	const [openNav, setOpenNav] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [searchParams, setSearchParams] = useSearchParams([]);

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
		dispatchAuth({ type: SET_ROLE, payload: "user" });
	};

	const navigateLogin = () => {
		setOpenNav(false);
		navigate("/login");
	};

	const navigateRegister = () => {
		setOpenNav(false);
		navigate("/register");
	};

	const navigateProfile = () => {
		setOpenNav(false);
		navigate("/profile");
	};

	const navigateCart = () => {
		setOpenNav(false);
		navigate("/cart");
	};

	const param = new URLSearchParams(searchParams);

	useEffect(() => {
		if (searchString === "" && param.has("name")) {
			setSearchParams((prev) => {
				prev.delete("name");
				return prev;
			});
		}
	}, [searchString]);

	const handleSetSearchString = () => {
		if (searchString !== "") {
			setSearchParams((prev) => {
				prev.append("name", searchString);
				return prev;
			});
			navigate(`/products?${searchParams}`);
		}
		if (searchString !== "" && param.has("name")) {
			setSearchParams((prev) => {
				prev.set("name", searchString);
				return prev;
			});
			navigate(`/products?${searchParams}`);
		}
		if (searchString === "" && param.has("name")) {
			setSearchParams((prev) => {
				prev.delete("name");
				return prev;
			});
		}
	};

	const findProduct = () => {
		handleSetSearchString();
		setOpenNav(false);
	};

	const handleKeyDown = (e) => {
		if (e.keyCode === 13) {
			handleSetSearchString();
			setOpenNav(false);
		}
	};

	const handleChange = (e) => {
		setSearchString(e.target.value);
	};

	const navList = (
		<ul className="mb-4 mt-2 flex flex-col gap-2 text-inherit lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<div className=" md:w-[350px] xl:w-[500px]">
				<div className="relative flex items-center w-full h-12 rounded-lg md:shadow-none shadow-md focus-within:shadow-lg bg-white overflow-hidden">
					<IconButton
						onClick={() => findProduct()}
						className="grid bg-transparent shadow-none hover:shadow-none focus-within:shadow-none   place-items-center h-full w-12 text-gray-300"
					>
						<MagnifyingGlassIcon className="w-6 h-6 text-gray-900 hover:text-blue-900" />
					</IconButton>
					<input
						className="peer font-opensans h-full w-full outline-none text-sm md:text-gray-900 pr-2"
						type="text"
						value={searchString}
						onChange={(e) => handleChange(e)}
						placeholder="Nhập thông tin sản phẩm bạn muốn mua..."
						onKeyDown={(e) => handleKeyDown(e)}
					/>
				</div>
			</div>
			<div className="md:w-fit flex flex-col md:flex-row gap-3">
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
			</div>
		</ul>
	);

	return (
		<div className="sticky mt-3 top-0 mb-10 mx-5 sm:mx-20 z-50 bg-white">
			<nav
				className={` rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10   px-4 py-3`}
			>
				<div className="flex items-center justify-between text-white">
					<Link to="/">
						<img src="/logo.png" className="w-32 bg-white rounded-lg" alt="" />
					</Link>
					<div className="hidden self-center lg:block w-fit">{navList}</div>
					<div className="hidden gap-2 lg:flex">
						<div className="flex items-center gap-2">
							<div className="flex justify-end gap-2 w-52">
								{state.isAuthenticated ? (
									<Menu placement="bottom-end">
										<MenuHandler>
											<Button className="font-opensans">Tài khoản</Button>
										</MenuHandler>
										<MenuList>
											<MenuItem>
												<Button
													onClick={() => navigateCart()}
													variant="text"
													size="sm"
													className="font-opensans hover:bg-transparent flex justify-center items-center gap-2"
												>
													<ShoppingCartIcon className="w-6 h-6 text-blue-gray-900" />
													Giỏ hàng
												</Button>
											</MenuItem>
											<MenuItem>
												<Button
													onClick={() => navigateProfile()}
													variant="text"
													size="sm"
													className="font-opensans hover:bg-transparent flex justify-center items-center gap-2"
												>
													<UserCircleIcon className="w-6 h-6 text-blue-gray-900" />
													Trang cá nhân
												</Button>
											</MenuItem>
											<MenuItem>
												<Button
													onClick={() => handleLogout()}
													variant="text"
													size="sm"
													className="font-opensans hover:bg-transparent flex justify-center items-center gap-2"
												>
													<ArrowLeftCircleIcon className="w-6 h-6 text-blue-gray-900" />
													Đăng xuất
												</Button>
											</MenuItem>
										</MenuList>
									</Menu>
								) : (
									<div className="flex gap-2">
										<Button
											onClick={() => navigateRegister()}
											variant="text"
											size="sm"
											color="white"
											className="font-opensans"
										>
											Đăng ký
										</Button>
										<Button
											onClick={() => navigateLogin()}
											variant="text"
											size="sm"
											color="white"
											className="font-opensans"
										>
											Đăng nhập
										</Button>
									</div>
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
					className={`rounded-xl bg-white md:mt-0 mt-3 text-blue-gray-900`}
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
								<>
									<Button
										onClick={() => navigateRegister()}
										className="font-opensans"
										fullWidth
									>
										Đăng ký
									</Button>
									<Button
										onClick={() => navigateLogin()}
										className="font-opensans"
										fullWidth
									>
										Đăng nhập
									</Button>
								</>
							)}
						</div>
					</div>
				</Collapse>
			</nav>
		</div>
	);
}

Navbar.propTypes = {
	brandName: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object).isRequired,
	action: PropTypes.node,
};

export default Navbar;
