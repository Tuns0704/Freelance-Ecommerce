import FashionDeal from "./fashionDeal";
// import Instruct from "./instruct";
import ImageSlider from "../../cores/components/imageSlider";
import LaptopDeal from "./laptopDeal";
import TopSale from "./topSale";
import { useEffect, useState } from "react";
import { getSettings } from "../../services/setting";

const images = [
	{
		slideImg: "/img/pic2.png",
	},
	{
		slideImg: "/img/pic7.png",
	},
	{
		slideImg: "/img/pic8.png",
	},
	{
		slideImg: "/img/pic2.png",
	},
	{
		slideImg: "/img/pic7.png",
	},
	{
		slideImg: "/img/pic8.png",
	},
	{
		slideImg: "/img/pic2.png",
	},
	{
		slideImg: "/img/pic7.png",
	},
	{
		slideImg: "/img/pic8.png",
	},
];

const Home = () => {
	const [settings, setSettings] = useState({
		bannerTop:
			"https://res.cloudinary.com/dhburx7mh/image/upload/v1712567430/lptvjelsftrsiwiuytkw.png",
		slide: images,
		bannerBot:
			"https://res.cloudinary.com/dhburx7mh/image/upload/v1712567431/b8h5bdaxsj90ptlekltm.jpg",
	});

	useEffect(() => {
		const settingsData = async () => {
			const response = await getSettings();
			setSettings(response.data);
		};
		settingsData();
	}, []);

	return (
		<div className="h-fit flex flex-col gap-10">
			<img
				src={settings.bannerTop}
				alt=""
				className="w-full rounded-lg shadow-lg"
			/>
			{/* <Instruct /> */}
			<FashionDeal />
			<LaptopDeal />
			<TopSale />
			<img
				src={settings.bannerBot}
				alt=""
				className="w-full rounded-lg shadow-lg"
			/>
			<ImageSlider images={settings.slide} />
		</div>
	);
};

export default Home;
