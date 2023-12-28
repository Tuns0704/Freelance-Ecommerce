import BestPrice from "./bestPrice";
import Instruct from "./instruct";
import ImageSlider from "./imageSlider";
import TopSale from "./topSale";
import { useEffect, useState } from "react";

const Home = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const delay = setTimeout(() => {
			setLoading(false);
		}, 2000);

		return () => clearTimeout(delay);
	}, []);

	return (
		<div className="h-fit flex flex-col gap-10">
			<img
				src="/img/minigame.png"
				alt=""
				className="w-full rounded-lg shadow-lg"
			/>
			<Instruct />
			<BestPrice />
			<TopSale />
			<img src="/img/affi.png" alt="" className="w-full rounded-lg shadow-lg" />
			<ImageSlider />
		</div>
	);
};

export default Home;
