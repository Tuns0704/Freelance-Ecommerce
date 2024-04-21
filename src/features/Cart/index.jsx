import { useCallback, useEffect } from "react";
import { useState } from "react";
import { decodeToken } from "../../helper/decodeToken";
import { getUserCart } from "../../services/user";
import CardItem from "./cardItem";
import Loading from "../../cores/components/loading";
import { formatCurrency } from "../../helper/formatCurrency";
import { Tooltip, Button } from "@material-tailwind/react";
import {
	InformationCircleIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";
import { getSettings } from "../../services/setting";
import { updateCart } from "../../services/cart";
import { useNavigate } from "react-router-dom";

const Cart = () => {
	const [carts, setCarts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [settings, setSettings] = useState({});
	const [shippingFee, setShippingFee] = useState(0);
	const [deposit, setDeposit] = useState(0);
	const navigate = useNavigate();

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
	}, [getCartOfUser, settingsOption]);

	const calculateTotalPrice = useCallback(() => {
		let total = 0;
		carts.forEach((item) => {
			total += (item.product.price[0].value + item.warrantyFee) * item.quantity;
		});
		total = total + shippingFee;
		setTotalPrice(total);
	}, [carts, shippingFee]);

	const handleUpdateQuantity = (itemId, newQuantity) => {
		setCarts((prevCarts) => {
			return prevCarts.map((item) => {
				if (item.id === itemId) {
					const warrantyFee = parseFloat(item.product.warrantyFee);
					const quantity = parseFloat(newQuantity);

					let newWarrantyFee =
						!isNaN(warrantyFee) && !isNaN(quantity)
							? warrantyFee * quantity
							: 0;

					return {
						...item,
						quantity: newQuantity,
						warrantyFee: newWarrantyFee,
					};
				}
				return item;
			});
		});
	};

	useEffect(() => {
		calculateTotalPrice();
	}, [calculateTotalPrice]);

	const reloadData = async () => {
		const useId = decodeToken(token).sub;
		const response = await getUserCart(useId);
		if (response.status === 200) {
			setCarts(response.data);
		}
	};

	const onSubmit = async () => {
		const body = carts.map((item) => ({
			cartItemId: item.id,
			updatedData: {
				quantity: item.quantity,
				warrantyFee: item.warrantyFee,
				productId: item.product.id,
				userId: decodeToken(token).sub,
			},
		}));
		const response = await updateCart(body);
		if (response.status === 200) {
			reloadData();
			navigate("/order");
		}
	};

	return (
		<>
			<section className="relative">
				<div className="w-full min-h-[60vh] mx-auto">
					<h2 className="title font-manrope font-bold text-3xl text-blue-gray-900 mb-5">
						Giỏ hàng
					</h2>
					{loading ? (
						<Loading />
					) : (
						<>
							{carts.length === 0 ? (
								<div className="flex flex-col h-[60vh] justify-center items-center">
									<img className="h-1/2" src="/img/empty-cart.webp" alt="" />

									<h1 className="font-medium text-3xl text-red-900">
										Giỏ hàng rỗng
									</h1>
								</div>
							) : (
								<div className="flex flex-col md:flex-row gap-5">
									<div className="w-full md:w-3/5 flex flex-col gap-2">
										{carts.map((item, index) => (
											<CardItem
												cart={item}
												key={index}
												reload={reloadData}
												updateQuantity={handleUpdateQuantity}
											/>
										))}
									</div>
									<div className="w-full md:w-2/5 h-fit flex flex-col gap-2 ">
										<div className="flex flex-col gap-2 border-2 border-gray-200 p-3 rounded-xl">
											<h1 className="font-medium text-xl">
												Số tiền cần cọc: {formatCurrency(deposit)}
											</h1>
											<div className="flex gap-2 items-center">
												<h1 className="font-medium text-xl">
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
											<h1 className="font-medium text-3xl border-t-2 pt-2 border-gray-200">
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
											<CreditCardIcon className="w-6 h-6" /> Tiến hành thanh
											toán
										</Button>
									</div>
								</div>
							)}
						</>
					)}
				</div>
			</section>
		</>
	);
};

// Profile.propTypes = {};

export default Cart;
