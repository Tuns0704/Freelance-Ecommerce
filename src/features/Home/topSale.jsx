import {
	TabsHeader,
	Tab,
	Tabs,
	TabPanel,
	TabsBody,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { formatCurrency } from "../../helper/formatCurrency";
import { SwiperSlide, Swiper } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

const tabs = [
	{
		label: "Buy Refurbished",
		value: "Buy Refurbished",
		data: [
			{
				id: 1,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
			{
				id: 2,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
			{
				id: 3,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
			{
				id: 4,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
			{
				id: 5,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
			{
				id: 6,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
			{
				id: 7,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
			{
				id: 8,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/aK8AAOSw11hlKYIR/s-l400.jpg",
			},
		],
	},
	{
		label: "Best Buy",
		value: "react",
		data: [
			{
				id: 1,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
			{
				id: 2,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
			{
				id: 3,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
			{
				id: 4,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
			{
				id: 5,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
			{
				id: 6,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
			{
				id: 7,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
			{
				id: 8,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
			},
		],
	},
	{
		label: "New Techies",
		value: "vue",
		data: [
			{
				id: 1,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
			{
				id: 2,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
			{
				id: 3,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
			{
				id: 4,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
			{
				id: 5,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
			{
				id: 6,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
			{
				id: 7,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
			{
				id: 8,
				name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
				price: 5000000,
				originPrice: 47000000,
				img: "https://i.ebayimg.com/images/g/PZEAAOSwFP1jKDvK/s-l500.jpg",
			},
		],
	},
];

const TopSale = () => {
	const defaultTabValue = "Buy Refurbished";
	const [activeTab, setActiveTab] = useState(defaultTabValue);

	const handleTabChange = (value) => {
		setActiveTab(value);
	};

	return (
		<section className="flex flex-col">
			<div className="flex relative flex-col justify-between">
				<h2 className="font-bold text-3xl mb-10 sm:mb-0">Top Đối Tác</h2>
				<Tabs value={activeTab} onChange={handleTabChange} className="w-full">
					<TabsHeader
						className="absolute flex sm:gap-2 w-full sm:w-3/6 right-0 top-10 sm:top-0"
						indicatorProps={{
							className: "bg-gray-900 shadow-none rounded-md ",
						}}
					>
						{tabs.map(({ label, value }) => (
							<Tab
								className={`px-3 py-3 transition-all duration-300 ease-in-out rounded-md`}
								key={value}
								value={value}
								onClick={() => handleTabChange(value)}
							>
								<p
									className={`font-semibold transition-all duration-500 ease-linear ${
										activeTab === value ? "text-white" : ""
									}`}
								>
									{label}
								</p>
							</Tab>
						))}
					</TabsHeader>
					<TabsBody>
						{tabs.map(({ value, data }) => (
							<TabPanel className="p-0 py-4" key={value} value={value}>
								<Swiper
									className="w-full h-fit py-5 px-3"
									slidesPerView={1}
									spaceBetween={20}
									grid={{
										rows: 2,
										fill: "row",
									}}
									pagination={{
										clickable: true,
									}}
									modules={[Grid, Pagination]}
									breakpoints={{
										320: {
											slidesPerView: 1,
											grid: {
												rows: 1,
											},
											spaceBetween: 20,
										},
										640: {
											slidesPerView: 2,
											grid: {
												rows: 1,
											},
											spaceBetween: 10,
										},
										768: {
											slidesPerView: 3,
											grid: {
												rows: 2,
											},
											spaceBetween: 10,
										},
										1024: {
											slidesPerView: 3,
											grid: {
												rows: 2,
											},
											spaceBetween: 10,
										},
										1280: {
											slidesPerView: 4,
											grid: {
												rows: 2,
											},
											spaceBetween: 20,
										},
									}}
								>
									{data.map((product) => (
										<SwiperSlide
											key={product?.id}
											className="flex relative flex-col gap-2 bg-white shadow p-5 rounded-lg hover:cursor-pointer"
										>
											<label className="absolute top-0 z-40 left-0 bg-red-900 text-white font-bold px-5 py-1">
												Giảm 30%
											</label>
											<img
												src={product?.img}
												alt="products"
												className="w-2/4 self-center h-40 sm:h-28 md:h-40 scale-90 hover:scale-105 transition-all duration-500 ease-in-out rounded-lg"
											/>
											<h4 className="font-medium text-sm text-gray-800">
												{product?.name}
											</h4>
											<section className="flex justify-start items-center gap-2">
												<h2 className="text-2xl font-bold">
													{formatCurrency(product.price)}
												</h2>
												<del className="text-gray-500 text-sm">
													{formatCurrency(product.originPrice)}
												</del>
											</section>
											<i className="font-medium text-sm">
												Giá tốt nhất <b>{formatCurrency(product.price)}</b>
											</i>
											<Button
												variant="filled"
												size="lg"
												className="font-medium text-sm font-opensans"
											>
												Mua ngay
											</Button>
										</SwiperSlide>
									))}
								</Swiper>
							</TabPanel>
						))}
					</TabsBody>
				</Tabs>
			</div>

			<div className="self-center">
				<Button
					variant="outlined"
					size="md"
					className="font-medium text-sm font-opensans"
				>
					Tất cả sản phẩm
				</Button>
			</div>
		</section>
	);
};

export default TopSale;
