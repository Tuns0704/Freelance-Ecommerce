import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
	useMaterialTailwindController,
	setOpenSidenav,
} from "../context/admin.context";

export function Sidenav({ brandName, routes }) {
	const [controller, dispatch] = useMaterialTailwindController();
	const { openSidenav } = controller;

	return (
		<aside
			className={`${
				openSidenav ? "translate-x-0" : "-translate-x-80"
			} bg-gradient-to-b from-gray-900 to-gray-900 fixed inset-0 z-50 h-screen w-72  xl:translate-x-0`}
		>
			<div className={`relative`}>
				<Link to="/" className="py-6 text-white px-8 text-center">
					<Typography variant="h6">{brandName}</Typography>
				</Link>
				<IconButton
					variant="text"
					color="white"
					size="sm"
					ripple={false}
					className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
					onClick={() => setOpenSidenav(dispatch, false)}
				>
					<XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
				</IconButton>
			</div>
			<div className="m-4">
				{routes.map(({ layout, title, pages }, key) => (
					<ul key={key} className="mb-4 flex flex-col gap-1">
						{title && (
							<li className="mx-3.5 mt-4 mb-2">
								<Typography
									variant="small"
									className="font-black uppercase opacity-75"
								>
									{title}
								</Typography>
							</li>
						)}
						{pages.map(({ icon, name, path }) => (
							<li key={name}>
								<NavLink to={`/${layout}${path}`}>
									{({ isActive }) => (
										<Button
											variant={isActive ? "gradient" : "text"}
											color={isActive ? "white" : "white"}
											className="flex items-center gap-4 px-4 capitalize"
											fullWidth
										>
											{icon}
											<Typography
												color="inherit"
												className="font-medium capitalize"
											>
												{name}
											</Typography>
										</Button>
									)}
								</NavLink>
							</li>
						))}
					</ul>
				))}
			</div>
		</aside>
	);
}

Sidenav.propTypes = {
	brandName: PropTypes.string,
	routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
