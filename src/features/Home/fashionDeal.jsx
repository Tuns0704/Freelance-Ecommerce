// import { formatCurrency } from "./../../helper/formatCurrency";
import { Button } from "@material-tailwind/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import { getSaleProductByCategory } from "../../services/product";
import { useEffect, useState } from "react";
import Loading from "../../cores/components/loading";
import { formatPercentage } from "../../helper/formatPercentage";
import { formatCurrency } from "../../helper/formatCurrency";
import { useNavigate } from "react-router-dom";
import AddToCartButton from "./../../cores/components/addToCart";

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

	const handleNavigateToDetail = (id) => {
		navigate(`/product-detail/${id}`);
	};

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
						<SwiperSlide
							key={product?.id}
							className="flex relative flex-col gap-2 bg-white shadow p-5 rounded-lg hover:cursor-pointer"
						>
							<label className="absolute px-2 rounded top-[-5px] z-40 left-[-5px] bg-red-900 text-white font-bold py-1">
								Giảm{" "}
								{formatPercentage(product.marketingPrice.discountPercentage)}%
							</label>
							<img
								src={product?.thumbnailImages?.[0]?.imageUrl}
								onClick={() => handleNavigateToDetail(product.id)}
								alt="products"
								className="w-full object-cover h-48 scale-100 hover:scale-105 transition-all duration-500 ease-in-out rounded-lg"
							/>
							<h4
								onClick={() => handleNavigateToDetail(product.id)}
								className="pt-5 font-semibold text-sm text-gray-800"
							>
								{product?.name}
							</h4>
							<section className="flex justify-start items-center gap-2">
								<h2 className="text-2xl font-bold">
									{formatCurrency(product.price[0].value)}
								</h2>
								<del className="text-gray-500 text-sm">
									{formatCurrency(product.marketingPrice.originalPrice.value)}
								</del>
							</section>
							<i className="font-medium text-sm">
								Giá tốt nhất{" "}
								<b>
									{formatCurrency(product.marketingPrice.originalPrice.value)}
								</b>
							</i>
							<AddToCartButton
								productId={product.id}
								productPrice={product.price[0].value}
							/>
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
