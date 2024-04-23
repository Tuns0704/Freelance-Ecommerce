// import { formatCurrency } from "./../../helper/formatCurrency";
import { Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import { getSaleProductByCategory } from "../../services/product";
import { useEffect, useState } from "react";
import Loading from "../../cores/components/loading";
import { useNavigate } from "react-router-dom";
import CardItem from "./cardItem";

const FashionDeal = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);

	const getSaleProduct = async (category) => {
		setLoading(true);
		try {
			const response = await getSaleProductByCategory(category);
			setProducts(response.data.data);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			console.error(error);
		}
	};

	useEffect(() => {
		getSaleProduct("Fashion");
	}, []);

	const navigate = useNavigate();

	const handleNavigateToProductsPage = () => {
		navigate("/products?category=Fashion&marketingPrice=true");
	};

	return (
		<section className="flex flex-col">
			<h2 className="font-bold text-3xl">Deal hot Thời trang</h2>
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
				{loading ? (
					<Loading />
				) : (
					products.map((product) => (
						<SwiperSlide key={product?.id} className="flex">
							<CardItem product={product} />
						</SwiperSlide>
					))
				)}
			</Swiper>
			<div className="self-center">
				<Button
					variant="outlined"
					size="md"
					className="font-medium text-sm font-opensans"
					onClick={handleNavigateToProductsPage}
				>
					Tất cả sản phẩm
				</Button>
			</div>
		</section>
	);
};

export default FashionDeal;
