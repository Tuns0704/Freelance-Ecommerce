import { PropTypes } from "prop-types";

const CardItem = ({ cart }) => {
	return (
		<div className="rounded-xl relative border-2 border-gray-200 p-2 grid grid-cols-12">
			<div className="col-span-12 lg:col-span-2 flex justify-center">
				<img
					src={cart.product.thumbnailImages[0].imageUrl}
					alt="speaker image"
					className="w-[180px] max-lg:h-full object-contain self-center"
				/>
			</div>
			<div className="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
				<div className="flex items-center justify-between w-full mb-4">
					<h5 className="font-bold text-lg leading-9 text-gray-900">
						{cart.product.name}
					</h5>
				</div>
				<div className="px-3 py-1 border border-red-900 w-fit rounded-md font-semibold text-red-900 mb-4">
					Số lượng: {cart.quantity}
				</div>
				<div className="flex justify-between items-center">
					<div className="flex"></div>
					<h6 className="text-red-900 font-manrope font-bold text-2xl leading-9 text-right"></h6>
				</div>
			</div>
		</div>
	);
};

CardItem.propTypes = {
	cart: PropTypes.object,
	reload: PropTypes.func,
	updateQuantity: PropTypes.func,
};

export default CardItem;
