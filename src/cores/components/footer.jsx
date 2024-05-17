import PropTypes from "prop-types";
import { Typography, IconButton } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
	return (
		<footer className="relative pt-8 pb-6">
			<div className="flex mx-5 sm:mx-20 gap-10 flex-wrap lg:justify-between justify-center pt-6 text-center lg:text-left">
				<div className=" flex flex-col items-center justify-center">
					<Typography variant="h4" className="mb-4" color="blue-gray">
						{title}
					</Typography>
					<Typography className="font-normal text-blue-gray-500">
						{description}
					</Typography>
					<div className="mx-auto mt-6 mb-8 flex justify-start sm:justify-center gap-2 md:mb-0 lg:justify-start">
						{socials.map(({ color, name, path }) => (
							<a
								key={name}
								href={path}
								target="_blank"
								rel="noopener noreferrer"
							>
								<IconButton
									color="white"
									className="rounded-full shadow-none bg-transparent"
								>
									<Typography color={color}>
										<i className={`fa-brands fa-${name}`} />
									</Typography>
								</IconButton>
							</a>
						))}
					</div>
				</div>
				<div className="flex flex-wrap justify-around gap-5 xs:gap-10 sm:gap-24">
					{menus.map(({ name, items }) => (
						<div key={name}>
							<Typography
								variant="small"
								color="blue-gray"
								className="mb-2 block font-medium uppercase"
							>
								{name}
							</Typography>
							<ul className="mt-3">
								{items.map((item) => (
									<li key={item.name}>
										<Typography
											as="a"
											href={item.path}
											target="_blank"
											rel="noreferrer"
											variant="small"
											className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
										>
											{item.name}
										</Typography>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
			<hr className="my-6 border-gray-300" />
			<div className="flex flex-wrap items-center justify-center md:justify-between">
				<div className="mx-auto w-full px-4 text-center">
					<Typography
						variant="small"
						className="font-normal text-blue-gray-500"
					>
						{copyright}
					</Typography>
				</div>
			</div>
		</footer>
	);
}

Footer.defaultProps = {
	title: "Orderus.vn",
	description: "Mua sản phẩm tại ebay",
	socials: [
		{
			color: "gray",
			name: "twitter",
			path: "https://www.twitter.com/creativetim",
		},
		{
			color: "gray",
			name: "youtube",
			path: "https://www.youtube.com/channel/UCVyTG4sCw-rOvB9oHkzZD1w",
		},
		{
			color: "gray",
			name: "instagram",
			path: "https://www.instagram.com/creativetimofficial/",
		},
		{
			color: "black",
			name: "github",
			path: "https://github.com/creativetimofficial/material-tailwind",
		},
	],
	menus: [
		{
			name: "Thông tin",
			items: [
				{
					name: "Về chúng tôi",
					path: "/about-us",
				},
				{
					name: "Truy vết hàng hoá",
					path: "/contact-us",
				},
				{
					name: "Liên hệ chúng tôi",
					path: "/contact-us",
				},
			],
		},
		{
			name: "Dịch vụ",
			items: [
				{
					name: "Chính sách mua hàng",
					path: "/purchase-policy",
				},
				{
					name: "Chính sách bảo hành",
					path: "/warranty-policy",
				},
				{
					name: "Chính sách trả góp",
					path: "/installment-policy",
				},
				{
					name: "Hướng dẫn sử dụng",
					path: "https://github.com/creativetimofficial/material-tailwind/blob/main/CHANGELOG.md?ref=mtk",
				},
			],
		},
	],
	copyright: (
		<>
			Copyright © {year} by{" "}
			<a
				href="https://www.creative-tim.com?ref=mtk"
				target="_blank"
				rel="noreferrer"
				className="text-blue-gray-500 transition-colors hover:text-blue-500"
			>
				Orderus.vn
			</a>
			.
		</>
	),
};

Footer.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	socials: PropTypes.arrayOf(PropTypes.object),
	menus: PropTypes.arrayOf(PropTypes.object),
	copyright: PropTypes.node,
};

export default Footer;
