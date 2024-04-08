import FashionDeal from "./fashionDeal";
// import Instruct from "./instruct";
import ImageSlider from "../../cores/components/imageSlider";
import LaptopDeal from "./laptopDeal";
import TopSale from "./topSale";

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
	return (
		<div className="h-fit flex flex-col gap-10">
			<img
				src="/img/minigame.png"
				alt=""
				className="w-full rounded-lg shadow-lg"
			/>
			{/* <Instruct /> */}
			<FashionDeal />
			<LaptopDeal />
			<TopSale />
			<img src="/img/affi.png" alt="" className="w-full rounded-lg shadow-lg" />
			<ImageSlider images={images} />
		</div>
	);
};

export default Home;
