import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { IconButton, Input, Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { useState } from "react";
import { addCategory } from "../../services/category";
import { toast } from "react-toastify";

const ModalAddCategory = ({ isOpen, closeModal, reload }) => {
	const [category, setCategory] = useState("");

	const handleChangeCategory = (e) => {
		setCategory(e.target.value);
	};

	const handleOnSubmit = async () => {
		const body = {
			vietnameseName: category,
		};
		const response = await addCategory(body);
		if (response.status === 201) {
			toast.success("Thêm danh mục thành công");
			closeModal();
			reload();
		} else {
			toast.error("Thêm danh mục thất bại");
			closeModal();
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
									className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div>Thêm danh mục</div>
									<IconButton onClick={() => closeModal()}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="flex flex-col gap-4 mt-5">
									<Input
										label="Tên danh mục"
										value={category}
										onChange={handleChangeCategory}
										required={true}
									/>
									<Button
										className="w-full"
										onClick={() => handleOnSubmit()}
										disabled={category !== "" ? false : true}
									>
										Thêm
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

ModalAddCategory.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	reload: PropTypes.func,
};

export default ModalAddCategory;
