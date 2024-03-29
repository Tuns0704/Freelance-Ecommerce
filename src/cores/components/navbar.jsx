import { useState, useEffect, createElement } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
	Collapse,
	Typography,
	Button,
	IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export function Navbar({ routes }) {
	const [openNav, setOpenNav] = useState(false);

	useEffect(() => {
		window.addEventListener(
			"resize",
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navigate = useNavigate();

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

	const navigateLogin = () => {
		navigate("/login");
	};

	// const navigateRegister = () => {
	// 	navigate("/register");
	// };

	return (
		<nav className="sticky rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 mb-10 mx-5 sm:mx-20 z-50 top-3 px-4 py-3">
			<div className="flex items-center justify-between text-white">
				<Link to="/">
					<Typography className="mr-4 ml-2 cursor-pointer py-1.5 font-bold font-opensans">
						Home
					</Typography>
				</Link>
				<div className="hidden lg:block">{navList}</div>
				<div className="hidden gap-2 lg:flex">
					<div className="flex items-center gap-2">
						<div className="flex gap-2">
							{/* <Button
								onClick={navigateRegister}
								variant="text"
								size="sm"
								color="white"
								className="font-opensans"
							>
								Đăng ký
							</Button> */}
							<Button
								onClick={navigateLogin}
								variant="text"
								size="sm"
								color="white"
								className="font-opensans"
							>
								Đăng nhập
							</Button>
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
						<Button size="sm" fullWidth>
							Log in
						</Button>
						<Button size="sm" fullWidth>
							Register
						</Button>
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
