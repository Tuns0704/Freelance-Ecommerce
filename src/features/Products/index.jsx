import { filterPriceOptions } from "../../constant/filter";
import { formatCurrency } from "./../../helper/formatCurrency";
import CardItem from "./cardItem";

const products = [
	{
		id: 1812381,
		name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
		price: 5000000,
		originPrice: 47000000,
		img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
	},
	{
		id: 1812381,
		name: "AKG N5005 Reference Class 5-driver Configuration In-Ear Headphones",
		price: 5000000,
		originPrice: 47000000,
		img: "https://i.ebayimg.com/images/g/y0gAAOSw8qtlaYLv/s-l500.png",
	},
];

const Products = () => {
	return (
		<section className="flex gap-2">
			<aside className="px-3 py-2 border w-1/4 flex flex-col gap-2">
				<div className="border-b">
					<div className="font-semibold">Trạng thái</div>
					<label>
						<input type="checkbox" className="mr-2" />
						Còn hàng
					</label>
				</div>
				<div className="border-b">
					<div className="font-semibold">Giá tốt</div>
					<label>
						<input type="checkbox" className="mr-2" />
						Giá Tốt Hôm Nay
					</label>
				</div>
				<div className="border-b">
					<div className="font-semibold">Giá sản phẩm</div>
					<div className="flex flex-col gap-1">
						{filterPriceOptions.map((option, index) => (
							<label key={index} className="flex">
								<input type="checkbox" className="mr-2" />
								<p className=" text-base">
									{formatCurrency(option.from)} - {formatCurrency(option.to)}
								</p>
							</label>
						))}
					</div>
				</div>
				<div className="border-b">
					<div className="font-semibold">Trạng thái</div>
					<label>
						<input type="checkbox" className="mr-2" />
						Còn hàng
					</label>
				</div>
			</aside>
			<div className="flex flex-col w-5/6">
				<div className="flex flex-col gap-4">
					{products.map((product) => (
						<CardItem key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Products;
