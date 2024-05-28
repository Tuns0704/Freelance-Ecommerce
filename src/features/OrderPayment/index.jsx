import { useCallback, useEffect, useState } from "react";
import Loading from "../../cores/components/loading";
import { formatCurrency } from "../../helper/formatCurrency";
import { Tooltip, Button } from "@material-tailwind/react";
import {
	InformationCircleIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { getSettings } from "../../services/setting";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { orderDetail, updateOrder } from "../../services/order";

const OrderPayment = () => {
	const [images, setImages] = useState([]);
	const [order, setOrder] = useState({});
	const [settings, setSettings] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const params = new URL(window.location.href).pathname
		.split("/")
		.filter(Boolean);
	const orderId = params[params.length - 1];

	const getOrderData = useCallback(async () => {
		setLoading(true);
		const response = await orderDetail(orderId);
		if (response.status === 200) {
			setOrder(response.data);
			setLoading(false);
		}
	}, [orderId]);

	const settingsData = async () => {
		const response = await getSettings();
		setSettings(response.data);
	};

	const onFileChange = (files) => {
		setImages((f) => [...f, ...files]);
	};

	useEffect(() => {
		getOrderData();
		settingsData();
	}, [getOrderData]);

	const onPayment = async () => {
		const formData = new FormData();
		if (images.length !== 0) {
			images.forEach((img) => {
				formData.append(`paymentImg`, img);
			});
		}
		const response = await updateOrder(order.id, formData);
		if (response.status === 200) {
			toast.success(
				"Gửi ảnh thanh toán thành công! Tiến hành kiểm tra thông tin chuyển khoản <3"
			);
			navigate("/");
		} else {
			toast.error("Gửi ảnh thanh toán thất bạ");
		}
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className="flex flex-col items-center justify-center min-h-[60vh]">
						<div className="sm:w-2/6 flex flex-col items-center justify-center border-2 rounded-t-xl border-gray-200">
							<img src={settings.bankUrl} alt="" className="w-[400px]" />
							<h1 className="font-medium text-2xl">{settings.bankInfoName}</h1>
						</div>
						<div className="sm:w-2/6 p-2 border-x-2 border-b-2">
							<p className="italic text-sm mb-1">
								<b className="text-red-400">*</b> Tải lên hoạt động thanh toán
								tại đây
							</p>
							<input
								type="file"
								className="block w-full text-sm text-slate-500 file:mr-4 border-r border-y border-blue-gray-900 rounded-md file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-gray-900 file:text-white hover:file:opacity-80 hover:cursor-pointer"
								accept="image/*"
								onChange={(e) => onFileChange(e.target.files)}
							/>
						</div>
						<div className="sm:w-2/6 h-fit flex flex-col gap-2 ">
							<div className="flex flex-col gap-2 border-b-2 border-x-2 border-gray-200 p-3 rounded-b-xl">
								<h1 className="font-medium text-md">
									Số tiền cần cọc: {formatCurrency(order.depositAmount)}
								</h1>
								<div className="flex gap-2 items-center">
									<h1 className="font-medium text-md">
										Số tiền ship: {formatCurrency(order.shippingFee)}
									</h1>
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
								<h1 className="font-medium text-3xl border-t-2 pt-2 border-gray-200">
									Tổng tiền:{" "}
									<label className="text-red-900">
										{formatCurrency(order.totalPrice)}
									</label>
								</h1>
							</div>
							<Button
								onClick={onPayment}
								className="flex justify-center gap-2 items-center"
							>
								<ShoppingBagIcon className="w-6 h-6" /> Gửi ảnh thanh toán
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default OrderPayment;
