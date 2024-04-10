import { Dialog, Transition } from "@headlessui/react";
import { Select, Option } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { IconButton, Button } from "@material-tailwind/react";
import { XMarkIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { adminUpdateOrder } from "../../services/order";
import { toast } from "react-toastify";

const ModalEdit = ({ isOpen, closeModal, order, reload }) => {
	const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
	const [deliveryStatus, setDeliveryStatus] = useState(order.deliveryStatus);

	const handleSubmit = async () => {
		const body = {
			...order,
			paymentStatus: paymentStatus,
			deliveryStatus: deliveryStatus,
		};
		const response = await adminUpdateOrder(order.id, body);
		if (response.status === 200) {
			reload();
			toast.success("Cập nhật thành công!");
			closeModal();
		} else {
			toast.error("Cập nhật thất bại");
			closeModal();
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
							<Dialog.Panel className="w-[600px] transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div>Sửa trạng thái đơn hàng</div>
									<IconButton onClick={closeModal}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="mt-5 flex flex-col gap-3">
									<Select
										value={paymentStatus}
										label="Trạng thái thanh toán"
										onChange={(val) => setPaymentStatus(val)}
									>
										<Option value="not_paid">Chưa thanh toán</Option>
										<Option value="partially_paid">Đã thanh toán cọc</Option>
										<Option value="fully_paid">Đã thanh toán toàn bộ</Option>
									</Select>
									<Select
										value={deliveryStatus}
										label="Trạng thái vận chuyển"
										onChange={(val) => setDeliveryStatus(val)}
									>
										<Option value="pending">Đang chờ</Option>
										<Option value="in_transit">Đang được giao</Option>
										<Option value="delivered">Giao thành công</Option>
										<Option value="failed">Giao thất bại</Option>
									</Select>
									<Button
										onClick={() => handleSubmit()}
										className="flex justify-center items-center gap-2"
									>
										<BookmarkIcon className="w-5 h-5" />
										Lưu
									</Button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

ModalEdit.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	order: PropTypes.object,
	reload: PropTypes.func,
};

export default ModalEdit;
