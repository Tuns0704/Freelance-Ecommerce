import {
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
	Typography,
	Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const data = [
	{
		label: "Nhận báo giá tự động",
		value: "report-price-auto",
	},
	{
		label: "Nhận báo giá",
		value: "report-price",
	},
];

const ReportPrice = () => {
	const [activeTab, setActiveTab] = useState(data[0].value);

	const handleTabChange = (value) => {
		setActiveTab(value);
	};

	return (
		<section className="h-[60vh] md:flex md:flex-col">
			<Tabs
				value={activeTab}
				orientation="horizontal"
				className="md:orientation-vertical"
			>
				<TabsHeader
					className="w-60"
					indicatorProps={{
						className: "bg-gray-900 shadow-none rounded-md ",
					}}
				>
					{data.map(({ label, value }) => (
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
					<TabPanel value="report-price-auto">
						<div className="flex justify-between gap-2">
							<input
								type="text"
								placeholder="Nhập link sản phẩm quý khách muốn mua (Ebay)"
								className="px-3 py-2 border-2 border-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
							/>
							<Button className="flex gap-2 items-center">
								<MagnifyingGlassIcon className="w-6 h-6" /> Nhận báo giá tự động
							</Button>
						</div>
					</TabPanel>
					<TabPanel value="report-price">
						<div className="flex flex-col items-center justify-center">
							<div className="text-center">
								<Typography variant="h2" className="font-bold mb-4">
									Nhận báo giá
								</Typography>
								<Typography
									variant="paragraph"
									color="blue-gray"
									className="text-lg font-normal"
								>
									Nhận báo giá
								</Typography>
							</div>
						</div>
					</TabPanel>
				</TabsBody>
			</Tabs>
		</section>
	);
};

export default ReportPrice;
