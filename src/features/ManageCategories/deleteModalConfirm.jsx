import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { Button } from "@material-tailwind/react";
import { Fragment } from "react";
import { deleteCategory } from "@services/category";
import { toast } from "react-toastify";

const ModalDeleteCategoryConfirm = ({
	isOpen,
	categoryId,
	closeModal,
	reload,
}) => {
	const onSubmit = async () => {
		try {
			const response = await deleteCategory(categoryId);
			if (response.status === 200) {
				toast.success("Xoá thành công");
				closeModal();
				reload();
			} else {
				toast.error("Lỗi khi xoá danh mục");
			}
		} catch (error) {
			toast.error("Lỗi khi xoá danh mục");
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
									<div>Bạn muốn xoá danh mục này?</div>
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
	categoryId: PropTypes.number,
};

export default ModalDeleteCategoryConfirm;
