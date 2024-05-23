import { Tabs, TabsHeader, TabsBody, Tab } from "@material-tailwind/react";
import { useState } from "react";
import LinkReportTab from "./linkReportPriceTab";
import ReportPriceTab from "./reportPriceTab";

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
		<section className="">
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
					<LinkReportTab />
					<ReportPriceTab />
				</TabsBody>
			</Tabs>
		</section>
	);
};

export default ReportPrice;
