/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { Button, Select, Option } from "@material-tailwind/react";
import Loading from "@components/loading";
import Pagination from "@components/pagination";
import CardItem from "./cardItem";
import FilterOption from "@components/filter";
import { getListProduct } from "@services/product";
import { getListCategory } from "@services/category";
import { toast } from "react-toastify";
import { setValueSort } from "@helper/handleGetSort";

const sortOptions = [
	{ value: "", sortField: "", sortDirection: "", label: "Mặc định" },
	{
		value: "priceDesc",
		sortField: "price",
		sortDirection: "descend",
		label: "Giá giảm dần",
	},
	{
		value: "priceAsc",
		sortField: "price",
		sortDirection: "ascend",
		label: "Giá tăng dần",
	},
	{
		value: "createAtDesc",
		sortField: "createAt",
		sortDirection: "descend",
		label: "Sản phẩm mới đến cũ",
	},
	{
		value: "createAtAsc",
		sortField: "createAt",
		sortDirection: "ascend",
		label: "Sản phẩm cũ đến mới",
	},
];

const Products = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState([]);
	const [totalProducts, setTotalProducts] = useState(0);
	const [loading, setLoading] = useState(false);
	const [categories, setCategories] = useState([]);
	const [seletedOption, setSelectedOption] = useState("");
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
				toast.error("Lấy sản phẩm");
			}
		};
		getData();
	}, [searchParams]);

	useEffect(() => {
		setSearchParams((prev) => {
			prev.set("page", 1);
			return prev;
		});
	}, [totalPages]);

	const handleChangeSortOption = (option) => {
		if (option.value !== "") {
			setSearchParams((prev) => {
				prev.set("sortField", option.sortField);
				prev.set("sortDirection", option.sortDirection);
				return prev;
			});
		} else {
			setSearchParams((prev) => {
				prev.delete("sortField");
				prev.delete("sortDirection");
				return prev;
			});
		}
	};

	useEffect(() => {
		setValueSort({
			searchParams,
			setSelectedOption,
		});
	}, []);

	return (
		<section className="flex flex-col md:flex-row-reverse gap-2 w-full">
			<div className="flex flex-col md:w-full">
				<div className="flex flex-row items-center justify-between gap-2 mb-5">
					<div className="flex items-center gap-2">
						<Button
							className="w-fit p-2 rounded-md md:hidden"
							variant="outlined"
							onClick={openModal}
						>
							<AdjustmentsHorizontalIcon className="h-5 w-5" />
						</Button>
						<div className="hidden md:block text-lg">
							<b>Tổng số sản phẩm: </b> {totalProducts}
						</div>
					</div>

					<div className="flex md:w-fit items-center gap-2">
						<div className="relative">
							<Select
								label="Sắp xếp"
								placeholder="Sắp xếp theo..."
								value={seletedOption}
								onChange={(e) => setSelectedOption(e.target.value)}
							>
								{sortOptions.map((option, index) => (
									<Option
										onClick={() => handleChangeSortOption(option)}
										key={index}
										value={option.value}
									>
										{option.label}
									</Option>
								))}
							</Select>
						</div>
					</div>
				</div>
				{loading ? (
					<Loading />
				) : (
					<>
						<div className="md:hidden text-lg">
							<b>Tổng số sản phẩm: </b> {totalProducts}
						</div>

						<div className="flex flex-col sm:flex-row gap-5 sm:flex-wrap sm:justify-between md:justify-normal">
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
			<div className="md:w-[35%] lg:w-[25%]">
				<FilterOption
					isOpen={isOpen}
					closeModal={closeModal}
					searchParams={searchParams}
					setSearchParams={setSearchParams}
					categories={categories}
				/>
			</div>
		</section>
	);
};

export default Products;
