import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { Button } from "@material-tailwind/react";
import { Fragment } from "react";
import { toast } from "react-toastify";
import { deleteProductById } from "@services/product";

const ModalDeleteCategoryConfirm = ({
	isOpen,
	productId,
	closeModal,
	reload,
}) => {
	const onSubmit = async () => {
		try {
			const response = await deleteProductById(productId);
			if (response.status === 200) {
				toast.success("Xoá thành công");
				closeModal();
				reload();
			} else {
				toast.error("Lỗi khi xoá sản phẩm");
			}
		} catch {
			toast.error("Lỗi khi xoá sản phẩm");
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
									<div>Bạn muốn xoá sản phẩm này?</div>
								</Dialog.Title>
								<div className="flex gap-2">
									<Button className="w-1/2" onClick={() => closeModal()}>
										Huỷ
									</Button>
									<Button
										className="w-1/2 bg-red-900"
										onClick={() => onSubmit()}
									>
										Xoá
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

ModalDeleteCategoryConfirm.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	reload: PropTypes.func,
	productId: PropTypes.string,
};

export default ModalDeleteCategoryConfirm;
