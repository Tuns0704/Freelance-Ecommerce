import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListProduct } from "../../services/product";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import Loading from "../../cores/components/loading";
import Pagination from "./pagination";
import CardItem from "./cardItem";
import FilterOption from "./filter";
import { getListCategory } from "./../../services/category";

const Products = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	const page = searchParams.get("page");

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const handleClick = (pageNumber) => {
		setSearchParams((prev) => {
			prev.set("page", pageNumber);
			return prev;
		});
	};

	const getItemProps = (index) => ({
		variant: parseInt(page) === index ? "filled" : "text",
		className: parseInt(page) === index ? "bg-gray-900 text-white" : "",
		onClick: () => handleClick(index),
	});

	const totalPages = Math.ceil(totalProducts / 20);

	useEffect(() => {
		const getCategories = async () => {
			try {
				setLoading(true);
				const response = await getListCategory();
				setCategories(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		};
		getCategories();
	}, []);

	useEffect(() => {
		const getData = async () => {
			try {
				setLoading(true);
				const { data } = await getListProduct(searchParams);
				setProducts(data.data);
				setTotalProducts(data.totalCount);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		getData();
	}, [searchParams]);

	return (
		<section className="flex flex-col md:flex-row gap-2 w-full">
			<>
				<FilterOption
					isOpen={isOpen}
					closeModal={closeModal}
					setSearchParams={setSearchParams}
					categories={categories}
				/>
				<div className="flex flex-col sm:w-full md:w-5/6">
					<div className="flex items-center gap-2">
						<Button
							className="w-fit p-2 rounded-md"
							variant="outlined"
							onClick={openModal}
						>
							<AdjustmentsHorizontalIcon className="h-5 w-5" />
						</Button>
						<p className="font-medium">Tổng số sản phẩm: {totalProducts}</p>
					</div>
					{loading ? (
						<Loading />
					) : (
						<>
							<div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between md:justify-normal">
								{products.map((product) => (
									<CardItem key={product.id} product={product} />
								))}
							</div>
							<Pagination
								handleClick={handleClick}
								page={page}
								totalPages={totalPages}
								getItemProps={getItemProps}
							/>
						</>
					)}
				</div>
			</>
		</section>
	);
};

export default Products;
