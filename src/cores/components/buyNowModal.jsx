import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { order } from "./../../services/order";
import { decodeToken } from "./../../helper/decodeToken";
import { toast } from "react-toastify";

const BuyNowModal = ({ isOpen, closeModal, productId, productPrice }) => {
	const buyNow = async () => {
		try {
			const token = localStorage.getItem("token");
			const useId = decodeToken(token).sub;
			const body = {
				userId: useId,
				product: {
					productId: productId,
					quantity: 1,
					totalPrice: productPrice,
				},
			};
			console.log(body);
			// const response = await order(body);
			// if (response.status === 201) {
			// 	toast.success("Thêm sản phẩm thành công");
			// } else {
			// 	toast.error("Thêm sản phẩm thất bại");
			// }
		} catch (error) {
			toast.error("Có lỗi khi thêm sản phẩm");
		}
	};

	return (
		<Dialog open={isOpen} className="relative z-10" onClose={closeModal}>
			<div className="fixed inset-0">
				<div className="flex h-screen items-center justify-center text-center">
					<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-100 p-6 text-left align-middle shadow-xl transition-all">
						<Dialog.Title
							as="h3"
							className="text-lg text-center font-medium leading-6 text-gray-900 mb-5"
						>
							Hello
						</Dialog.Title>
						<div className="flex justify-between gap-5">
							<Button
								className="flex bg-red-900 w-1/2 gap-2 justify-center items-center"
								onClick={closeModal}
							>
								<XMarkIcon strokeWidth={2} className="w-5 h-5" />
								Huỷ
							</Button>
							<Button
								className="flex w-1/2 gap-2 justify-center items-center"
								onClick={() => buyNow()}
							>
								<XMarkIcon strokeWidth={2} className="w-5 h-5" />
								Mua ngay
							</Button>
						</div>
					</Dialog.Panel>
				</div>
			</div>
		</Dialog>
	);
};

BuyNowModal.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	buyNow: PropTypes.func,
	productId: PropTypes.string,
	productPrice: PropTypes.number,
};
export default BuyNowModal;
