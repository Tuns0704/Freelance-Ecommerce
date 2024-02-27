import { Button } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { PhoneIcon, HeartIcon } from "@heroicons/react/24/outline";
import { calculateDateShipping } from "./../../helper/calculateDateShipping";

const CardItem = ({ product }) => {
	return (
		<div className="flex flex-col sm:w-[49%] mb-4 md:w-full md:flex-row gap-3 rounded-md p-2 shadow">
			<img
				src={product.thumbnailImages?.[0]?.imageUrl}
				className="md:w-40 h-40 object-cover rounded-lg hover:scale-105 transition-all duration-300"
			/>
			<div className="flex flex-col gap-2 lg:w-3/5">
				<h1 className="font-bold text-base h-12 overflow-clip">
					{product.name}
				</h1>
				<p className="text-sm">
					<b>Model:</b> ASUS <b>SKU:</b> 134443717636
				</p>
				<p className="text-sm">
					<b>Giao hàng:</b> Thời gian giao hàng dự kiến{" "}
					{calculateDateShipping()}
				</p>
				<Button
					variant="outlined"
					className="flex w-fit py-2 px-3 justify-center items-center gap-2"
				>
					<HeartIcon className="w-5 h-5" />
					Quan tâm
				</Button>
			</div>
			<div className="md:w-2/6 flex flex-col gap-1">
				<div className="px-3 py-1 w-fit bg-red-900 rounded-md text-xs font-bold text-white">
					Giảm 35%
				</div>
				<h1 className="text-lg font-bold">7.018.000 ₫</h1>
				<p className="text-sm">
					Giá tốt nhất: <b>7.018.000 ₫</b>
				</p>
				<i className="text-sm text-gray-700">Lần cập nhật cuối: 26/01/2024</i>
				<Button className="flex py-2 justify-center items-center gap-2">
					<PhoneIcon className="w-5 h-5" />
					Liên hệ
				</Button>
				<div className="flex gap-2 items-center">
					<img src="/img/ebay.png" className="w-12 h-12" alt="ebaylogo" />
					<p className="text-sm">
						Người bán: <b>{product.seller.username}</b>
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
