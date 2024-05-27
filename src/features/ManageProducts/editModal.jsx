import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import {
	IconButton,
	Input,
	Button,
	Select,
	Option,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useEffect, useState } from "react";
import { updateProduct } from "../../services/product";
import { formatNumberToFloat } from "../../helper/formatNumberToString";
import { toast } from "react-toastify";
import { filterOrdersConditionOptions } from "./../../constant/filter";

const ModalEdit = ({ isOpen, closeModal, product, reload }) => {
	const [productDiscount, setProductDiscount] = useState(0);
	const [conditionOrder, setConditionOrder] = useState(product.conditionOrder);

	const handleChangeProductDiscount = (event) => {
		setProductDiscount(event.target.value);
	};

	const handleDeliveryStatusChange = (value) => {
		setConditionOrder(value);
	};

	useEffect(() => {
		setProductDiscount(
			product.marketingPrice !== null
				? parseFloat(product.marketingPrice.discountPercentage)
				: 0
		);
	}, [product.marketingPrice]);

	const handleOnSubmit = async () => {
		try {
			const body = {
				marketingPrice: {
					discountAmount: product.marketingPrice.discountAmount,
					originalPrice: product.marketingPrice.originalPrice,
					priceTreatment: product.marketingPrice.priceTreatment,
					discountPercentage: formatNumberToFloat(productDiscount),
				},
				conditionOrder: conditionOrder,
			};
			const response = await updateProduct(product.id, body);
			if (response.status === 200) {
				toast.success("Cập nhật giảm giá sản phẩm thành công");
				reload();
				closeModal();
			} else {
				toast.error("Cập nhật gặp lỗi");
			}
		} catch (e) {
			toast.error("Lỗi khi cập nhật giảm giá");
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
									<div>Sửa giảm giá, tình trạng sản phẩm</div>
									<IconButton onClick={closeModal}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="flex flex-col gap-5 mt-5 ">
									<Select
										disabled={product.marketingPrice === null ? true : false}
										value={conditionOrder}
										label="Trạng thái sản phẩm"
										onChange={handleDeliveryStatusChange}
									>
										{filterOrdersConditionOptions.map((item) => (
											<Option key={item.value} value={item.value}>
												{item.label}
											</Option>
										))}
									</Select>
									<Input
										disabled={product.marketingPrice === null ? true : false}
										label="Giảm % giá sản phẩm"
										required={true}
										type="number"
										value={productDiscount}
										onChange={() => handleChangeProductDiscount(event)}
									/>
									<Button
										disabled={product.marketingPrice === null ? true : false}
										className="w-full mt-20"
										onClick={() => handleOnSubmit()}
									>
										Sửa
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

ModalEdit.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	product: PropTypes.object,
	reload: PropTypes.func,
};

export default ModalEdit;
