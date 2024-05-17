import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/product";
import {
	Button,
	Popover,
	PopoverHandler,
	PopoverContent,
} from "@material-tailwind/react";
import Loading from "../../cores/components/loading";
import { formatCurrency } from "../../helper/formatCurrency";
import { calculateDateShipping } from "../../helper/calculateDateShipping";
import {
	TruckIcon,
	ShieldCheckIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import ImageSlider from "./imageSlider";
import { formatPercentage } from "../../helper/formatPercentage";
import { getSettings } from "../../services/setting";
import { decodeToken } from "./../../helper/decodeToken";
import { toast } from "react-toastify";
import { addToCart } from "../../services/cart";
import ConfirmLogin from "./../../cores/components/confirmLogin";
import BuyNowButton from "./../../cores/components/buyNowButton";
import DescriptionDetail from "./descriptionDetail";
import { StatisticsChart } from "./chart";

const ProductDetail = () => {
	const { id } = useParams();
	const [images, setImages] = useState([]);
	const [product, setProduct] = useState({});
	const [price, setPrice] = useState(0);
	const [loading, setLoading] = useState(false);
	const [guarantee, setGuarantee] = useState(1);
	const [guaranteeCondition, setGuaranteeCondition] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [descriptionModal, setDescriptionModal] = useState(false);

	const currentUrl = window.location.href;
	const urlParts = currentUrl.split("/");
	const productId = urlParts[urlParts.length - 1].split("%7C").join("|");

	const handleOpenModal = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOpenDescriptionModal = () => {
		setDescriptionModal((prev) => !prev);
	};

	const handleAddToCart = async () => {
		try {
			const token = localStorage.getItem("token");
			if (token) {
				const useId = decodeToken(token).sub;
				const body = {
					userId: useId,
					productId: productId,
					quantity: 1,
					totalPrice: product.price.value,
					warrantyFee: price - product.price.value,
				};
				const response = await addToCart(body);
				if (response.status === 201) {
					toast.success("Thêm sản phẩm thành công");
				} else {
					toast.error("Thêm sản phẩm thất bại");
				}
			} else {
				setIsOpen(true);
			}
		} catch (error) {
			toast.error("Có lỗi khi thêm sản phẩm");
		}
	};

	const handleChangeGuarantee = (duration, fee, itemPrice) => {
		setGuarantee(duration);
		setPrice(
			parseInt(fee) !== 0 ? (fee / 100) * itemPrice + itemPrice : itemPrice
		);
	};

	useEffect(() => {
		const getSettingsData = async () => {
			try {
				const response = await getSettings();
				setGuaranteeCondition(response.data.warrantyFees);
			} catch (error) {
				console.log("Got error");
			}
		};
		getSettingsData();
	}, []);

	useEffect(() => {
		const getDetailData = async () => {
			setLoading(true);
			try {
				const response = await getProduct(id);
				setProduct(response.data);
				const combinedImages = [
					{
						imageUrl: response.data.image.imageUrl,
						width: response.data.image.width,
						height: response.data.image.height,
					},
					...(response.data.additionalImages || []),
				];
				setImages(combinedImages);
				setPrice(response.data.price[response.data.price.length - 1].value);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		getDetailData();
	}, [id]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<div className="flex flex-col md:flex-row gap-5">
					<div className="w-full md:w-1/2">
						<ImageSlider images={images} />
					</div>
					<div className="flex flex-col justify-between md:w-1/2 gap-2 h-fit">
						<div className="flex gap-2">
							<div className="text-lg px-3 py-1 border border-red-900 text-red-900 font-bold rounded">
								{product.condition}
							</div>
							{product.marketingPrice && (
								<div className="text-lg px-3 py-1 border border-red-900 bg-red-900 text-white font-bold rounded">
									Flash Sale
								</div>
							)}
						</div>

						<h1 className="font-bold text-blue-gray-900 sm:text-3xl text-lg text-justify">
							{product.title}
						</h1>
						<div className="flex gap-2">
							<p className="uppercase font-semibold">Hãng:</p>
							<p className="font-bold text-white px-2 bg-blue-800 rounded">
								{product.brand}
							</p>
						</div>
						<div className="flex gap-2 items-center">
							<p className="font-bold text-red-900 text-3xl">
								{formatCurrency(price)}
							</p>
							{product.marketingPrice && (
								<del className="font-bold text-gray-500 line-through">
									{formatCurrency(product.marketingPrice.originalPrice?.value)}
								</del>
							)}
							{product.marketingPrice && (
								<p className="font-bold text-gray-500 line-through">
									({formatPercentage(product.marketingPrice.discountPercentage)}
									%)
								</p>
							)}
						</div>
						<div className="flex gap-2 items-center">
							<Popover placement="bottom-start">
								<PopoverHandler>
									<Button variant="outlined">Xem lịch sử giá</Button>
								</PopoverHandler>
								<PopoverContent className=" text-white shadow-md border-gray-900 shadow-gray-900/10">
									<StatisticsChart chart={product?.price} />
								</PopoverContent>
							</Popover>
							<div className="flex items-center">
								{product.localizedAspects && (
									<div>
										<Button
											variant="outlined"
											onClick={handleOpenDescriptionModal}
										>
											Thông tin sản phẩm
										</Button>
										<DescriptionDetail
											localizedAspects={product.localizedAspects}
											shortDescription={product.shortDescription}
											isOpen={descriptionModal}
											closeModal={() => handleOpenDescriptionModal()}
										/>
									</div>
								)}
							</div>
						</div>

						<div>
							<div className="flex gap-2 items-center">
								<TruckIcon className="w-6 h-6" />
								<p className="text-base font-bold">Thời gian giao hàng</p>
							</div>
							<div>
								Thời gian hàng dự kiến: <b>{calculateDateShipping()}</b>
							</div>
						</div>
						<div className="flex gap-2 items-center">
							<ShieldCheckIcon className="w-6 h-6" />
							<p className="text-base font-bold">
								Chính sách bảo hành và cam kết
							</p>
						</div>
						<div className="flex flex-col gap-2">
							<p>
								Máy được <b>Bảo hành {guarantee} tháng</b> (tính từ ngày Khách
								Hàng nhận được máy). Khách có thể chọn mua thêm bảo hành khi
								nhận máy.
							</p>
							<div className="flex w-full gap-5">
								{guaranteeCondition.map((item, index) => (
									<Button
										className="w-1/3"
										variant={
											item.duration === guarantee ? "filled" : "outlined"
										}
										key={index}
										onClick={() =>
											handleChangeGuarantee(
												item.duration,
												item.fee,
												product.price[product.price.length - 1].value
											)
										}
									>
										<p
											className={`font-semibold text-center ${
												item.duration === guarantee ? "text-white" : ""
											}`}
										>
											Bảo hành {item.duration} tháng
										</p>
										<p
											className={`text-center ${
												item.duration === guarantee ? "text-white" : ""
											}`}
										>
											{formatCurrency(
												(item.fee / 100) *
													product?.price[product.price.length - 1].value
											)}
										</p>
									</Button>
								))}
							</div>
						</div>
						<div className="flex gap-5">
							<div className="flex w-1/2">
								<Button
									onClick={() => handleAddToCart()}
									className="w-[99%] flex gap-2 justify-center items-center"
									variant="outlined"
								>
									<ShoppingCartIcon className="w-6 h-6" /> Thêm vào giỏ
								</Button>
								<ConfirmLogin isOpen={isOpen} closeModal={handleOpenModal} />
							</div>
							<div className="w-1/2">
								<BuyNowButton
									productId={productId}
									productPrice={product.price ? product.price.value : 0}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductDetail;
