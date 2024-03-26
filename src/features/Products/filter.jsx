import { formatCurrency } from "./../../helper/formatCurrency";
import { filterPriceOptions } from "./../../constant/filter";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { Radio } from "@material-tailwind/react";

const RenderFilter = ({ categories, setSearchParams }) => {
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

	const handleSelectMarketingPrice = () => {
		setMarketingPrice({
			isChecked: !marketingPrice.isChecked,
			value: !marketingPrice.isChecked,
		});
	};
	useEffect(() => {
		const handleFilter = () => {
			if (marketingPrice.isChecked) {
				setSearchParams((prev) => {
					prev.set("marketingPrice", marketingPrice.value);
					return prev;
				});
			} else {
				setSearchParams((prev) => {
					prev.delete("marketingPrice");
					return prev;
				});
			}
			if (productCategory.isChecked) {
				setSearchParams((prev) => {
					prev.set("category", productCategory.value);
					return prev;
				});
			} else {
				setSearchParams((prev) => {
					prev.delete("category");
					return prev;
				});
			}

			if (productPrice.isChecked) {
				setSearchParams((prev) => {
					prev.set("minPrice", productPrice.value.minPrice);
					prev.set("maxPrice", productPrice.value.maxPrice);
					return prev;
				});
			} else {
				setSearchParams((prev) => {
					prev.delete("minPrice");
					prev.delete("maxPrice");
					return prev;
				});
			}
		};
		handleFilter();
	}, [
		marketingPrice.isChecked,
		marketingPrice.value,
		productCategory.isChecked,
		productCategory.value,
		productPrice.isChecked,
		productPrice.value.maxPrice,
		productPrice.value.minPrice,
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
						defaultChecked={marketingPrice.isChecked}
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
								defaultChecked={
									productPrice.isChecked && productPrice.value === option
								}
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
								defaultChecked={
									productCategory.isChecked &&
									productCategory.value === item.englishName
								}
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
};

const FilterOption = ({ isOpen, closeModal, setSearchParams, categories }) => {
	return (
		<>
			<div className="hidden md:flex w-1/5">
				<RenderFilter
					categories={categories}
					setSearchParams={setSearchParams}
				/>
			</div>
			<Transition appear show={isOpen} as={Fragment}>
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
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Bộ lọc sản phẩm
									</Dialog.Title>
									<div className="mt-2">
										<RenderFilter categories={categories} />
									</div>

									<div className="mt-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
											onClick={closeModal}
										>
											Got it, thanks!
										</button>
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
};

export default FilterOption;
