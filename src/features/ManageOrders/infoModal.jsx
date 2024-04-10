import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { IconButton } from "@material-tailwind/react";
import {
	XMarkIcon,
	ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { formatCurrency } from "./../../helper/formatCurrency";
import { toast } from "react-toastify";
import { formatDateTime } from "../../helper/formatDateTime";
import { deliveryStatus } from "../../helper/deliveryStatus";
import { paymentStatus } from "../../helper/paymentStatus";

const ModalInfo = ({ isOpen, closeModal, order }) => {
	const copyLinkToClipboard = async (link) => {
		try {
			await navigator.clipboard.writeText(link);
			toast.success("Link copied to clipboard!");
		} catch (error) {
			console.error("Failed to copy link: ", error);
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
							<Dialog.Panel className="w-[1200px] transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div className="text-3xl font-bold">Chi tiết đơn hàng</div>
									<IconButton onClick={closeModal}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="mt-5 flex flex-col gap-5">
									<div className="w-full flex gap-5">
										<div className="w-1/2 border-2 border-blue-gray-900 rounded-xl p-3">
											<h1 className="font-medium text-2xl mb-2">
												Thông tin khách hàng
											</h1>
											<ul className="list-inside list-disc">
												<li>
													<b>Tên:</b> {order.user.displayName}
												</li>
												<li>
													<b>Số điện thoại:</b> {order.user.phone}
												</li>
												<li>
													<b>Địa chỉ:</b> {order.user.address}
												</li>
											</ul>
										</div>
										<div className="w-1/2 border-2 border-blue-gray-900 rounded-xl p-3">
											<h1 className="font-medium text-2xl mb-2">
												Thông tin đơn
											</h1>
											<ul className="list-inside list-disc">
												<li>
													<b>Phí bảo hành:</b>{" "}
													{formatCurrency(order.depositAmount)}
												</li>
												<li>
													<b>Phí vận chuyển:</b>{" "}
													{formatCurrency(order.shippingFee)}
												</li>
												<li>
													<b>Tổng tiền:</b> {formatCurrency(order.totalPrice)}
												</li>
												<li>
													<b>Thời gian đặt:</b>{" "}
													{formatDateTime(order.createdAt)}
												</li>
												<li>
													<b>Tình trạng vận chuyến:</b>{" "}
													{deliveryStatus(order.deliveryStatus)}
												</li>
												<li>
													<b>Tình trạng thanh toán:</b>{" "}
													{paymentStatus(order.paymentStatus)}
												</li>
											</ul>
										</div>
									</div>
									{order.paymentImg !== null && (
										<div>
											<h1 className="font-medium text-2xl mb-2">
												Ảnh chuyển khoản
											</h1>
											<div className="flex items-center justify-center">
												<img
													src={order.paymentImg}
													alt=""
													className="self-center w-[600px] object-cover"
												/>
											</div>
										</div>
									)}
									<div>
										<h1 className="font-medium text-2xl mb-2">
											Danh sách đơn hàng
										</h1>
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
														<th className="text-center p-2 border-r border-blue-gray-900">
															Giá
														</th>
														<th className="text-center p-2">Link sản phẩm</th>
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
																{formatCurrency(item.price)}
															</td>
															<td className="text-center border-r border-blue-gray-900">
																{formatCurrency(item.price)}
															</td>
															<td className="p-2 flex justify-center">
																<IconButton
																	onClick={() =>
																		copyLinkToClipboard(item.product.itemWebUrl)
																	}
																>
																	<ClipboardDocumentListIcon className="w-5 h-5" />
																</IconButton>
															</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									</div>
								</div>
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
};

export default ModalInfo;
