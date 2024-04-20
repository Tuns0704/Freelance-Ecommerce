import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import { IconButton, Input, Button } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { formatNumberToFloat } from "../../helper/formatNumberToString";
import { updateSettings } from "../../services/setting";

const ModalEditSettings = ({
	isOpen,
	closeModal,
	adminSettings,
	reload,
	loading,
}) => {
	const [images, setImages] = useState([]);
	const [bannerTop, setBannerTop] = useState([]);
	const [bannerBottom, setBannerBottom] = useState([]);
	const [bankQR, setBankQR] = useState([]);
	const [ratioPrice, setRatioPrice] = useState(
		parseFloat(adminSettings.ratioPrice)
	);
	const [weightBasedPrice, setWeightBasedPrice] = useState(
		parseFloat(adminSettings.weightBasedPrice)
	);
	const [bankInfoName, setBankInfoName] = useState(adminSettings.bankInfoName);
	const [warrantyFees, setWarrantyFees] = useState(adminSettings.warrantyFees);

	const handleChangeWarrantyFees = (event, index) => {
		setWarrantyFees((prevWarrantyFees) => {
			const updatedWarrantyFees = [...prevWarrantyFees];
			updatedWarrantyFees[index] = {
				...updatedWarrantyFees[index],
				fee: event.target.value,
			};
			return updatedWarrantyFees;
		});
	};

	const handleChangeBankInfoName = (event) => {
		setBankInfoName(event.target.value);
	};

	const handleChangeRatioPrice = (event) => {
		setRatioPrice(event.target.value);
	};

	const handleChangeWeightBasedPrice = (event) => {
		setWeightBasedPrice(event.target.value);
	};

	const onFileSlideChange = (files) => {
		setImages((f) => [...f, ...files]);
	};
	const onFileBannerTopChange = (files) => {
		setBannerTop((f) => [...f, ...files]);
	};

	const onFileBankQRChange = (files) => {
		setBankQR((f) => [...f, ...files]);
	};

	const onFileBannerBottomChange = (files) => {
		setBannerBottom((f) => [...f, ...files]);
	};

	const handleOnSubmit = async () => {
		try {
			const formData = new FormData();
			formData.append("ratioPrice", formatNumberToFloat(ratioPrice));
			formData.append("bankInfoName", bankInfoName);
			formData.append("weightBasedPrice", weightBasedPrice);
			warrantyFees.forEach((warranty, index) => {
				formData.append(`warrantyFees[${index}][duration]`, warranty.duration);
				formData.append(`warrantyFees[${index}][fee]`, warranty.fee);
			});
			if (images.length !== 0) {
				images.forEach((image) => {
					formData.append(`slideImage`, image);
				});
			}
			if (bannerTop.length !== 0) {
				bannerTop.forEach((image) => {
					formData.append(`bannerTopImage`, image);
				});
			}
			if (bannerBottom.length !== 0) {
				bannerBottom.forEach((image) => {
					formData.append(`bannerBotImage`, image);
				});
			}
			if (bankQR.length !== 0) {
				bannerBottom.forEach((image) => {
					formData.append(`bankUrl`, image);
				});
			}
			closeModal();
			loading(true);
			const response = await updateSettings(formData);
			if (response.status === 200) {
				toast.success("Sửa settings thành công");
				reload();
			} else {
				toast.error("Cập nhật gặp lỗi");
			}
			loading(false);
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
							<Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-2xl flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div>Sửa settings</div>
									<IconButton onClick={() => closeModal()}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="flex flex-col gap-4 mt-5">
									<div className="flex gap-5">
										<div className="w-1/2">
											<p className="font-medium text-lg">
												Banner đầu trang chủ:
											</p>
											<input
												type="file"
												className="block w-full text-sm text-slate-500 file:mr-4 border-r border-y border-blue-gray-900 rounded-md file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-gray-900 file:text-white hover:file:opacity-80 hover:cursor-pointer"
												onChange={(e) => onFileBannerTopChange(e.target.files)}
											/>
										</div>
										<div className="w-1/2">
											<p className="font-medium text-lg">
												Banner cuối trang chủ:
											</p>
											<input
												type="file"
												className="block w-full text-sm text-slate-500 file:mr-4 border-r border-y border-blue-gray-900 rounded-md file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-gray-900 file:text-white hover:file:opacity-80 hover:cursor-pointer"
												onChange={(e) =>
													onFileBannerBottomChange(e.target.files)
												}
											/>
										</div>
									</div>
									<div className="flex gap-5">
										<div className="flex flex-col gap-3 w-1/2">
											<p className="font-medium text-lg">Giá</p>
											<Input
												label="Tỉ giá tiền tệ"
												type="number"
												defaultValue={ratioPrice}
												onChange={(event) => handleChangeRatioPrice(event)}
											/>
											<Input
												label="Giá vận chuyển theo kg"
												type="number"
												defaultValue={weightBasedPrice}
												onChange={(event) =>
													handleChangeWeightBasedPrice(event)
												}
											/>
										</div>
										<div className="flex flex-col gap-3 w-1/2">
											<p className="font-medium text-lg">
												Thông tin chuyển khoản
											</p>
											<Input
												label="Thông tin tài khoản"
												type="text"
												defaultValue={bankInfoName}
												onChange={(event) => handleChangeBankInfoName(event)}
											/>
											<input
												type="file"
												className="block w-full text-sm text-slate-500 file:mr-4 border-r border-y border-blue-gray-900 rounded-md file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-gray-900 file:text-white hover:file:opacity-80 hover:cursor-pointer"
												onChange={(e) => onFileBankQRChange(e.target.files)}
											/>
										</div>
									</div>
									<div className="flex flex-col gap-3">
										<p className="font-medium text-lg">Bảo hành</p>
										<div className="flex gap-5">
											{adminSettings?.warrantyFees && (
												<>
													<Input
														label="Bảo hành 1 tháng"
														type="text"
														value={warrantyFees[0].fee}
														onChange={(event) =>
															handleChangeWarrantyFees(event, 0)
														}
													/>
													<Input
														label="Bảo hành 6 tháng"
														type="text"
														value={warrantyFees[1].fee}
														onChange={(event) =>
															handleChangeWarrantyFees(event, 1)
														}
													/>
													<Input
														label="Bảo hành 12 tháng"
														type="text"
														value={warrantyFees[2].fee}
														onChange={(event) =>
															handleChangeWarrantyFees(event, 2)
														}
													/>
												</>
											)}
										</div>
									</div>
									<div>
										<p className="font-medium text-lg">Slide ảnh</p>
										<input
											type="file"
											multiple={true}
											className="block w-full text-sm text-slate-500 file:mr-4 border-r border-y border-blue-gray-900 rounded-md file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-gray-900 file:text-white hover:file:opacity-80 hover:cursor-pointer"
											onChange={(e) => onFileSlideChange(e.target.files)}
										/>
									</div>
									<Button className="w-full" onClick={() => handleOnSubmit()}>
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

ModalEditSettings.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	adminSettings: PropTypes.object,
	reload: PropTypes.func,
	loading: PropTypes.func,
};

export default ModalEditSettings;
