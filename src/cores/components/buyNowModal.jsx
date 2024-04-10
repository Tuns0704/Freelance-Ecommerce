import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { order } from "./../../services/order";
import { decodeToken } from "./../../helper/decodeToken";
import { toast } from "react-toastify";
import { Fragment } from "react";

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
					price: productPrice,
					warrantyFee: 0,
				},
				totalPrice: productPrice,
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg text-center font-medium leading-6 text-gray-900 mb-4"
								>
									<div>Nhập thông tin</div>
								</Dialog.Title>
								<div className="flex gap-2">
									<Button className="w-1/2" onClick={closeModal}>
										Huỷ
									</Button>
									<Button className="w-1/2 bg-red-900" onClick={buyNow}>
										Mua ngay
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

BuyNowModal.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	buyNow: PropTypes.func,
	productId: PropTypes.string,
	productPrice: PropTypes.number,
};
export default BuyNowModal;
