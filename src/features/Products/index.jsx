import CardItem from "./cardItem";
import FilterOption from "./filter";

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
		<section className="flex flex-col md:flex-row gap-2 w-full">
			<FilterOption />
			<div className="flex flex-col sm:w-full md:w-5/6">
				<div className="flex flex-col md:flex-row md:flex-wrap gap-4">
					{products.map((product) => (
						<CardItem key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Products;
