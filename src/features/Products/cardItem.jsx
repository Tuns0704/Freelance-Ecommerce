import { PropTypes } from "prop-types";
import { calculateDateShipping } from "../../helper/calculateDateShipping";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../helper/formatCurrency";
import { formatDate } from "../../helper/formatDate";
import { formatPercentage } from "../../helper/formatPercentage";
import AddToCartButton from "./../../cores/components/addToCart";

const CardItem = ({ product }) => {
	const navigate = useNavigate();

	const handleNavigateToDetail = () => {
		navigate(`/product-detail/${product.id}`);
	};

	return (
		<div className="flex flex-col sm:w-[49%] mb-4 md:w-full md:flex-row gap-3 rounded-md p-2 shadow">
			<img
				onClick={handleNavigateToDetail}
				src={product.thumbnailImages?.[0]?.imageUrl}
				className="md:w-40 h-40 object-contain rounded-lg hover:scale-105 transition-all duration-300 hover:cursor-pointer"
			/>
			<div className="flex flex-col gap-2 lg:w-3/5">
				<h1
					onClick={handleNavigateToDetail}
					className="font-bold text-base h-12 overflow-clip hover:cursor-pointer"
				>
					{product.name}
				</h1>
				<p className="text-sm">
					<b>Danh mục:</b> {product.category.vietnameseName}
				</p>
				<p className="text-sm">
					<b>Giao hàng:</b> Thời gian giao hàng dự kiến{" "}
					{calculateDateShipping()}
				</p>
				<div className="w-2/5">
					<AddToCartButton
						productId={product.id}
						productPrice={product.price[0].value}
					/>
				</div>
			</div>
			<div className="md:w-2/6 flex flex-col gap-1">
				<div className="flex gap-2">
					{product.marketingPrice && (
						<div className="flex items-center px-3 py-2 w-fit bg-red-900 rounded-md text-xs font-bold text-white">
							Giảm {formatPercentage(product.marketingPrice.discountPercentage)}
							%
						</div>
					)}
					<div className="flex items-center px-3 py-2 w-fit bg-white rounded-md text-xs font-bold text-red-900 border border-red-900">
						{product.condition}
					</div>
				</div>

				<h1 className="text-lg font-bold">
					{formatCurrency(product.price[0].value)}
				</h1>
				<p className="text-sm">
					Giá tốt nhất: <b>{formatCurrency(product.price[0].value)}</b>
				</p>
				<i className="text-sm text-gray-700">
					Lần cập nhật cuối: {formatDate(product.price[0].lastUpdated)}
				</i>
				<AddToCartButton
					productId={product.id}
					productPrice={product.price[0].value}
				/>
				<div className="flex gap-2 items-center">
					<img src="/img/ebay.png" className="w-12 h-12" alt="ebaylogo" />
					<p className="text-sm">
						Người bán: <b>{product?.seller?.username}</b>
					</p>
				</div>
			</div>
		</div>
	);
};

CardItem.propTypes = {
	product: PropTypes.object,
};

export default CardItem;
