import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { formatCurrency } from "./../../helper/formatCurrency";
import { formatPercentage } from "./../../helper/formatPercentage";

const ModalInfo = ({ isOpen, closeModal, product }) => {
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
							<Dialog.Panel className="w-[600px] transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div>Chi tiết sản phẩm</div>
									<IconButton onClick={closeModal}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="mt-5 w-full flex flex-col gap-2">
									<img
										src={
											product.additionalImages !== null
												? product.additionalImages
												: ""
										}
										className="w-[300px] h-[300px] object-contain self-center"
										alt={product.id}
									/>
									<p className="">
										<b>Tên sản phẩm: </b>
										<label className="">{product.name}</label>
									</p>
									<p className="">
										<b>Giá sản phẩm: </b>
										<label className="text-red-900 text-2xl font-bold">
											{formatCurrency(product.price[0].value)}
										</label>
										{product.marketingPrice !== null && (
											<>
												<del className="text-gray-600 text-base font-semibold ml-2">
													{formatCurrency(
														product.marketingPrice.originalPrice.value
													)}
												</del>
												<label className="text-gray-600 text-base font-semibold ml-2">
													(
													{formatPercentage(
														product.marketingPrice.discountPercentage
													)}
													%)
												</label>
											</>
										)}
									</p>
									<p className="">
										<b>Người bán: </b>
										<label className="">{product.storeName}</label>
									</p>
									<p className="">
										<b>Tình trạng hàng: </b>
										<label className="bg-red-900 text-white px-3 py-1 rounded font-semibold">
											{product.condition}
										</label>
									</p>
									<p className="">
										<b>Danh mục: </b>
										<label className="">
											{product.category.vietnameseName}
										</label>
									</p>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

ModalInfo.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	product: PropTypes.object,
};

export default ModalInfo;
