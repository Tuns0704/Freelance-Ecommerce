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
import { toast } from "react-toastify";
import { formatCurrency } from "../../helper/formatCurrency";
import { reportPrice } from "../../services/product";

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
	const [link, setLink] = useState("");
	const [item, setItem] = useState(null);

	const handleLinkChange = (e) => {
		setLink(e.target.value);
	};

	const onSubmitGetItemFromLink = async () => {
		const ebayItemRegex = /ebay\.com\/itm\/(\d+)/i;
		const itemIdMatch = link.match(ebayItemRegex);
		if (itemIdMatch !== null && itemIdMatch.length > 1) {
			const itemId = itemIdMatch[1];
			toast.success("Link hợp lệ " + itemId);
			const response = await reportPrice(itemId);
			console.log(response.data);
			setItem(response.data);
		} else {
			toast.error("Link không hợp lệ");
		}
	};

	const handleTabChange = (value) => {
		setActiveTab(value);
	};

	return (
		<section className="sm:h-[60vh]">
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
					<TabPanel value="report-price-auto" className="px-0">
						<div className="flex  justify-between gap-2">
							<input
								type="text"
								placeholder="Nhập link sản phẩm quý khách muốn mua (Ebay)"
								className=" px-3 w-4/5 py-2 rounded-md border-2 border-gray-900  focus:border-blue-600"
								value={link}
								onChange={handleLinkChange}
							/>
							<Button
								className="flex gap-2 items-center"
								onClick={onSubmitGetItemFromLink}
							>
								<MagnifyingGlassIcon className="w-6 h-6" /> Nhận báo giá tự động
							</Button>
						</div>
						{item && (
							<div className="flex flex-col md:flex-row gap-3 mt-5">
								<div className="flex gap-2 md:w-2/3 sm:p-3">
									<img
										src={item.GalleryURL}
										alt={item.Title}
										className="w-1/4 lg:w-[200px] rounded-lg"
									/>
									<div className="flex flex-col gap-2">
										<p className="font-semibold">{item.Title}</p>
										<select
											name=""
											id=""
											className="text-ellipsis w-full px-3 py-2 border border-gray-300"
										>
											<option
												className="border px-2 py-3"
												value={item.PrimaryCategoryID}
											>
												{item.PrimaryCategoryName}
											</option>
										</select>
									</div>
								</div>
								<div className="md:w-1/2 w-full p-3 border border-gray-400 rounded">
									<div className="flex flex-col gap-2">
										<p className="font-semibold text-3xl">Kết quả</p>
										<div className="flex justify-between">
											<p className="">Giá sản phẩm</p>
											<p>{formatCurrency(300000)}</p>
										</div>
										<div className="flex justify-between">
											<p className="">Phí vận chuyển và cân nặng</p>
											<p>{formatCurrency(200000)}</p>
										</div>
										<div className="flex justify-between border-t pt-2">
											<p className="">Giá sản phẩm</p>
											<p>{formatCurrency(300000)}</p>
										</div>
									</div>
								</div>
							</div>
						)}
					</TabPanel>
					<TabPanel value="report-price" className="px-0">
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
