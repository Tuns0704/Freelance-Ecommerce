import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getListUser } from "../../services/user";
import Loading from "../../cores/components/loading";

const UserManage = () => {
	const [listUser, setListUser] = useState([]);
	const [loading, setLoading] = useState(false);

	const getData = async () => {
		try {
			setLoading(true);
			const response = await getListUser();
			if (response.status === 200) {
				setListUser(response.data);
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
		<div className="mt-5">
			<div className="flex justify-between items-center mb-5">
				<h2 className="text-2xl font-semibold ">Danh sách khách hàng</h2>
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
								<th className="px-5 py-2 border-r">Email</th>
								<th className="px-5 py-2 border-r">Địa chỉ</th>
								<th className="px-5 py-2 ">Số điện thoại</th>
							</tr>
						</thead>
						<tbody>
							{listUser.map((item, index) => (
								<tr className="border-b border-blue-gray-50" key={item.id}>
									<td className="px-5 w-20 py-2 border-r">{index + 1}</td>
									<td className="px-5  py-2 border-r">{item.displayName}</td>
									<td className="px-5 py-2 border-r">{item.email}</td>
									<td className="px-5  py-2 border-r">
										{item.address !== null
											? item.address
											: "Không có thông tin"}
									</td>
									<td className="px-5  py-2 border-r">
										{item.address !== null
											? item.address
											: "Không có thông tin"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
};

export default UserManage;
