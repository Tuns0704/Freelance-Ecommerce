/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-mixed-spaces-and-tabs */
import { formatCurrency } from "@helper/formatCurrency";
import { handleFilter, handleInitFilter } from "@helper/handleFilter";

import {
	filterProductsConditionOptions,
	filterOrdersConditionOptions,
	filterBrandsOptions,
} from "@constant/filter";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { IconButton, Radio, Collapse } from "@material-tailwind/react";
import {
	XMarkIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@heroicons/react/24/outline";
import MultiRangeSlider from "multi-range-slider-react";
import "../../App.css";
import { debounce } from "lodash";

const RenderFilter = ({ categories, setSearchParams, searchParams }) => {
	const [openLaptop, setLaptopOpen] = useState(false);
	const [openConditionProduct, setConditionProduct] = useState(true);
	const [openConditionOrder, setConditionOrder] = useState(true);
	const [openCategory, setCategory] = useState(false);

	const toggleLaptopOpen = () => setLaptopOpen((cur) => !cur);
	const toggleConditionProductOpen = () => setConditionProduct((cur) => !cur);
	const toggleConditionOrderOpen = () => setConditionOrder((cur) => !cur);
	const toggleCategoryOpen = () => setCategory((cur) => !cur);

	const [marketingPrice, setMarketingPrice] = useState({
		isChecked: false,
		value: false,
	});

	const [productCondition, setProductCondition] = useState({
		isChecked: false,
		value: "",
	});

	const [orderCondition, setOrderCondition] = useState({
		isChecked: false,
		value: "",
	});

	const [brands, setBrands] = useState({
		isChecked: false,
		value: "",
	});

	const [minValue, setMinValue] = useState(0);
	const [maxValue, setMaxValue] = useState(0);

	const handleChange = () => {};

	const debouncedHandleChange = debounce(handleChange, 500);

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
		productCategory.value === category
			? setProductCategory({ isChecked: false, value: "" })
			: setProductCategory({ isChecked: true, value: category });
	};

	const handleChangeProductCondition = (option) => {
		productCondition.value === option.value
			? setProductCondition({
					isChecked: false,
					value: "",
			  })
			: setProductCondition({ isChecked: true, value: option.value });
	};

	const handleChangeOrderCondition = (option) => {
		orderCondition.value === option.value
			? setOrderCondition({
					isChecked: false,
					value: "",
			  })
			: setOrderCondition({ isChecked: true, value: option.value });
	};

	const handleChangeBrands = (option) => {
		brands.value === option.value
			? setBrands({
					isChecked: false,
					value: "",
			  })
			: setBrands({ isChecked: true, value: option.value });
	};

	useEffect(() => {
		handleInitFilter({
			searchParams,
			setMarketingPrice,
			setProductCategory,
			setMaxValue,
			setMinValue,
			setProductCondition,
			setOrderCondition,
			setBrands,
		});
	}, []);

	useEffect(() => {
		handleFilter({
			searchParams,
			setSearchParams,
			marketingPrice,
			minValue,
			maxValue,
			productCategory,
			productCondition,
			orderCondition,
			brands,
		});
	}, [
		marketingPrice,
		productCategory,
		productCondition,
		orderCondition,
		searchParams,
		setSearchParams,
		brands,
		minValue,
		maxValue,
	]);

	const handleInput = (e) => {
		setMinValue(e.minValue);
		setMaxValue(e.maxValue);
	};

	return (
		<aside className="px-3 py-2 bg-white rounded-t-lg border md:w-full sm:flex flex-col gap-2">
			<div className="border-b">
				<div className="font-semibold">Giá tốt</div>
				<div className="flex">
					<Radio
						name="marketingPrice"
						onClick={() => handleSelectMarketingPrice()}
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
				<MultiRangeSlider
					min={0}
					max={100000000}
					step={1}
					canMinMaxValueSame={true}
					minCaption={formatCurrency(minValue)}
					maxCaption={formatCurrency(maxValue)}
					label={false}
					ruler={false}
					style={{
						border: "none",
						boxShadow: "none",
					}}
					barInnerColor="#333333"
					className="shadow-none"
					thumbLeftColor="#333333"
					thumbRightColor="#333333"
					minValue={minValue}
					maxValue={maxValue}
					onInput={(e) => {
						handleInput(e);
					}}
					onChange={(e) => {
						debouncedHandleChange(e);
					}}
				/>
				<div className="flex justify-between mb-2">
					<div className="font-medium">{formatCurrency(0)}</div>
					<div className="font-medium">{formatCurrency(100000000)}</div>
				</div>
			</div>

			<div className="border-b py-3">
				<div
					onClick={toggleConditionOrderOpen}
					className="font-semibold flex justify-between"
				>
					Tình trạng giao hàng
					{openConditionOrder ? (
						<ChevronUpIcon className="w-6 h-6" />
					) : (
						<ChevronDownIcon className="w-6 h-6" />
					)}
				</div>
				<Collapse open={openConditionOrder}>
					<div className="flex flex-col gap-1">
						{filterOrdersConditionOptions.map((option, index) => (
							<div key={index} className="flex">
								<Radio
									name="conditionOrderOption"
									onClick={() => handleChangeOrderCondition(option)}
									checked={
										orderCondition.isChecked &&
										orderCondition.value === option.value
									}
									onChange={() => ""}
									containerProps={{
										className: "py-2",
									}}
									label={
										<h1 className="text-blue-gray-900 font-medium">
											{option.label}
										</h1>
									}
								/>
							</div>
						))}
					</div>
				</Collapse>
			</div>
			<div className="border-b py-3">
				<div
					onClick={toggleConditionProductOpen}
					className="font-semibold flex justify-between"
				>
					Tình trạng hàng
					{openConditionProduct ? (
						<ChevronUpIcon className="w-6 h-6" />
					) : (
						<ChevronDownIcon className="w-6 h-6" />
					)}
				</div>
				<Collapse open={openConditionProduct}>
					<div className="flex flex-col gap-1">
						{filterProductsConditionOptions.map((option, index) => (
							<div key={index} className="flex">
								<Radio
									name="conditionOption"
									onClick={() => handleChangeProductCondition(option)}
									checked={
										productCondition.isChecked &&
										productCondition.value === option.value
									}
									onChange={() => ""}
									containerProps={{
										className: "py-2",
									}}
									label={
										<h1 className="text-blue-gray-900 font-medium">
											{option.label}
										</h1>
									}
								/>
							</div>
						))}
					</div>
				</Collapse>
			</div>
			<div className="border-b py-3">
				<div
					onClick={toggleLaptopOpen}
					className="font-semibold flex justify-between"
				>
					Hãng Laptop
					{openLaptop ? (
						<ChevronUpIcon className="w-6 h-6" />
					) : (
						<ChevronDownIcon className="w-6 h-6" />
					)}
				</div>
				<Collapse open={openLaptop}>
					<div className="flex flex-col gap-1">
						{filterBrandsOptions.map((option, index) => (
							<div key={index} className="flex">
								<Radio
									name="brandsOption"
									onClick={() => handleChangeBrands(option)}
									checked={brands.isChecked && brands.value === option.value}
									onChange={() => ""}
									containerProps={{
										className: "py-2",
									}}
									label={
										<h1 className="text-blue-gray-900 font-medium">
											{option.label}
										</h1>
									}
								/>
							</div>
						))}
					</div>
				</Collapse>
			</div>
			<div className="py-3">
				<div
					onClick={toggleCategoryOpen}
					className="font-semibold flex justify-between"
				>
					Danh mục
					{openCategory ? (
						<ChevronUpIcon className="w-6 h-6" />
					) : (
						<ChevronDownIcon className="w-6 h-6" />
					)}
				</div>
				<Collapse open={openCategory}>
					<div className="flex flex-col gap-1">
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
				</Collapse>
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
		<div className="w-full">
			<div className="hidden md:flex">
				<RenderFilter
					categories={categories}
					setSearchParams={setSearchParams}
					searchParams={searchParams}
				/>
			</div>
			<Transition appear show={isOpen}>
				<Dialog as="div" className="relative z-[99]" onClose={closeModal}>
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
		</div>
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
