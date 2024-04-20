import {
	InformationCircleIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Button, Input, Tooltip } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { order, updateOrder } from "./../../services/order";
import { decodeToken } from "./../../helper/decodeToken";
import { toast } from "react-toastify";
import { Fragment, useCallback, useEffect, useState } from "react";
import { getSettings } from "../../services/setting";
import { formatAddressToLocation } from "../../helper/formatAdressToObjectLocation";
import { getUserProfile } from "../../services/user";
import { validateInputs } from "./../../helper/validateInputOrder";
import { formatCurrency } from "./../../helper/formatCurrency";
import { useNavigate } from "react-router-dom";

const BuyNowModal = ({ isOpen, closeModal, productId, productPrice }) => {
	const [show, setShow] = useState(false);
	const [images, setImages] = useState([]);
	const [settings, setSettings] = useState({});
	const [orderInfo, setOrderInfo] = useState({});

	const [shippingFee, setShippingFee] = useState(0);
	const [phoneNumber, setPhoneNumber] = useState("");
	const [deposit, setDeposit] = useState(0);

	const [location, setLocation] = useState({
		street: "",
		ward: "",
		district: "",
		city: "",
	});

	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	const getUserInformation = async () => {
		const response = await getUserProfile();
		if (response.status === 200) {
			setPhoneNumber(response.data.phone);
			setLocation(formatAddressToLocation(response.data.address));
		}
	};

	const settingsOption = useCallback(async () => {
		const response = await getSettings();
		if (response.status === 200) {
			setSettings(response.data);
		}
	}, []);

	useEffect(() => {
		setDeposit((settings.depositAmount / 100) * productPrice);
		setShippingFee(settings.weightBasedPrice * 10);
	}, [settings.depositAmount, settings.weightBasedPrice, productPrice]);

	useEffect(() => {
		settingsOption();
		getUserInformation();
	}, [settingsOption]);

	const buyNow = async () => {
		const errors = validateInputs(phoneNumber, location);
		if (Object.keys(errors).length === 0) {
			const body = {
				userId: decodeToken(token).sub,
				products: [
					{
						productId: productId,
						quantity: 1,
						price: productPrice,
						warrantyFee: 0,
					},
				],
				totalPrice: productPrice,
				shippingFee: shippingFee,
				phone: phoneNumber,
				depositAmount: deposit,
				address:
					location.street +
					"," +
					location.ward +
					"," +
					location.district +
					"," +
					location.city,
			};
			const response = await order(body);
			if (response.status === 201) {
				toast.success("Tạo đơn thành công!");
				setOrderInfo(response.data);
				setShow(!show);
			} else {
				toast.error("Có lỗi khi tạo đơn");
			}
		} else {
			toast.error("Vui lòng nhập đủ các thông tin");
		}
	};

	const onPayment = async () => {
		const formData = new FormData();
		if (images.length !== 0) {
			images.forEach((img) => {
				formData.append(`paymentImg`, img);
			});
		}
		const response = await updateOrder(order.id, formData);
		if (response.status === 200) {
			toast.success(
				"Gửi ảnh thanh toán thành công! Tiến hành kiểm tra thông tin chuyển khoản <3"
			);
			setShow(!show);
			closeModal();
			navigate("/home");
		} else {
			toast.error("Gửi ảnh thanh toán thất bại");
		}
	};

	const handleChangePhoneNumber = (event) => {
		setPhoneNumber(event.target.value);
	};

	const onFileChange = (files) => {
		setImages((f) => [...f, ...files]);
	};

	const handleChangeLocation = (event) => {
		const { name, value } = event.target;
		setLocation((prevLocation) => ({
			...prevLocation,
			[name]: value,
		}));
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
							<Dialog.Panel className="w-[600px] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg text-center font-medium leading-6 text-gray-900 mb-4"
								>
									<div>Mua ngay</div>
								</Dialog.Title>
								{show ? (
									<div className="flex flex-col items-center justify-center min-h-[60vh]">
										<div className="flex flex-col items-center justify-center border-2 rounded-t-xl border-gray-200">
											<img
												src={settings.bankUrl}
												alt=""
												className="w-[400px]"
											/>
											<h1 className="font-medium text-2xl">
												{settings.bankInfoName}
											</h1>
										</div>
										<div className="w-full p-2 border-x-2 border-b-2">
											<input
												type="file"
												className="block w-full text-sm text-slate-500 file:mr-4 border-r border-y border-blue-gray-900 rounded-md file:py-2 file:px-4 file:rounded-l-md file:border-0 file:text-sm file:font-semibold file:bg-blue-gray-900 file:text-white hover:file:opacity-80 hover:cursor-pointer"
												onChange={(e) => onFileChange(e.target.files)}
											/>
										</div>
										<div className="w-full h-fit flex flex-col gap-2 ">
											<div className="flex flex-col gap-2 border-b-2 border-x-2 border-gray-200 p-3 rounded-b-xl">
												<h1 className="font-medium text-md">
													Số tiền cần cọc:{" "}
													{formatCurrency(orderInfo.depositAmount)}
												</h1>
												<div className="flex gap-2 items-center">
													<h1 className="font-medium text-md">
														Số tiền ship:{" "}
														{formatCurrency(orderInfo.shippingFee)}
													</h1>
													<Tooltip
														animate={{
															mount: { scale: 1, y: 0 },
															unmount: { scale: 0, y: 25 },
														}}
														content="Sau khi hàng về sẽ được cân lại và tính tiền chênh lệch cho khách hàng."
													>
														<InformationCircleIcon className="w-5 h-5 text-red-900" />
													</Tooltip>
												</div>
												<h1 className="font-medium text-3xl border-t-2 pt-2 border-gray-200">
													Tổng tiền:{" "}
													<label className="text-red-900">
														{formatCurrency(orderInfo.totalPrice)}
													</label>
												</h1>
											</div>
											<Button
												onClick={() => onPayment()}
												className="flex justify-center gap-2 items-center"
											>
												<ShoppingBagIcon className="w-6 h-6" /> Gửi ảnh thanh
												toán
											</Button>
										</div>
									</div>
								) : (
									<>
										<div className="flex flex-col gap-3 mb-5">
											<Input
												value={phoneNumber}
												label="Số điện thoại"
												onChange={(e) => handleChangePhoneNumber(e)}
												required
											/>
											<Input
												label="Tên đường, toà nhà, số nhà"
												name="street"
												value={location.street}
												onChange={handleChangeLocation}
												required
											/>
											<Input
												label="Phường/Xã"
												name="ward"
												value={location.ward}
												onChange={handleChangeLocation}
												required
											/>
											<Input
												label="Quận/Huyện"
												name="district"
												value={location.district}
												onChange={handleChangeLocation}
												required
											/>
											<Input
												label="Tỉnh/Thành Phố"
												name="city"
												value={location.city}
												onChange={handleChangeLocation}
												required
											/>
										</div>
										<div className="flex gap-2">
											<Button className="w-1/2" onClick={() => closeModal()}>
												Huỷ
											</Button>
											<Button
												className="w-1/2 bg-red-900"
												onClick={() => buyNow()}
											>
												Mua ngay
											</Button>
										</div>
									</>
								)}
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
