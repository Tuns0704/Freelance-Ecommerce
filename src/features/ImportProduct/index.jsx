import { useState } from "react";
import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import ImportLinkTab from "./importLinkTab";
import ImportShopTab from "./reportPriceTab";

const data = [
	{
		label: "Import theo link",
		value: "report-price-auto",
	},
	{
		label: "Import theo shop",
		value: "report-price",
	},
];

const ImportProducts = () => {
	const [activeTab, setActiveTab] = useState(data[0].value);

	const handleTabChange = (value) => {
		setActiveTab(value);
	};

	return (
		<div className="mt-5">
			<div className="flex justify-between items-center mb-5">
				<h2 className="text-2xl font-semibold ">Import sản phẩm</h2>
			</div>
			<div className="relative overflow-x-auto">
				<Tabs value={activeTab} className="sm:flex sm:gap-3">
					<TabsHeader
						className="flex sm:flex-col sm:w-56"
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
						<ImportLinkTab />
						<ImportShopTab />
					</TabsBody>
				</Tabs>
			</div>
		</div>
	);
};

export default ImportProducts;
