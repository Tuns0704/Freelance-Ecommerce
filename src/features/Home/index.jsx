import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSettings } from "@services/setting";
import { getListCategory } from "@services/category";

import ImageSlider from "@components/imageSlider";
import Loading from "@components/loading";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Deals from "./deal";

const Home = () => {
	const [settings, setSettings] = useState({});
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const settingsData = async () => {
			setLoading(true);
			const response = await getSettings();
			if (response.status === 200) {
				setSettings(response.data);
				setLoading(false);
			}
		};
		settingsData();
	}, []);

	useEffect(() => {
		const getCategories = async () => {
			try {
				setLoading(true);
				const response = await getListCategory();
				setCategories(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getCategories();
	}, []);

	const navigate = useNavigate();

	const handleNavigateToProductsPage = (value) => {
		navigate(`/products?category=${value}`);
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="h-fit flex flex-col gap-10">
					<div className="flex flex-col md:flex-row w-full gap-5">
						<div className="md:w-1/4 flex flex-col flex-grow">
							{categories.map((item, index) => (
								<div
									onClick={() => handleNavigateToProductsPage(item.englishName)}
									className={`p-3 flex justify-between items-center hover:cursor-pointer border-gray-900 ${
										index !== categories.length - 1
											? index === 0
												? "rounded-t-lg border-x-2 border-t-2"
												: "border-x-2 border-t-2"
											: "border-2 rounded-b-lg"
									}`}
									key={index}
								>
									<p className="font-semibold text-lg">{item.vietnameseName}</p>
									<ChevronRightIcon className="w-6 h-6 text-blue-gray-900" />
								</div>
							))}
						</div>
						<img
							src={settings.bannerTop}
							alt=""
							className="md:w-3/4 rounded-lg shadow-lg"
						/>
					</div>
					{categories.map((item, index) => (
						<Deals key={index} deal={item} />
					))}
					<img
						src={settings.bannerBot}
						alt=""
						className="w-full rounded-lg shadow-lg"
					/>
					<ImageSlider images={settings.slide} />
				</div>
			)}
		</>
	);
};

export default Home;
