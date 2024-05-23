import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { IconButton } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const DescriptionDetail = ({
	isOpen,
	localizedAspects,
	shortDescription,
	closeModal,
}) => {
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
							<Dialog.Panel className="w-[900px] max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div>Chi tiết sản phẩm</div>
									<IconButton onClick={closeModal}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="mt-5 flex flex-col gap-2">
									<div className="text-justify">
										<b>Mô tả: </b>
										<div>
											{shortDescription
												? shortDescription
												: "Người bán không viết mô tả ngắn"}
										</div>
									</div>
									<div>
										<p className="font-bold">Chi tiết: </p>
										<table className="border w-full">
											<tbody className="w-full">
												{localizedAspects ? (
													<>
														{localizedAspects.map((item, index) => (
															<tr className="w-full" key={index}>
																<td className="w-1/2 p-2">{item.Name}</td>
																<td className="w-1/2 p-2">
																	{Array.isArray(item.Value) ? (
																		<ul>
																			{item.Value.map((value, subIndex) => (
																				<li key={subIndex}>{value}</li>
																			))}
																		</ul>
																	) : (
																		item.Value
																	)}
																</td>
															</tr>
														))}
													</>
												) : (
													""
												)}
											</tbody>
										</table>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

DescriptionDetail.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	localizedAspects: PropTypes.array,
	shortDescription: PropTypes.string,
};

export default DescriptionDetail;
