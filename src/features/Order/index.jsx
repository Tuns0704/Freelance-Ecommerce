import { useCallback, useEffect } from "react";
import { useState } from "react";
import { decodeToken } from "../../helper/decodeToken";
import { getUserCart, getUserProfile } from "../../services/user";
import CardItem from "./cardItem";
import Loading from "../../cores/components/loading";
import { formatCurrency } from "../../helper/formatCurrency";
import { Tooltip, Button, Input } from "@material-tailwind/react";
import {
	InformationCircleIcon,
	ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { getSettings } from "../../services/setting";
import { validateInputs } from "../../helper/validateInputOrder";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { order } from "../../services/order";
import { formatAddressToLocation } from "../../helper/formatAdressToObjectLocation";
import { checkDiscountCode } from "../../services/discount";

const Order = () => {
	const navigate = useNavigate();

	const [carts, setCarts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [settings, setSettings] = useState({});
	const [shippingFee, setShippingFee] = useState(0);
	const [deposit, setDeposit] = useState(0);
	const [location, setLocation] = useState({
		street: "",
		ward: "",
		district: "",
		city: "",
	});
	const [phoneNumber, setPhoneNumber] = useState("");
	const [coupon, setCoupon] = useState("");

	const token = localStorage.getItem("token");

	const getCartOfUser = useCallback(async () => {
		setLoading(true);
		const useId = decodeToken(token).sub;
		const response = await getUserCart(useId);
		if (response.status === 200) {
			setCarts(response.data);
		}
		setLoading(false);
	}, [token]);

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
		setDeposit((settings.depositAmount / 100) * totalPrice);
		setShippingFee(settings.weightBasedPrice * 10);
	}, [settings.depositAmount, settings.weightBasedPrice, totalPrice]);

	useEffect(() => {
		getCartOfUser();
		settingsOption();
		getUserInformation();
	}, [getCartOfUser, settingsOption]);

	const calculateTotalPrice = useCallback(() => {
		let total = 0;
		carts.forEach((item) => {
			total +=
				(item.product.price[item.product.price.length - 1].value +
					item.warrantyFee) *
				item.quantity;
		});
		total = total + shippingFee;
		setTotalPrice(total);
	}, [carts, shippingFee]);

	useEffect(() => {
		calculateTotalPrice();
	}, [calculateTotalPrice]);

	const getCoupon = async () => {
		try {
			const body = { discountCode: coupon };
			const response = await checkDiscountCode(body);
			if (response.status === 201 && response.data.discount) {
				setTotalPrice(
					totalPrice - (totalPrice * response.data.discount.value) / 100
				);
				toast.success(
					`Mã giảm giá ${response.data.discount.value}% giá trị hoá đơn`
				);
			} else {
				calculateTotalPrice();
				toast.error("Mã giảm giá sai!");
			}
		} catch {
			toast.error("Mã giảm giá sai");
		}
	};

	const onSubmit = async () => {
		const errors = validateInputs(phoneNumber, location);
		if (Object.keys(errors).length === 0) {
			const body = {
				userId: decodeToken(token).sub,
				products: carts.map((cart) => ({
					productId: cart.product.id,
					quantity: cart.quantity,
					warrantyFee: cart.warrantyFee,
					price: cart.quantity * cart.product.price[0].value,
				})),
				totalPrice: totalPrice,
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
				navigate(`/orderPayment/${response.data.id}`);
			} else {
				toast.error("Có lỗi khi tạo đơn");
			}
		} else {
			toast.error("Vui lòng nhập đủ các thông tin");
		}
	};

	const handleChangePhoneNumber = (event) => {
		setPhoneNumber(event.target.value);
	};

	const handleChangeCoupon = (event) => {
		setCoupon(event.target.value);
	};

	const handleChangeLocation = (event) => {
		const { name, value } = event.target;
		setLocation((prevLocation) => ({
			...prevLocation,
			[name]: value,
		}));
	};

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<>
					<section className="relative">
						<div className="w-full min-h-[60vh] mx-auto">
							<h2 className="title font-manrope font-bold text-3xl text-blue-gray-900 mb-5">
								Thanh toán
							</h2>
							<div className="flex flex-col sm:flex-row w-full gap-5">
								<div className="flex flex-col sm:w-2/6 gap-3">
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
								<div className="sm:w-2/6  flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
									{carts.map((item, index) => (
										<CardItem cart={item} key={index} />
									))}
								</div>
								<div className="sm:w-2/6 h-fit flex flex-col gap-2 ">
									<div className="flex w-full flex-col gap-2 border-2 border-gray-200 p-3 rounded-xl">
										<h1 className="font-medium text-md">
											Số tiền cần cọc: {formatCurrency(deposit)}
										</h1>
										<div className="flex gap-2 items-center">
											<h1 className="font-medium text-md">
												Số tiền ship: {formatCurrency(shippingFee)}
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
										<div className="flex md:flex-row flex-col gap-2">
											<Input
												value={coupon}
												label="Mã giảm giá"
												className="w-1/2"
												onChange={(e) => handleChangeCoupon(e)}
											/>
											<Button onClick={getCoupon}>Nhập</Button>
										</div>
										<h1 className="w-1/2 font-medium text-3xl border-t-2 pt-2 border-gray-200">
											Tổng tiền:{" "}
											<label className="text-red-900">
												{formatCurrency(totalPrice)}
											</label>
										</h1>
									</div>
									<Button
										onClick={onSubmit}
										className="flex justify-center gap-2 items-center"
									>
										<ShoppingBagIcon className="w-6 h-6" /> Đặt đơn
									</Button>
								</div>
							</div>
						</div>
					</section>
				</>
			)}
		</>
	);
};

// Profile.propTypes = {};

export default Order;
