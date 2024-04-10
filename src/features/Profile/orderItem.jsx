import { PropTypes } from "prop-types";
import { formatCurrency } from "../../helper/formatCurrency";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { paymentStatus } from "../../helper/paymentStatus";
import ModalInfo from "./infoModal";

const OrderItem = ({ order, reload }) => {
	const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

	const handleToggleInfoModal = () => {
		setInfoModalIsOpen((pre) => !pre);
	};

	return (
		<div className="relative border-2 rounded-md p-2 w-full  sm:w-[300px] border-blue-gray-900 ">
			<div className="flex gap-2">
				<p className="font-medium">Mã đơn:</p> {order.id}
			</div>
			<div>Thanh toán: {paymentStatus(order.paymentStatus)}</div>
			<div>Phí vận chuyển: {formatCurrency(order.shippingFee)}</div>
			<div>Tổng tiền: {formatCurrency(order.totalPrice)}</div>
			<button
				className="absolute top-2 right-2"
				onClick={() => handleToggleInfoModal()}
			>
				<ModalInfo
					isOpen={infoModalIsOpen}
					closeModal={handleToggleInfoModal}
					order={order}
					reload={reload}
				/>
				<InformationCircleIcon className="w-6 h-6 text-blue-gray-900" />
			</button>
		</div>
	);
};

OrderItem.propTypes = {
	order: PropTypes.object,
	reload: PropTypes.func,
};

export default OrderItem;
