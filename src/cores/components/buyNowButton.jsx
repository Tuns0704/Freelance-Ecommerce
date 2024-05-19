import { useState } from "react";
import ConfirmLogin from "./confirmLogin";
import { Button } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { CreditCardIcon } from "@heroicons/react/24/solid";
import BuyNowModal from "./buyNowModal";

const BuyNowButton = ({ productId, productPrice }) => {
	const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
	const [isBuyNowModalOpen, setBuyNowModalOpen] = useState(false);

	const handleToggleConfirmModal = () => {
		setIsConfirmModalOpen((prev) => !prev);
	};

	const handleToggleBuyNowModal = () => {
		const token = localStorage.getItem("token");
		if (token) {
			setBuyNowModalOpen((prev) => !prev);
		} else {
			setIsConfirmModalOpen((prev) => !prev);
		}
	};

	return (
		<div className="flex w-full">
			<Button
				variant="filled"
				size="lg"
				className="font-medium flex justify-center items-center text-sm font-opensans outline-none w-full"
				ripple={false}
				onClick={() => handleToggleBuyNowModal()}
			>
				<CreditCardIcon className="w-6 h-6" /> Mua ngay
			</Button>
			<ConfirmLogin
				isOpen={isConfirmModalOpen}
				closeModal={handleToggleConfirmModal}
			/>
			<BuyNowModal
				isOpen={isBuyNowModalOpen}
				closeModal={handleToggleBuyNowModal}
				productId={productId}
				productPrice={productPrice}
			/>
		</div>
	);
};

BuyNowButton.propTypes = {
	productId: PropTypes.string,
	productPrice: PropTypes.number,
};

export default BuyNowButton;
