import { useCallback, useEffect, useState } from "react";
import { formatCurrency } from "../../helper/formatCurrency";
import { reportPrice } from "../../services/product";
import { toast } from "react-toastify";
import {
	Button,
	Typography,
	TabPanel,
	Tooltip,
} from "@material-tailwind/react";
import {
	MagnifyingGlassIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/outline";
import Loading from "../../cores/components/loading";
import { getSettings } from "./../../services/setting";

const LinkReportTab = () => {
	const [link, setLink] = useState("");
	const [item, setItem] = useState({ price: 0 });
	const [loading, setLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [shippingFee, setShippingFee] = useState(0);

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

	const getSettingValue = useCallback(async () => {
		const response = await getSettings();
		if (response.status === 200) {
			setShippingFee(response.data.weightBasedPrice * 10);
		}
	}, []);

	useEffect(() => {
		getSettingValue();
		setTotalPrice(shippingFee + item.price);
	}, [getSettingValue, item.price, shippingFee]);

	return (
		<TabPanel value="report-price-auto" className="px-0  min-h-[60vh]">
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
				item.price !== 0 && (
					<div className="flex flex-col lg:flex-row gap-3 mt-5">
						<div className="flex flex-col md:flex-row gap-2 lg:w-2/3 sm:p-3">
							<img
								src={item.thumbnailImages}
								alt={item.name}
								className="w-full md:w-1/4 lg:w-[200px] rounded-lg"
							/>
							<div className="flex flex-col justify-between">
								<div className="flex flex-col gap-2">
									<p className="font-semibold text-justify text-gray-900  text-2xl">
										{item.name}
									</p>
									<div className="flex gap-2">
										<div className="text-lg text-gray-900">
											Giá sản phẩm:{" "}
											<label className="text-red-900 font-semibold text-xl">
												{formatCurrency(item.price)}
											</label>
										</div>
										{item.DiscountPriceInfo && (
											<del className="text-sm font-semibold text-red-400">
												{item.DiscountPriceInfo.OriginalRetailPrice}$
											</del>
										)}
									</div>
								</div>
								<select className="text-ellipsis w-full mb-5 px-3 py-2 border border-gray-300">
									<option className="border px-2 py-3" value={item.condition}>
										{item.condition}
									</option>
								</select>
							</div>
						</div>
						<div className="lg:w-1/2 w-full p-3 border border-gray-400 rounded">
							<div className="flex flex-col gap-2">
								<p className="font-semibold text-3xl text-gray-900">Kết quả</p>
								<div className="flex justify-between">
									<p className="">Giá sản phẩm</p>
									<p>{formatCurrency(item.price)}</p>
								</div>
								<div className="flex justify-between">
									<div className="flex gap-2">
										<p className="">Phí vận chuyển và cân nặng</p>
										<Tooltip
											animate={{
												mount: { scale: 1, y: 0 },
												unmount: { scale: 0, y: 25 },
											}}
											content="Sau khi hàng về sẽ được cân lại và tính tiền chênh lệch cho khách hàng."
										>
											<InformationCircleIcon className="w-5 h-5 text-red-900" />
										</Tooltip>
									</div>
									<p>{formatCurrency(shippingFee)}</p>
								</div>
								<div className="flex justify-between border-t pt-2">
									<p className="">Tổng đơn</p>
									<p>{formatCurrency(totalPrice)}</p>
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
