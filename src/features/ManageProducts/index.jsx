import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getListProduct } from "../../services/product";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button } from "@material-tailwind/react";
import Loading from "../../cores/components/loading";
import Pagination from "../../cores/components/pagination";
import FilterOption from "../../cores/components/filter";
import { getListCategory } from "../../services/category";
import CardItem from "./cardItem";

const ManageProducts = () => {
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
		<section className="flex flex-col md:flex-row-reverse gap-2 w-full">
			<div className="flex flex-col sm:w-full md:w-4/6 xl:w-5/6">
				<div className="flex items-center gap-2 mb-5">
					<Button
						className="w-fit p-2 rounded-md md:hidden"
						variant="outlined"
						onClick={openModal}
					>
						<AdjustmentsHorizontalIcon className="h-5 w-5" />
					</Button>
					<p className="font-semibold text-lg">
						Tổng số sản phẩm: {totalProducts}
					</p>
				</div>
				{loading ? (
					<Loading />
				) : (
					<>
						<div className="relative overflow-x-auto">
							<table className="w-full p-5 rounded-t-lg bg-white shadow text-left rtl:text-right">
								<thead>
									<tr className="border-b border-blue-gray-50">
										<th className="px-5 py-2 border-r">Id</th>
										<th className="px-5 py-2 border-r">Ảnh</th>
										<th className="px-5 py-2 border-r">Tên sản phẩm</th>
										<th className="px-5 py-2 border-r">Giá sản phẩm</th>
										<th className="px-5 py-2 border-r">Danh mục</th>
										<th className="px-5 py-2 "></th>
									</tr>
								</thead>
								<tbody>
									{products.map((product) => (
										<CardItem product={product} key={product.id} />
									))}
								</tbody>
							</table>
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
			<FilterOption
				isOpen={isOpen}
				closeModal={closeModal}
				searchParams={searchParams}
				setSearchParams={setSearchParams}
				categories={categories}
			/>
		</section>
	);
};

export default ManageProducts;
