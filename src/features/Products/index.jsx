import { getListProduct } from "../../services/product";
import CardItem from "./cardItem";
import FilterOption from "./filter";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Products = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);

	const closeModal = () => {
		setIsOpen(false);
	};

	const openModal = () => {
		setIsOpen(true);
	};

	const getItemProps = (index) => ({
		variant: page === index ? "filled" : "text",
		color: "gray",
		onClick: () => setPage(index),
	});

	const next = () => {
		if (page === 5) return;
		setPage(page + 1);
	};

	const prev = () => {
		if (page === 1) return;
		setPage(page - 1);
	};

	const calcuteTotalPage = (total, size) => {
		setTotalPage(Math.ceil(total / size));
	};

	const getData = useCallback(async () => {
		try {
			const response = await getListProduct(page);
			setProducts(response.data.data);
			setTotalProducts(response.data.totalCount);
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	}, [page]);

	useEffect(() => {
		getData();
	}, [getData, page]);

	return (
		<section className="flex flex-col md:flex-row gap-2 w-full">
			<FilterOption isOpen={isOpen} closeModal={closeModal} />
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
				<div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between md:justify-normal">
					{products.map((product) => (
						<CardItem key={product.id} product={product} />
					))}
				</div>
				<div className="flex items-center justify-center mt-5 gap-4">
					<Button
						variant="text"
						className="flex items-center gap-2"
						onClick={prev}
						disabled={page === 1}
					>
						<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
					</Button>
					<div className="flex items-center gap-2">
						<IconButton {...getItemProps(1)}>1</IconButton>
						<IconButton {...getItemProps(2)}>2</IconButton>
						<IconButton {...getItemProps(3)}>3</IconButton>
						<IconButton {...getItemProps(4)}>4</IconButton>
						<IconButton {...getItemProps(5)}>5</IconButton>
					</div>
					<Button
						variant="text"
						className="flex items-center gap-2"
						onClick={next}
						disabled={page === 5}
					>
						Next
						<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Products;
