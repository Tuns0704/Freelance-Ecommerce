import { useState } from "react";
import ConfirmLogin from "./confirmLogin";
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { PropTypes } from "prop-types";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

import { decodeToken } from "@helper/decodeToken";
import { addToCart } from "@services/cart";

const AddToCartButton = ({
	productId,
	productPrice,
	warrantyFee,
	quantity,
}) => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpenModal = () => {
		setIsOpen((prev) => !prev);
	};

	const AddToCart = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const useId = decodeToken(token).sub;
				const body = {
					userId: useId,
					productId: productId,
					quantity: 1,
					totalPrice: productPrice,
					warrantyFee: warrantyFee,
				};
				const response = await addToCart(body);
				if (response.status === 201) {
					toast.success("Thêm sản phẩm thành công");
				} else {
					toast.error("Thêm sản phẩm thất bại");
				}
			} else {
				setIsOpen(true);
			}
		} catch (error) {
			toast.error("Có lỗi khi thêm sản phẩm");
		}
	};
	return (
		<div className="flex w-full">
			<ConfirmLogin isOpen={isOpen} closeModal={handleOpenModal} />
			<Button
				variant="filled"
				size="lg"
				className="font-medium flex justify-center items-center text-sm font-opensans outline-none w-full"
				ripple={false}
				disabled={quantity !== null && quantity > 0 ? false : true}
				onClick={() => AddToCart()}
			>
				<ShoppingCartIcon className="w-6 h-6" /> Thêm vào giỏ hàng
			</Button>
		</div>
	);
};

AddToCartButton.propTypes = {
	productId: PropTypes.string.isRequired,
	productPrice: PropTypes.number.isRequired,
	warrantyFee: PropTypes.number.isRequired,
	quantity: PropTypes.number,
};

export default AddToCartButton;
