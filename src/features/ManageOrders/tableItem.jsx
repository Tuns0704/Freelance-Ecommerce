import { PropTypes } from "prop-types";
import { IconButton } from "@material-tailwind/react";
import {
	InformationCircleIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import { paymentStatus } from "@helper/paymentStatus";
import { formatDateTime } from "@helper/formatDateTime";
import { deliveryStatus } from "@helper/deliveryStatus";
import ModalInfo from "./infoModal";
import ModalEdit from "./editModal";

const TableItem = ({ order, reload }) => {
	const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
	const [editModalIsOpen, setEditModalIsOpen] = useState(false);

	const handleToggleInfoModal = () => {
		setInfoModalIsOpen((pre) => !pre);
	};
	const handleToggleEditModal = () => {
		setEditModalIsOpen((pre) => !pre);
	};

	return (
		<tr className="border-b border-blue-gray-50">
			<td className="px-5 w-20 py-2 border-r">{order.id}</td>
			<td className="px-5  py-2 border-r">{order.user.displayName}</td>
			<td className="px-5  py-2 border-r">{order.user.phone}</td>
			<td className="px-5 py-2 border-r">{formatDateTime(order.createdAt)}</td>
			<td className="px-5  py-2 border-r">
				{paymentStatus(order.paymentStatus)}
			</td>
			<td className="px-5  py-2 border-r">
				{deliveryStatus(order.deliveryStatus)}
			</td>
			<td className="px-5  py-2 w-[140px] flex gap-2">
				<IconButton onClick={() => handleToggleInfoModal()}>
					<InformationCircleIcon className="w-5 h-5" />
				</IconButton>
				<IconButton color="green" onClick={() => handleToggleEditModal()}>
					<PencilSquareIcon className="w-5 h-5" />
				</IconButton>
				<ModalInfo
					isOpen={infoModalIsOpen}
					closeModal={handleToggleInfoModal}
					order={order}
				/>
				<ModalEdit
					isOpen={editModalIsOpen}
					closeModal={handleToggleEditModal}
					order={order}
					reload={reload}
				/>
			</td>
		</tr>
	);
};

TableItem.propTypes = {
	order: PropTypes.object,
	reload: PropTypes.func,
};

export default TableItem;
