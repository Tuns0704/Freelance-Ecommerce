import { PropTypes } from "prop-types";
import { IconButton } from "@material-tailwind/react";
import { formatCurrency } from "@helper/formatCurrency";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { deleteFromCart } from "@services/cart";
import ModalDeleteConfirm from "./deleteModalConfirm";
import { toast } from "react-toastify";

const CardItem = ({ cart, reload, updateQuantity }) => {
	const [quantity, setQuantity] = useState(cart.quantity);
	const [isOpen, setIsOpen] = useState(false);

	const handleIncreaseQuantity = () => {
		const newQuantity = parseFloat((quantity + 1).toFixed(0));
		setQuantity(newQuantity);
		updateQuantity(cart.id, newQuantity);
	};

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			const newQuantity = parseFloat((quantity - 1).toFixed(0));
			setQuantity(newQuantity);
			updateQuantity(cart.id, newQuantity);
		}
	};

	const handleToggleDeleteButton = () => {
		setIsOpen((prev) => !prev);
	};

	const handleDeleteCartItem = async () => {
		const response = await deleteFromCart(cart.id);
		if (response.status === 200) {
			handleToggleDeleteButton();
			toast.success("Xoá sản phẩm thành công!");
			reload();
		} else {
			handleToggleDeleteButton();
			toast.error("Xoá sản phẩm thất bại");
			reload();
		}
	};

	return (
		<div className="rounded-xl relative border-2 border-gray-200 p-4 grid grid-cols-12">
			<button
				onClick={() => handleToggleDeleteButton(cart.id)}
				className="rounded-full absolute select-none  transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] text-xs bg-gray-900 p-2 text-white top-5 right-5 group flex items-center justify-center shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
			>
				<TrashIcon strokeWidth={2} className="w-5 h-5" />
			</button>
			<div className="col-span-12 lg:col-span-2 flex justify-center">
				<img
					src={
						Array.isArray(cart.product.additionalImages) &&
						cart.product.additionalImages.length > 0
							? cart.product.additionalImages[0]
							: cart.product.additionalImages
					}
					alt="speaker image"
					className="w-[180px] max-lg:h-full h-[180px] object-contain self-center"
				/>
			</div>
			<div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
				<div className="items-center text-justify w-full mb-4">
					<h5 className="font-bold text-2xl md:w-4/5 leading-9 text-gray-900">
						{cart.product.name}
					</h5>
				</div>
				<div className="flex gap-2">
					<div className="px-3 py-1 border border-red-900 w-fit rounded-md font-semibold text-red-900 mb-4">
						{cart.product.condition}
					</div>
					<div className="px-3 py-1 border border-red-900 w-fit rounded-md font-semibold text-red-900 mb-4">
						{formatCurrency(cart.warrantyFee)}
					</div>
				</div>
				<div className="flex justify-between items-center">
					<div className="flex">
						<IconButton
							onClick={() => handleDecreaseQuantity()}
							className="rounded-r-none"
						>
							-
						</IconButton>
						<input
							type="number"
							className="border outline-none w-[60px] text-center"
							value={quantity}
							readOnly
						/>
						<IconButton
							onClick={() => handleIncreaseQuantity()}
							className="rounded-l-none"
						>
							+
						</IconButton>
					</div>
					<ModalDeleteConfirm
						isOpen={isOpen}
						closeModal={handleToggleDeleteButton}
						onSubmit={handleDeleteCartItem}
					/>
					<h6 className="text-red-900 font-manrope font-bold text-2xl leading-9 text-right">
						{formatCurrency(
							(cart.product.price[cart.product.price.length - 1].value +
								cart.warrantyFee) *
								quantity
						)}
					</h6>
				</div>
			</div>
		</div>
	);
};

CardItem.propTypes = {
	cart: PropTypes.object,
	reload: PropTypes.func,
	updateQuantity: PropTypes.func,
};

export default CardItem;
