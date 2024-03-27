import { formatCurrency } from "./../../helper/formatCurrency";
import { filterPriceOptions } from "./../../constant/filter";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { IconButton, Radio } from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

const RenderFilter = ({ categories, setSearchParams, searchParams }) => {
	const [marketingPrice, setMarketingPrice] = useState({
		isChecked: false,
		value: false,
	});

	const [productPrice, setProductPrice] = useState({
		isChecked: false,
		value: {
			minPrice: 0,
			maxPrice: 0,
		},
	});

	const [productCategory, setProductCategory] = useState({
		isChecked: false,
		value: "",
	});

	const handleSelectMarketingPrice = () => {
		setMarketingPrice({
			isChecked: !marketingPrice.isChecked,
			value: !marketingPrice.isChecked,
		});
	};

	const handleChangeCategory = (category) => {
		productCategory.value === category && productCategory.value === category
			? setProductCategory({ isChecked: false, value: "" })
			: setProductCategory({ isChecked: true, value: category });
	};

	const handleChangeProductPrice = (option) => {
		productPrice.value.minPrice === option.minPrice &&
		productPrice.value.maxPrice === option.maxPrice
			? setProductPrice({
					isChecked: false,
					value: { minPrice: 0, maxPrice: 0 },
			  })
			: setProductPrice({ isChecked: true, value: option });
	};

	useEffect(() => {
		const param = new URLSearchParams(searchParams);

		const handleInitFilter = () => {
			if (param.has("marketingPrice")) {
				setMarketingPrice({ isChecked: true, value: true });
			}
			if (param.has("minPrice") && param.has("maxPrice")) {
				setProductPrice({
					isChecked: true,
					value: {
						minPrice: parseInt(param.get("minPrice")),
						maxPrice: parseInt(param.get("maxPrice")),
					},
				});
			}
			if (param.has("category")) {
				setProductCategory({
					isChecked: true,
					value: param.get("category"),
				});
			}
		};
		handleInitFilter();
	}, []);

	useEffect(() => {
		const param = new URLSearchParams(searchParams);

		const handleFilter = () => {
			if (marketingPrice.isChecked) {
				setSearchParams((prev) => {
					prev.set("marketingPrice", marketingPrice.value);
					return prev;
				});
			}
			if (
				marketingPrice.isChecked === false &&
				marketingPrice.value !== param.has("marketingPrice")
			) {
				setSearchParams((prev) => {
					prev.delete("marketingPrice");
					return prev;
				});
			}
			if (
				productPrice.isChecked &&
				productPrice.value.minPrice !== param.get("minPrice") &&
				productPrice.value.maxPrice !== param.get("maxPrice")
			) {
				setSearchParams((prev) => {
					prev.set("minPrice", productPrice.value.minPrice);
					prev.set("maxPrice", productPrice.value.maxPrice);
					return prev;
				});
			}
			if (
				productPrice.isChecked === false &&
				param.has("minPrice") &&
				param.has("maxPrice")
			) {
				setSearchParams((prev) => {
					prev.delete("minPrice");
					prev.delete("maxPrice");
					return prev;
				});
			}
			if (
				productCategory.isChecked &&
				productCategory.value !== param.get("category")
			) {
				setSearchParams((prev) => {
					prev.set("category", productCategory.value);
					return prev;
				});
			}
			if (productCategory.isChecked === false && param.has("category")) {
				setSearchParams((prev) => {
					prev.delete("category");
					return prev;
				});
			}
		};
		handleFilter();
	}, [
		marketingPrice,
		productCategory,
		productPrice,
		searchParams,
		setSearchParams,
	]);

	return (
		<aside className="px-3 py-2 border md:w-full sm:flex flex-col gap-2">
			<div className="border-b">
				<div className="font-semibold">Giá tốt</div>
				<div className="flex">
					<Radio
						name="marketingPrice"
						onClick={handleSelectMarketingPrice}
						checked={marketingPrice.isChecked}
						onChange={() => ""}
						containerProps={{
							className: "py-2",
						}}
						label={
							<h1 className="text-blue-gray-900 font-medium">
								Giá tốt hôm nay
							</h1>
						}
					/>
				</div>
			</div>
			<div className="border-b">
				<div className="font-semibold">Giá sản phẩm</div>
				<div className="flex flex-col gap-1">
					{filterPriceOptions.map((option, index) => (
						<div key={index} className="flex">
							<Radio
								name="option"
								onClick={() => handleChangeProductPrice(option)}
								checked={
									productPrice.isChecked &&
									productPrice.value.maxPrice === option.maxPrice &&
									productPrice.value.minPrice === option.minPrice
								}
								onChange={() => ""}
								containerProps={{
									className: "py-2",
								}}
								label={
									<h1 className="text-blue-gray-900 font-medium">
										{formatCurrency(option.minPrice)} -{" "}
										{formatCurrency(option.maxPrice)}
									</h1>
								}
							/>
						</div>
					))}
				</div>
			</div>
			<div className="border-b">
				<div className="font-semibold">Danh mục</div>
				<div className="flex flex-col">
					{categories.map((item) => (
						<div key={item.id} className="flex">
							<Radio
								onClick={() => handleChangeCategory(item.englishName)}
								checked={
									productCategory.isChecked &&
									productCategory.value === item.englishName
								}
								onChange={() => ""}
								name="category"
								containerProps={{
									className: "py-2",
								}}
								label={
									<h1 className="text-blue-gray-900 font-medium">
										{item.vietnameseName}
									</h1>
								}
							/>
						</div>
					))}
				</div>
			</div>
		</aside>
	);
};

RenderFilter.propTypes = {
	categories: PropTypes.array,
	setSearchParams: PropTypes.func,
	searchParams: PropTypes.object,
};

const FilterOption = ({
	isOpen,
	closeModal,
	setSearchParams,
	categories,
	searchParams,
}) => {
	return (
		<>
			<div className="hidden md:flex w-2/6 xl:w-1/5">
				<RenderFilter
					categories={categories}
					setSearchParams={setSearchParams}
					searchParams={searchParams}
				/>
			</div>
			<Transition appear show={isOpen}>
				<Dialog as="div" className="relative z-10" onClose={closeModal}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
									>
										<div>Bộ lọc sản phẩm</div>
										<IconButton onClick={closeModal}>
											<XMarkIcon className="w-5 h-5" />
										</IconButton>
									</Dialog.Title>
									<div className="mt-2">
										<RenderFilter
											categories={categories}
											setSearchParams={setSearchParams}
											searchParams={searchParams}
										/>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
};

FilterOption.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	setSearchParams: PropTypes.func,
	categories: PropTypes.array,
	searchParams: PropTypes.object,
};

export default FilterOption;
