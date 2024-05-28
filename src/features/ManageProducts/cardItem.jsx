import { PropTypes } from "prop-types";
import { formatCurrency } from "@helper/formatCurrency";
import { IconButton } from "@material-tailwind/react";
import {
	InformationCircleIcon,
	PencilSquareIcon,
	ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import ModalInfo from "./infoModal";
import ModalEdit from "./editModal";
import ModalDeleteConfirm from "./deleteModalConfirm";

const CardItem = ({ product, reload }) => {
	const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
	const [editModalIsOpen, setEditModalIsOpen] = useState(false);
	const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

	const handleToggleInfoModal = () => {
		setInfoModalIsOpen((pre) => !pre);
	};

	const handleToggleEditModal = () => {
		setEditModalIsOpen((pre) => !pre);
	};

	const handleToggleDeleteModal = () => {
		setDeleteModalIsOpen((pre) => !pre);
	};

	return (
		<tr className="border-b border-blue-gray-50">
			<td scope="row" className="px-5 w-20 py-2 border-r">
				{product.id}
			</td>
			<td className="px-5 w-[250px] py-2 border-r">
				<img
					src={
						product.additionalImages !== null
							? product.additionalImages
							: "Không có ảnh"
					}
					className="w-[250px] h-[100px] object-contain"
					alt={product.id}
				/>
			</td>
			<td className="px-5 w-[500px] py-2 border-r">{product.name}</td>
			<td className="px-5 w-[200px] py-2 border-r">
				{formatCurrency(product.price[0].value)}
			</td>
			<td className="px-5 py-2 w-[150px] border-r">
				{product.category.vietnameseName}
			</td>
			<td className="px-5 py-2 h-[100px] gap-5 flex items-center">
				<div>
					<ModalInfo
						product={product}
						isOpen={infoModalIsOpen}
						closeModal={handleToggleInfoModal}
					/>
					<IconButton onClick={() => handleToggleInfoModal()}>
						<InformationCircleIcon className="w-5 h-5" />
					</IconButton>
				</div>
				<div>
					<ModalEdit
						product={product}
						isOpen={editModalIsOpen}
						closeModal={handleToggleEditModal}
						reload={reload}
					/>
					<IconButton color="green" onClick={() => handleToggleEditModal()}>
						<PencilSquareIcon className="w-5 h-5" />
					</IconButton>
				</div>
				<div>
					<ModalDeleteConfirm
						productId={product.id}
						isOpen={deleteModalIsOpen}
						closeModal={handleToggleDeleteModal}
						reload={reload}
					/>
					<IconButton color="red" onClick={() => handleToggleDeleteModal()}>
						<ArchiveBoxXMarkIcon className="w-5 h-5" />
					</IconButton>
				</div>
			</td>
		</tr>
	);
};

CardItem.propTypes = {
	product: PropTypes.object,
	reload: PropTypes.func,
};

export default CardItem;
