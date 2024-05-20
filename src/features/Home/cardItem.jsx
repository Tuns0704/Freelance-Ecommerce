import { formatPercentage } from "./../../helper/formatPercentage";
import { formatCurrency } from "./../../helper/formatCurrency";
import AddToCartButton from "./../../cores/components/addToCart";
import { useNavigate } from "react-router-dom";
import { PropTypes } from "prop-types";

const CardItem = ({ product }) => {
	const navigate = useNavigate();

	const handleNavigateToDetail = (id) => {
		navigate(`/product-detail/${id}`);
	};

	return (
		<div className="group flex w-full relative flex-col gap-2 bg-white shadow-md p-5 rounded-lg hover:cursor-pointer">
			<label className="absolute px-2 rounded top-[-5px] z-40 left-[-5px] bg-red-900 text-white font-bold py-1">
				Giảm {formatPercentage(product.marketingPrice.discountPercentage)}%
			</label>
			<img
				src={product?.thumbnailImages?.[0]?.imageUrl}
				onClick={() => handleNavigateToDetail(product.id)}
				alt="products"
				className="w-full object-contain h-48 scale-100 group-hover:scale-105 transition-all duration-500 ease-in-out rounded-lg"
			/>
			<h4
				onClick={() => handleNavigateToDetail(product.id)}
				className="group-hover:text-blue-600 pt-5 min-h-[100px] font-semibold text-sm text-gray-800"
			>
				{product?.name}
			</h4>
			<section className="flex justify-start items-center gap-2">
				<h2 className="text-2xl font-bold">
					{formatCurrency(product.price[0].value)}
				</h2>
				<del className="text-gray-500 text-sm">
					{formatCurrency(product.marketingPrice.originalPrice.value)}
				</del>
			</section>
			<i className="font-medium text-sm">
				Giá tốt nhất: <b>{formatCurrency(product.price[0].value)}</b>
			</i>
			<AddToCartButton
				productId={product.id}
				productPrice={product.price[0].value}
			/>
		</div>
	);
};

CardItem.propTypes = {
	product: PropTypes.object,
};

export default CardItem;
