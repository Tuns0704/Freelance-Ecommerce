import { Button, Tabs, TabsHeader, Tab } from "@material-tailwind/react";
import BestPrice from "./bestPrice";
import Instruct from "./instruct";
import ImageSlider from "./imageSlider";

const tabs = [
	{
		label: "BUY REFURBISHED",
		value: "html",
	},
	{
		label: "BEST BUY",
		value: "react",
	},
	{
		label: "NEW TECHIES",
		value: "vue",
	},
];

const Home = () => {
	return (
		<div className="h-fit flex flex-col gap-10">
			<img
				src="/src/assets/minigame.png"
				alt=""
				className="w-full rounded-lg shadow-lg"
			/>
			<Instruct />
			<BestPrice />
			<section className="flex flex-col">
				<div className="flex justify-between">
					<h2 className="font-bold text-3xl">Top Đối Tác</h2>
					<Tabs className="w-2/6">
						<TabsHeader>
							{tabs.map(({ label, value }) => (
								<Tab key={value} value={value}>
									{label}
								</Tab>
							))}
						</TabsHeader>
					</Tabs>
				</div>
				<div className="self-center">
					<Button
						variant="outlined"
						size="md"
						ripple="light"
						className="font-medium text-sm font-opensans"
					>
						Tất cả sản phẩm
					</Button>
				</div>
			</section>
			<img
				src="/src/assets/affi.jpg"
				alt=""
				className="w-full rounded-lg shadow-lg"
			/>
			<ImageSlider />
		</div>
	);
};

export default Home;
