import {
	TabsHeader,
	Tab,
	Tabs,
	TabPanel,
	TabsBody,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { getSaleProductByCategory } from "../../services/product";
import Loading from "./../../cores/components/loading";
import CardItem from "./cardItem";

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
											<SwiperSlide key={product?.id} className="flex">
												<CardItem product={product} />
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
