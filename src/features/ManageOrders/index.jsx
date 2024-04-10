import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../../cores/components/loading";
import { getListOrder } from "../../services/order";
import { paymentStatus } from "../../helper/paymentStatus";
import { formatDateTime } from "../../helper/formatDateTime";
import { IconButton } from "@material-tailwind/react";
import {
	InformationCircleIcon,
	PencilSquareIcon,
} from "@heroicons/react/24/solid";
import TableItem from "./tableItem";

const OrderManage = () => {
	const [orders, setListOrder] = useState([]);
	const [loading, setLoading] = useState(false);

	const getData = async () => {
		try {
			setLoading(true);
			const response = await getListOrder();
			if (response.status === 200) {
				setListOrder(response.data.data);
			} else {
				toast("Lấy danh sách khách hàng gặp lỗi");
			}
			setLoading(false);
		} catch (error) {
			toast.error("Lỗi khi lấy danh danh sách khách hàng");
		}
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h2 className="text-2xl font-semibold ">Quản lý đơn đặt hàng</h2>
			</div>
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
								<TableItem order={item} key={item.id} />
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default OrderManage;
