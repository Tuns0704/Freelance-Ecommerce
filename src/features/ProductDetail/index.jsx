import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/product";
import { Button } from "@material-tailwind/react";
import Loading from "../../cores/components/loading";
import { formatCurrency } from "../../helper/formatCurrency";
import { calculateDateShipping } from "../../helper/calculateDateShipping";
import {
	TruckIcon,
	ShieldCheckIcon,
	ShoppingCartIcon,
	CreditCardIcon,
} from "@heroicons/react/24/outline";
import ImageSlider from "./imageSlider";
import { formatPercentage } from "../../helper/formatPercentage";

const guaranteeCondition = [
	{
		time: 3,
		price: 0,
	},
	{
		time: 6,
		price: 990000,
	},
	{
		time: 12,
		price: 1420000,
	},
];

const ProductDetail = () => {
	const { id } = useParams();
	const [images, setImages] = useState([]);
	// const [isOpen, setIsOpen] = useState(false);
	const [product, setProduct] = useState({});
	const [price, setPrice] = useState(0);
	const [loading, setLoading] = useState(false);
	const [guarantee, setGuarantee] = useState(3);

	const handleChangeGuarantee = (time, guaranteePrice, itemPrice) => {
		setGuarantee(time);
		setPrice(itemPrice + guaranteePrice);
	};

	// const closeModal = () => {
	// 	setIsOpen(false);
	// };

	// const openModal = () => {
	// 	setIsOpen(true);
	// };

	useEffect(() => {
		const getDetailData = async () => {
			setLoading(true);
			try {
				const response = await getProduct(id);
				setProduct(response.data);
				console.log(response.data);
				const combinedImages = [
					{
						imageUrl: response.data.image.imageUrl,
						width: response.data.image.width,
						height: response.data.image.height,
					},
					...(response.data.additionalImages || []),
				];
				setImages(combinedImages);
				setPrice(response.data.price.value);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		getDetailData();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="flex flex-col md:flex-row gap-5">
			<div className="w-full md:w-1/2 self-center">
				<ImageSlider images={images} />
			</div>
			<div className="flex flex-col gap-3">
				<div className="flex gap-2">
					{product.marketingPrice && (
						<div className="text-lg px-3 py-1 border border-red-900 bg-red-900 text-white font-bold rounded">
							Flash Sale
						</div>
					)}
					<div className="text-lg px-3 py-1 border border-red-900 text-red-900 font-bold rounded">
						{product.condition}
					</div>
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
				<div>
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
								({formatPercentage(product.marketingPrice.discountPercentage)}%)
							</p>
						)}
					</div>
					<p className="font-semibold">
						Giá nhìn thấy là giá về tay (đã bao gồm toàn bộ thuế + phí ship)
					</p>
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
					<p className="text-base font-bold">Chính sách bảo hành và cam kết</p>
				</div>
				<div className="flex flex-col gap-2">
					<p>
						Máy được <b>Bảo hành {guarantee} tháng</b> (tính từ ngày Khách Hàng
						nhận được máy). Khách có thể chọn mua thêm bảo hành khi nhận máy.
					</p>
					<div className="flex w-full gap-5">
						{guaranteeCondition.map((item, index) => (
							<Button
								className="w-1/3"
								variant={item.time === guarantee ? "filled" : "outlined"}
								key={index}
								onClick={() =>
									handleChangeGuarantee(
										item.time,
										item.price,
										product.price.value
									)
								}
							>
								<p
									className={`font-semibold text-center ${
										item.time === guarantee ? "text-white" : ""
									}`}
								>
									Bảo hành {item.time} tháng
								</p>
								<p
									className={`text-center ${
										item.time === guarantee ? "text-white" : ""
									}`}
								>
									{formatCurrency(item.price)}
								</p>
							</Button>
						))}
					</div>
				</div>
				<p className="text-justify">
					<b>Mô tả:</b> {product.shortDescription}
				</p>
				<div className="flex gap-5">
					<Button
						className="w-1/2 flex gap-2 justify-center items-center"
						variant="outlined"
					>
						<ShoppingCartIcon className="w-6 h-6" /> Thêm vào giỏ
					</Button>
					<Button
						className="w-1/2 flex gap-2 justify-center items-center"
						variant="filled"
					>
						<CreditCardIcon className="w-6 h-6" />
						Đặt hàng ngay
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetail;
