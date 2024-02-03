import { getListProduct } from "../../services/product";
import CardItem from "./cardItem";
import FilterOption from "./filter";
import { useCallback, useEffect, useState } from "react";

const Products = () => {
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);

	const getData = useCallback(async () => {
		try {
			const response = await getListProduct(page);
			setProducts(response.data.data);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}, [page]);

	useEffect(() => {
		getData();
	}, [page, getData]);

	const handlePageChange = (page) => {
		setPage(page);
	};

	return (
		<section className="flex flex-col md:flex-row gap-2 w-full">
			<FilterOption />
			<div className="flex flex-col sm:w-full md:w-5/6">
				<div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between md:justify-normal">
					{products.map((product) => (
						<CardItem key={product.id} product={product} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Products;
