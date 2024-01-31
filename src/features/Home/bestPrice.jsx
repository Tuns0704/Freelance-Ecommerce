import { formatCurrency } from "./../../helper/formatCurrency";
import { Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

const products = [
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
	{
		id: 9,
		name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
		price: 5000000,
		originPrice: 47000000,
		img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
	},
	{
		id: 10,
		name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
		price: 5000000,
		originPrice: 47000000,
		img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
	},
	{
		id: 11,
		name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
		price: 5000000,
		originPrice: 47000000,
		img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
	},
	{
		id: 12,
		name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
		price: 5000000,
		originPrice: 47000000,
		img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
	},
	{
		id: 13,
		name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
		price: 5000000,
		originPrice: 47000000,
		img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
	},
];

const BestPrice = () => {
	return (
		<section className="flex flex-col">
			<h2 className="font-bold text-3xl">Giá sốc hôm nay</h2>
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
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 3,
						grid: {
							rows: 2,
						},
						spaceBetween: 20,
					},
					1024: {
						slidesPerView: 3,
						grid: {
							rows: 2,
						},
						spaceBetween: 20,
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
				{products.map((product) => (
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
							className="w-2/4 self-center h-40 scale-90 hover:scale-100 transition-all duration-500 ease-in-out rounded-lg"
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

export default BestPrice;
