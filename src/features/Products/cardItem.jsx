import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";

import { formatPercentage } from "@helper/formatPercentage";
import { calculateDateShipping } from "@helper/calculateDateShipping";
import { formatCurrency } from "@helper/formatCurrency";
import { formatDate } from "@helper/formatDate";
import AddToCartButton from "@components/addToCart";
import BuyNowButton from "@components/buyNowButton";

const CardItem = ({ product }) => {
	const navigate = useNavigate();

	const handleNavigateToDetail = () => {
		navigate(`/product-detail/${product.id}`);
	};

	return (
		<div className="group flex flex-col sm:w-[48%] md:w-full lg:flex-row justify-between gap-3 rounded-md p-3 shadow-md bg-white">
			<div className="lg:w-4/6 flex flex-col md:flex-row gap-3 lg:gap-5">
				<img
					onClick={handleNavigateToDetail}
					src={product.additionalImages}
					className="md:min-w-[180px] md:max-w-[180px] h-[220px] object-cover rounded-lg group-hover:scale-105 transition-all duration-300 group-hover:cursor-pointer"
				/>
				<div className="flex flex-col gap-2 lg:w-4/6">
					<h1
						onClick={handleNavigateToDetail}
						className="font-bold text-base h-12 text-justify overflow-clip group-hover:text-blue-600 group-hover:cursor-pointer"
					>
						{product.name}
					</h1>
					<div className="flex flex-col gap-2">
						<p className="text-sm">
							<b>Danh mục:</b> {product.category.vietnameseName}
						</p>
						<div className="flex gap-2">
							{product.marketingPrice && (
								<div className="flex items-center px-3 py-2 w-fit bg-red-900 rounded-md text-xs font-bold text-white">
									Giảm{" "}
									{formatPercentage(product.marketingPrice.discountPercentage)}%
								</div>
							)}
							<div className="flex gap-2">
								<div className="flex items-center px-3 py-2 w-fit bg-white rounded-md text-xs font-bold text-red-900 border border-red-900">
									{product.conditionOrder}
								</div>
								<div className="flex items-center px-3 py-2 w-fit bg-white rounded-md text-xs font-bold text-red-900 border border-red-900">
									{product.condition}
								</div>
							</div>
						</div>

						<p className="text-sm">
							<b>Giao hàng:</b> Thời gian giao hàng dự kiến{" "}
							{calculateDateShipping()}
						</p>
						<div className="flex gap-2 items-center">
							<img
								src="/img/ebay.png"
								className="w-12 h-12 border rounded-lg border-blue-gray-900"
								alt="ebaylogo"
							/>
							<p className="text-sm">
								Người bán: <b>{product.storeName || "None"}</b>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div className="lg:w-2/6 flex flex-col justify-between">
				<div className="flex flex-col gap-1 mb-2">
					<h1 className="text-2xl font-bold text-red-900">
						{formatCurrency(product.price[product.price.length - 1].value)}
					</h1>
					<p className="text-sm">
						Giá tốt nhất:{" "}
						<b>
							{formatCurrency(product.price[product.price.length - 1].value)}
						</b>
					</p>
					<i className="text-sm text-gray-700">
						Lần cập nhật cuối:{" "}
						{formatDate(product.price[product.price.length - 1].lastUpdated)}
					</i>
				</div>
				<div className="flex flex-col md:flex-row lg:flex-col gap-2 w-full">
					<AddToCartButton
						className="w-1/2"
						productId={product.id}
						productPrice={product.price[product.price.length - 1].value}
						warrantyFee={0}
					/>
					<BuyNowButton
						className="w-1/2"
						productId={product.id}
						productPrice={product.price[product.price.length - 1].value}
					/>
				</div>
			</div>
		</div>
	);
};

CardItem.propTypes = {
	product: PropTypes.object,
};

export default CardItem;
