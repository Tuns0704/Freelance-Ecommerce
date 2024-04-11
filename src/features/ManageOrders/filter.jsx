/* eslint-disable react-hooks/exhaustive-deps */
import {
	Select,
	Input,
	Option,
	Popover,
	PopoverHandler,
	PopoverContent,
} from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { useEffect, useState } from "react";
import {
	handleInitOrderFilter,
	handleOrderFilter,
} from "../../helper/handleFilter";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

const Filter = ({ setSearchParams, searchParams }) => {
	const [deliveryStatus, setDeliveryStatus] = useState("all");
	const [paymentStatus, setPaymentStatus] = useState("all");
	const [findBy, setFindBy] = useState("userName");
	const [searchText, setSearchText] = useState("");
	const [fromDate, setFromDate] = useState();
	const [toDate, setToDate] = useState();

	const handleDeliveryStatusChange = (value) => {
		setDeliveryStatus(value);
	};

	const handlePaymentStatusChange = (value) => {
		setPaymentStatus(value);
	};

	const handleFindByChange = (value) => {
		setFindBy(value);
	};

	const handleSearchInputChange = (e) => {
		const value = e.target.value;
		setSearchText(value);
	};

	useEffect(() => {
		handleInitOrderFilter({
			searchParams,
			setDeliveryStatus,
			setPaymentStatus,
			setFindBy,
			setSearchText,
		});
	}, []);

	useEffect(() => {
		handleOrderFilter({
			searchParams,
			setSearchParams,
			deliveryStatus,
			paymentStatus,
			findBy,
			searchText,
			fromDate,
			toDate,
		});
	}, [
		deliveryStatus,
		findBy,
		fromDate,
		paymentStatus,
		searchParams,
		searchText,
		setSearchParams,
		toDate,
	]);

	return (
		<div className="flex gap-2 mb-5">
			<div className="flex gap-2">
				<Select
					value={deliveryStatus}
					label="Trạng thái vận chuyển"
					onChange={handleDeliveryStatusChange}
				>
					<Option value="all">Tất cả</Option>
					<Option value="pending">Đang chờ</Option>
					<Option value="in_transit">Đang được giao</Option>
					<Option value="delivered">Giao thành công</Option>
					<Option value="failed">Giao thất bại</Option>
				</Select>
				<Select
					value={paymentStatus}
					label="Trạng thái thanh toán"
					onChange={handlePaymentStatusChange}
				>
					<Option value="all">Tất cả</Option>
					<Option value="not_paid">Chưa thanh toán</Option>
					<Option value="partially_paid">Đã thanh toán cọc</Option>
					<Option value="fully_paid">Đã thanh toán toàn bộ</Option>
				</Select>
			</div>
			<div className="flex gap-2">
				<Popover placement="bottom">
					<PopoverHandler>
						<Input
							label="Từ ngày"
							onChange={() => null}
							value={fromDate ? format(fromDate, "yyyy-MM-dd") : "Chọn ngày"}
						/>
					</PopoverHandler>
					<PopoverContent>
						<DayPicker
							mode="single"
							selected={fromDate}
							onSelect={setFromDate}
							showOutsideDays
							className="border-0"
							classNames={{
								caption: "flex justify-center py-2 mb-4 relative items-center",
								caption_label: "text-sm font-medium text-gray-900",
								nav: "flex items-center",
								nav_button:
									"h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
								nav_button_previous: "absolute left-1.5",
								nav_button_next: "absolute right-1.5",
								table: "w-full border-collapse",
								head_row: "flex font-medium text-gray-900",
								head_cell: "m-0.5 w-9 font-normal text-sm",
								row: "flex w-full mt-2",
								cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
								day: "h-9 w-9 p-0 font-normal",
								day_range_end: "day-range-end",
								day_selected:
									"rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
								day_today: "rounded-md bg-gray-200 text-gray-900",
								day_outside:
									"day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
								day_disabled: "text-gray-500 opacity-50",
								day_hidden: "invisible",
							}}
							components={{
								IconLeft: ({ ...props }) => (
									<ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
								),
								IconRight: ({ ...props }) => (
									<ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
								),
							}}
						/>
					</PopoverContent>
				</Popover>
				<Popover placement="bottom">
					<PopoverHandler>
						<Input
							label="Đến ngày"
							onChange={() => null}
							value={toDate ? format(toDate, "yyyy-MM-dd") : "Chọn ngày"}
						/>
					</PopoverHandler>
					<PopoverContent>
						<DayPicker
							mode="single"
							selected={toDate}
							onSelect={setToDate}
							showOutsideDays
							className="border-0"
							classNames={{
								caption: "flex justify-center py-2 mb-4 relative items-center",
								caption_label: "text-sm font-medium text-gray-900",
								nav: "flex items-center",
								nav_button:
									"h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
								nav_button_previous: "absolute left-1.5",
								nav_button_next: "absolute right-1.5",
								table: "w-full border-collapse",
								head_row: "flex font-medium text-gray-900",
								head_cell: "m-0.5 w-9 font-normal text-sm",
								row: "flex w-full mt-2",
								cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
								day: "h-9 w-9 p-0 font-normal",
								day_range_end: "day-range-end",
								day_selected:
									"rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
								day_today: "rounded-md bg-gray-200 text-gray-900",
								day_outside:
									"day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
								day_disabled: "text-gray-500 opacity-50",
								day_hidden: "invisible",
							}}
							components={{
								IconLeft: ({ ...props }) => (
									<ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
								),
								IconRight: ({ ...props }) => (
									<ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
								),
							}}
						/>
					</PopoverContent>
				</Popover>
			</div>

			<div className="flex gap-2">
				<Select
					value={findBy}
					label="Tìm kiếm theo"
					onChange={handleFindByChange}
				>
					<Option value="userName">Tên</Option>
					<Option value="phone">Số điện thoại</Option>
				</Select>
				<Input
					label="Nhập thông tin"
					value={searchText}
					onChange={handleSearchInputChange}
				/>
			</div>
		</div>
	);
};

Filter.propTypes = {
	setSearchParams: PropTypes.func,
	searchParams: PropTypes.object,
};

export default Filter;
