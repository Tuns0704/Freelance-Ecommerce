import { getListProduct } from "../../services/product";
import CardItem from "./cardItem";
import FilterOption from "./filter";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button, IconButton } from "@material-tailwind/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import Loading from "../../cores/components/loading";

const Products = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
	const page = searchParams.get("page");
	const [loading, setLoading] = useState(false);

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

	const renderPaginationButtons = () => {
		const buttons = [];
		const maxVisibleButtons = 5;
		const start = Math.max(
			1,
			Math.min(
				page - Math.floor(maxVisibleButtons / 2),
				totalPages - maxVisibleButtons + 1
			)
		);
		const end = Math.min(start + maxVisibleButtons - 1, totalPages);

		for (let i = start; i <= end; i++) {
			buttons.push(
				<IconButton
					key={i}
					className={page === i ? "bg-gray-900 text-white" : ""}
					{...getItemProps(i)}
				>
					{i}
				</IconButton>
			);
		}

		if (start > 1) {
			buttons.unshift(
				<IconButton className="md:flex xxs:hidden" key="prevEllipsis" disabled>
					...
				</IconButton>
			);
		}

		if (end < totalPages) {
			buttons.push(
				<IconButton className="md:flex xxs:hidden" key="nextEllipsis" disabled>
					...
				</IconButton>
			);
		}

		return buttons;
	};

	const getData = useCallback(async () => {
		try {
			setLoading(true);
			const { data } = await getListProduct(page);
			setProducts(data.data);
			setTotalProducts(data.totalCount);
			setLoading(false);
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
					{loading ? (
						<Loading />
					) : (
						products.map((product) => (
							<CardItem key={product.id} product={product} />
						))
					)}
				</div>
				<div className="flex items-center justify-center mt-5 gap-4">
					<Button
						variant="text"
						className="flex items-center gap-2"
						onClick={() => handleClick(Math.max(page - 1, 1))}
						disabled={page === 1}
					>
						<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
					</Button>
					<div className="flex items-center gap-2">
						{renderPaginationButtons()}
					</div>
					<Button
						variant="text"
						className="flex items-center gap-2"
						onClick={() => handleClick(Math.min(page + 1, totalPages))}
						disabled={page === totalPages}
					>
						<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</section>
	);
};

export default Products;
