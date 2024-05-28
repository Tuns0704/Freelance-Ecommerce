import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "@components/loading";
import { getListOrder } from "@services/order";

import TableItem from "./tableItem";
import { useSearchParams } from "react-router-dom";
import Pagination from "@components/pagination";
import Filter from "./filter";

const OrderManage = () => {
	const [orders, setListOrder] = useState([]);
	const [loading, setLoading] = useState(false);
	const [totalProducts, setTotalProducts] = useState(0);
	const [searchParams, setSearchParams] = useSearchParams({
		page: 1,
	});

	const page = searchParams.get("page");

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

	const getData = useCallback(async () => {
		try {
			setLoading(true);
			const response = await getListOrder(searchParams);
			if (response.status === 200) {
				setListOrder(response.data.data);
				setTotalProducts(response.data.totalCount);
			} else {
				toast("Lấy danh sách khách hàng gặp lỗi");
			}
			setLoading(false);
		} catch (error) {
			toast.error("Lỗi khi lấy danh danh sách khách hàng");
		}
	}, [searchParams]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<div className="mt-5">
			<div className="flex justify-between items-center mb-5">
				<h2 className="text-2xl font-semibold ">Quản lý đơn đặt hàng</h2>
			</div>
			<Filter searchParams={searchParams} setSearchParams={setSearchParams} />
			<div className="relative overflow-x-auto">
				{loading ? (
					<Loading />
				) : (
					<table className="w-full p-5 rounded-t-lg bg-white shadow text-left rtl:text-right">
						<thead>
							<tr className="border-b border-blue-gray-50">
								<th className="px-5 w-20 py-2 border-r">Id</th>
								<th className="px-5 py-2 border-r">Tên khách hàng</th>
								<th className="px-5 py-2 border-r">Số điện thoại</th>
								<th className="px-5 py-2 border-r">Ngày đặt</th>
								<th className="px-5 py-2 border-r">Thanh toán</th>
								<th className="px-5 py-2 border-r">Vận chuyển</th>
								<th className="px-5 py-2 "></th>
							</tr>
						</thead>
						<tbody>
							{orders.map((item) => (
								<TableItem order={item} key={item.id} reload={getData} />
							))}
						</tbody>
					</table>
				)}
				<Pagination
					handleClick={handleClick}
					page={page}
					totalPages={totalPages}
					getItemProps={getItemProps}
				/>
			</div>
		</div>
	);
};

export default OrderManage;
