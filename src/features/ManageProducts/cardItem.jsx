import { PropTypes } from "prop-types";
import { formatCurrency } from "../../helper/formatCurrency";
import { IconButton } from "@material-tailwind/react";
import {
	InformationCircleIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import ModalInfo from "./infoModal";
import ModalEdit from "./editModal";

const CardItem = ({ product, reload }) => {
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
			<td scope="row" className="px-5 w-20 py-2 border-r">
				{product.id}
			</td>
			<td className="px-5 w-[250px] py-2 border-r">
				<img
					src={
						product.thumbnailImages !== null
							? product.thumbnailImages[0].imageUrl
							: "Không có ảnh"
					}
					className="w-[250px] h-[100px] object-contain"
					alt={product.id}
				/>
			</td>
			<td className="px-5 w-[550px] py-2 border-r">{product.name}</td>
			<td className="px-5 w-[250px] py-2 border-r">
				{formatCurrency(product.price[0].value)}
			</td>
			<td className="px-5 py-2 w-2/12 border-r">
				{product.category.vietnameseName}
			</td>
			<td className="px-5 py-2 w-[160px] h-[100px] gap-5 flex items-center">
				<IconButton onClick={handleToggleInfoModal}>
					<InformationCircleIcon className="w-5 h-5" />
				</IconButton>
				<IconButton color="green" onClick={handleToggleEditModal}>
					<PencilSquareIcon className="w-5 h-5" />
				</IconButton>
				<ModalInfo
					product={product}
					isOpen={infoModalIsOpen}
					closeModal={handleToggleInfoModal}
				/>
				<ModalEdit
					product={product}
					isOpen={editModalIsOpen}
					closeModal={handleToggleEditModal}
					reload={reload}
				/>
			</td>
		</tr>
	);
};

CardItem.propTypes = {
	product: PropTypes.object,
	reload: PropTypes.func,
};

export default CardItem;
