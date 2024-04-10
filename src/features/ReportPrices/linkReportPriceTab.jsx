import { useState } from "react";
import { formatCurrency } from "../../helper/formatCurrency";
import { reportPrice } from "../../services/product";
import { toast } from "react-toastify";
import { Button, Typography, TabPanel } from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Loading from "../../cores/components/loading";

const LinkReportTab = () => {
	const [link, setLink] = useState("");
	const [item, setItem] = useState(null);
	const [loading, setLoading] = useState(false);

	const handleLinkChange = (e) => {
		setLink(e.target.value);
	};

	const onSubmitGetItemFromLink = async () => {
		const ebayItemRegex = /ebay\.com\/itm\/(\d+)/i;
		const itemIdMatch = link.match(ebayItemRegex);
		if (itemIdMatch !== null && itemIdMatch.length > 0) {
			try {
				setLoading(true);
				const response = await reportPrice(itemIdMatch[1]);
				setItem(response.data);
				setLoading(false);
			} catch (error) {
				setLoading(false);
				toast.error("Lỗi không xác định");
			}
		} else {
			toast.error("Link không hợp lệ");
		}
	};
	return (
		<TabPanel value="report-price-auto" className="px-0">
			<div className="text-center">
				<Typography variant="h2" className="font-bold text-gray-900 mb-4">
					Nhận báo giá tự động
				</Typography>
			</div>
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
			{loading ? (
				<Loading />
			) : (
				item && (
					<div className="flex flex-col md:flex-row gap-3 mt-5">
						<div className="flex gap-2 md:w-2/3 sm:p-3">
							<img
								src={item.thumbnailImages[0]}
								alt={item.name}
								className="w-1/4 lg:w-[200px] rounded-lg"
							/>
							<div className="flex flex-col gap-2">
								<p className="font-semibold text-gray-900">{item.name}</p>
								<div className="flex gap-2">
									<div className="text-lg text-gray-900">
										Giá sản phẩm: {formatCurrency(item.price)}
									</div>
									{item.DiscountPriceInfo && (
										<del className="text-sm font-semibold text-red-400">
											{item.DiscountPriceInfo.OriginalRetailPrice}$
										</del>
									)}
								</div>
								<select
									name=""
									id=""
									className="text-ellipsis w-full px-3 py-2 border border-gray-300"
								>
									<option className="border px-2 py-3" value={item.condition}>
										{item.condition}
									</option>
								</select>
								<div></div>
							</div>
						</div>
						<div className="md:w-1/2 w-full p-3 border border-gray-400 rounded">
							<div className="flex flex-col gap-2">
								<p className="font-semibold text-3xl text-gray-900">Kết quả</p>
								<div className="flex justify-between">
									<p className="">Giá sản phẩm</p>
									<p>{formatCurrency(item.price)}</p>
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
				)
			)}
		</TabPanel>
	);
};

export default LinkReportTab;
