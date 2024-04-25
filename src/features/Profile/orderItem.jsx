import { PropTypes } from "prop-types";
import { formatCurrency } from "../../helper/formatCurrency";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { paymentStatus } from "../../helper/paymentStatus";
import ModalInfo from "./infoModal";
import { deliveryStatus } from "../../helper/deliveryStatus";

const OrderItem = ({ order, reload }) => {
	const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

	const handleToggleInfoModal = () => {
		setInfoModalIsOpen((pre) => !pre);
	};

	return (
		<div className="relative border-2 rounded-md p-2 w-full  sm:w-[320px] border-blue-gray-900 ">
			<div className="flex gap-3">
				<p className="font-medium">Mã đơn:</p> ORDERUS{order.id}
			</div>
			<div>Thanh toán: {paymentStatus(order.paymentStatus)}</div>
			<div>Phí vận chuyển: {formatCurrency(order.shippingFee)}</div>
			<div>
				<p>
					Tổng tiền:{" "}
					<label className="font-semibold text-red-400">
						{formatCurrency(order.totalPrice)}
					</label>
				</p>
			</div>
			<div>
				<p>
					Thông tin vận chuyển:{" "}
					<label className="font-semibold text-blue-400">
						{deliveryStatus(order.deliveryStatus)}
					</label>
				</p>
			</div>
			<button
				className="absolute top-2 right-2"
				onClick={() => handleToggleInfoModal()}
			>
				<InformationCircleIcon className="w-6 h-6 text-blue-gray-900" />
			</button>
			<ModalInfo
				isOpen={infoModalIsOpen}
				closeModal={handleToggleInfoModal}
				order={order}
				reload={reload}
			/>
		</div>
	);
};

OrderItem.propTypes = {
	order: PropTypes.object,
	reload: PropTypes.func,
};

export default OrderItem;
