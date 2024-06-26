import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import {
	XMarkIcon,
	InformationCircleIcon,
	ShoppingBagIcon,
	CreditCardIcon,
	ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";

import { getSettings } from "@services/setting";
import { updateOrder } from "@services/order";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { formatCurrency } from "@helper/formatCurrency";
import { formatDateTime } from "@helper/formatDateTime";
import { paymentStatus } from "@helper/paymentStatus";
import { deliveryStatus } from "@helper/deliveryStatus";

const ModalInfo = ({ isOpen, closeModal, order, reload }) => {
	const [images, setImages] = useState([]);
	const [settings, setSettings] = useState({});
	const [detailView, setDetailView] = useState(true);

	const settingsData = async () => {
		const response = await getSettings();
		setSettings(response.data);
	};

	const onFileChange = (files) => {
		setImages((f) => [...f, ...files]);
	};

	useEffect(() => {
		settingsData();
	}, []);

	const handleToggleDetailView = () => {
		setDetailView((prev) => !prev);
	};

	const onPayment = async () => {
		const formData = new FormData();
		if (images.length !== 0) {
			images.forEach((img) => {
				formData.append(`paymentImg`, img);
			});
		}
		const response = await updateOrder(order.id, formData);
		if (response.status === 200) {
			toast.success("Gửi ảnh thanh toán thành công!");
			reload();
		} else {
			toast.error("Gửi ảnh thanh toán thất bạ");
		}
	};
	return (
		<Transition appear show={isOpen}>
			<Dialog as="div" className="relative z-50" onClose={closeModal}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-[900px] transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div>Lịch sử đơn</div>
									<IconButton onClick={closeModal}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								{detailView ? (
									<div className="flex flex-col gap-5 mt-2">
										<div>
											<div className="font-semibold text-lg">
												Thông tin đơn hàng:
											</div>
											<div className="flex flex-col gap-2 border-2 border-blue-gray-900 rounded-xl p-3">
												<div className="flex gap-2 items-center">
													<p className="font-semibold">Mã đơn:</p>
													<p>ORDER{order.id}</p>
												</div>
												<div className="flex gap-2">
													<p className="font-semibold">Tạo đơn vào:</p>
													<p>{formatDateTime(order?.createdAt)} </p>
												</div>
												<div className="flex gap-2">
													<p className="font-semibold">Địa chỉ nhận:</p>
													<p>{order?.address}</p>
												</div>
												<div className="flex gap-2">
													<p className="font-semibold">
														Tình trạng thanh toán:
													</p>
													<p>{paymentStatus(order?.paymentStatus)} </p>
												</div>
												<div className="flex gap-2">
													<p className="font-semibold">
														Tình trạng vận chuyển:
													</p>
													<p>{deliveryStatus(order?.deliveryStatus)} </p>
												</div>
												<div className="flex gap-2 items-end">
													<p className="font-semibold">
														Tổng giá trị đơn hàng:
													</p>
													<p className="font-medium text-red-400 text-2xl">
														{formatCurrency(order?.totalPrice)}
													</p>
												</div>
												<div className="flex gap-2 items-end">
													<p className="font-semibold">Phí vận chuyển:</p>
													<p className="font-medium text-red-400 text-2xl">
														{formatCurrency(order?.shippingFee)}
													</p>
												</div>
											</div>
										</div>
										<div>
											<div className="font-semibold text-lg">
												Danh sách sản phẩm:
											</div>
											<div className="border-2 border-blue-gray-900 rounded-xl p-3">
												<table className="w-full">
													<thead>
														<tr>
															<th className="w-3/6 p-2 border-r border-blue-gray-900">
																Tên sản phẩm
															</th>
															<th className="text-center p-2 border-r border-blue-gray-900">
																Số lượng
															</th>
															<th className="text-center p-2 border-r border-blue-gray-900">
																Phí bảo hành
															</th>
															<th className="text-center p-2 border-blue-gray-900">
																Giá
															</th>
														</tr>
													</thead>
													<tbody>
														{order.orderItems.map((item) => (
															<tr key={item.id}>
																<td className="p-2 border-r border-blue-gray-900">
																	<p>{item.product.name}</p>
																</td>
																<td className="text-center border-r border-blue-gray-900">
																	{item.quantity}
																</td>
																<td className="text-center border-r border-blue-gray-900">
																	{formatCurrency(item.warrantyFee)}
																</td>
																<td className="text-center border-blue-gray-900">
																	{formatCurrency(item.price)}
																</td>
															</tr>
														))}
													</tbody>
												</table>
											</div>
										</div>
										<Button
											onClick={handleToggleDetailView}
											className="flex justify-center gap-2 items-center"
										>
											<CreditCardIcon className="w-6 h-6" /> Thông tin chuyển
											khoản
										</Button>
									</div>
								) : (
									<>
										<div className="flex flex-col items-center justify-center min-h-[60vh] mt-2">
											<div className="w-full flex flex-col items-center justify-center border-2 rounded-t-xl border-gray-200">
												<img
													src={settings.bankUrl}
													alt=""
													className="w-[400px]"
												/>
												<h1 className="font-medium text-2xl">
													{settings.bankInfoName}
												</h1>
											</div>
											<div className="w-full p-2 border-x-2 border-b-2">
												<p className="italic text-sm mb-1">
													<b className="text-red-400">*</b> Tải lên hoạt động
													thanh toán tại đây
												</p>
												<input
													type="file"
													accept="image/*"
													className="block w-full text-sm text-slate-500 file:mr-4 border-r border-y border-blue-gray-900 rounded-md file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-gray-900 file:text-white hover:file:opacity-80 hover:cursor-pointer"
													onChange={(e) => onFileChange(e.target.files)}
												/>
											</div>
											<div className="w-full h-fit flex flex-col gap-2 ">
												<div className="flex flex-col gap-2 border-b-2 border-x-2 border-gray-200 p-3 rounded-b-xl">
													<h1 className="font-medium text-md">
														Số tiền cần cọc:{" "}
														{formatCurrency(order.depositAmount)}
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
												<div className="flex gap-5">
													<Button
														onClick={handleToggleDetailView}
														variant="outlined"
														className="flex justify-center gap-2 items-center w-1/2"
													>
														<ClipboardDocumentIcon className="w-6 h-6" /> Thông
														tin đơn hàng
													</Button>
													<Button
														onClick={onPayment}
														className="flex justify-center gap-2 items-center w-1/2"
													>
														<ShoppingBagIcon className="w-6 h-6" /> Gửi ảnh
														thanh toán
													</Button>
												</div>
											</div>
										</div>
									</>
								)}
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

ModalInfo.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	order: PropTypes.object,
	reload: PropTypes.func,
};

export default ModalInfo;
