import FashionDeal from "./fashionDeal";
// import Instruct from "./instruct";
import ImageSlider from "./imageSlider";
import LaptopDeal from "./laptopDeal";
import TopSale from "./topSale";

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
			<ImageSlider />
		</div>
	);
};

export default Home;
