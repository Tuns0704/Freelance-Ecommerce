import {
	TabsHeader,
	Tab,
	Tabs,
	TabPanel,
	TabsBody,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "../../helper/formatCurrency";
import { SwiperSlide, Swiper } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { getSaleProductByCategory } from "../../services/product";
import Loading from "./../../cores/components/loading";
import { formatPercentage } from "./../../helper/formatPercentage";
import AddToCartButton from "./../../cores/components/addToCart";

const tabs = [
	{
		label: "Đồng hồ",
		value: "Watch",
	},
	{
		label: "Điện thoại",
		value: "Phone",
	},
];

const TopSale = () => {
	const defaultTabValue = "Phone";
	const [activeTab, setActiveTab] = useState(defaultTabValue);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleTabChange = (value) => {
		setActiveTab(value);
	};

	const getData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await getSaleProductByCategory(activeTab);
			if (response.status === 200) {
				setProducts(response.data.data);
				setLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	}, [activeTab]);

	useEffect(() => {
		getData();
	}, [getData]);

	const navigate = useNavigate();

	const handleNavigateToDetail = (id) => {
		navigate(`/product-detail/${id}`);
	};

	const handleNavigateToProductsPage = () => {
		navigate(`/products?category=${activeTab}&marketingPrice=true`);
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
						{tabs.map(({ value }) => (
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
													{formatPercentage(
														product.marketingPrice.discountPercentage
													)}
													%
												</label>
												<img
													src={product?.thumbnailImages?.[0]?.imageUrl}
													onClick={() => handleNavigateToDetail(product.id)}
													alt="products"
													className="w-3/4 object-contain self-center h-40 scale-100 hover:scale-110 transition-all duration-500 ease-in-out rounded-lg"
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
														{formatCurrency(
															product.marketingPrice.originalPrice.value
														)}
													</del>
												</section>
												<i className="font-medium text-sm">
													Giá tốt nhất{" "}
													<b>{formatCurrency(product.price[0].value)}</b>
												</i>
												<AddToCartButton
													productId={product.id}
													productPrice={product.price[0].value}
												/>
											</SwiperSlide>
										))
									)}
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
					onClick={() => handleNavigateToProductsPage()}
				>
					Tất cả sản phẩm
				</Button>
			</div>
		</section>
	);
};

export default TopSale;
