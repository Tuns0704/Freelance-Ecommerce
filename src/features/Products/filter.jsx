import { formatCurrency } from "./../../helper/formatCurrency";
import { filterPriceOptions } from "./../../constant/filter";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { getListCategory } from "../../services/category";

const RenderFilter = () => {
	const [categories, setCategories] = useState([]);
	const getCategories = async () => {
		try {
			const response = await getListCategory();
			setCategories(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	return (
		<aside className="px-3 py-2 border md:w-full sm:flex flex-col gap-2">
			<div className="border-b">
				<div className="font-semibold">Trạng thái</div>
				<label>
					<input type="checkbox" className="mr-2" />
					Còn hàng
				</label>
			</div>
			<div className="border-b">
				<div className="font-semibold">Giá tốt</div>
				<label>
					<input type="checkbox" className="mr-2" />
					Giá Tốt Hôm Nay
				</label>
			</div>
			<div className="border-b">
				<div className="font-semibold">Giá sản phẩm</div>
				<div className="flex flex-col gap-1">
					{filterPriceOptions.map((option, index) => (
						<label key={index} className="flex">
							<input type="checkbox" className="mr-2" />
							<p className=" text-base">
								{formatCurrency(option.from)} - {formatCurrency(option.to)}
							</p>
						</label>
					))}
				</div>
			</div>
			<div className="border-b">
				<div className="font-semibold">Danh mục</div>
				<div className="flex flex-col gap-1">
					{categories.map((item) => (
						<label key={item.id} className="flex">
							<input type="checkbox" className="mr-2" />
							<p className=" text-base">{item.vietnameseName}</p>
						</label>
					))}
				</div>
			</div>
		</aside>
	);
};

const FilterOption = ({ isOpen, closeModal }) => {
	return (
		<>
			<div className="hidden md:flex w-1/5">
				<RenderFilter />
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
										<RenderFilter />
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
};

export default FilterOption;
