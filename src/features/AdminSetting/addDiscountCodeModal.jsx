import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Button, Input, IconButton } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { addDiscount } from "@services/discount";

const DiscountCodeModal = ({ isOpen, closeModal, reload }) => {
	const [discount, setDiscount] = useState({
		code: "",
		value: "",
	});

	const handleAddDiscount = async () => {
		if (discount.code !== "" && discount.value !== "") {
			const response = await addDiscount(discount);
			if (response.status === 201) {
				toast.success("Thêm mã giảm giá thành công!");
				closeModal();
				reload();
			}
		} else {
			toast.warn("Bạn cần nhập đầy đủ thông tin");
		}
	};

	const handleChangeInput = (event) => {
		const { name, value } = event.target;
		setDiscount((prevDiscount) => ({
			...prevDiscount,
			[name]: value,
		}));
	};

	return (
		<Transition appear show={isOpen}>
			<Dialog
				open={isOpen}
				as="div"
				className="relative z-50"
				onClose={closeModal}
			>
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
					<div className="flex h-screen items-center  justify-center text-center">
						<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
							<Dialog.Title
								as="h3"
								className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
							>
								<div>Thêm mã giảm giá</div>
								<IconButton onClick={() => closeModal()}>
									<XMarkIcon className="w-5 h-5" />
								</IconButton>
							</Dialog.Title>
							<div className="flex flex-col gap-3 my-5">
								<Input
									label="Mã giảm giá"
									type="text"
									name="code"
									value={discount.code}
									onChange={(event) => handleChangeInput(event)}
								/>
								<Input
									label="% Giá trị tổng bill"
									type="text"
									name="value"
									value={discount.value}
									onChange={(event) => handleChangeInput(event)}
								/>
							</div>
							<Button
								className="flex gap-2 justify-center items-center"
								fullWidth
								onClick={() => handleAddDiscount()}
							>
								<PlusCircleIcon strokeWidth={2} className="w-5 h-5" />
								Thêm
							</Button>
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

DiscountCodeModal.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	reload: PropTypes.func,
};

export default DiscountCodeModal;
