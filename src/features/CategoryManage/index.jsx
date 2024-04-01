import { useEffect, useState } from "react";
import { getListCategory } from "./../../services/category";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import ModalAddCategory from "./modalAddCategory";
import ModalDeleteCategoryConfirm from "./deleteModalConfirm";

const CategoryManage = () => {
	const [category, setCategory] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [categoryId, setCategoryId] = useState(0);

	const getData = async () => {
		try {
			const response = await getListCategory();
			if (response.status === 200) {
				setCategory(response.data);
			} else {
				toast("Lấy danh mục gặp lỗi");
			}
		} catch (error) {
			toast.error("Lỗi khi lấy danh mục");
		}
	};

	const handleOpenModal = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOpenDeleteModal = (id) => {
		setDeleteModalOpen((prev) => !prev);
		setCategoryId(id);
	};

	useEffect(() => {
		getData();
	}, [categoryId]);

	return (
		<div>
			<div className="flex justify-between items-center mb-5">
				<h2 className="text-2xl font-semibold ">Quản lý danh mục</h2>
				<ModalAddCategory
					isOpen={isOpen}
					closeModal={handleOpenModal}
					reload={getData}
				/>
				<Button onClick={handleOpenModal}>Thêm danh mục</Button>
			</div>
			<div className="relative overflow-x-auto">
				<table className="w-full p-5 rounded-t-lg bg-white shadow text-left rtl:text-right">
					<thead>
						<tr className="border-b border-blue-gray-50">
							<th className="px-5 w-1/6 py-2 border-r">Id</th>
							<th className="px-5 w-3/6 py-2 border-r">Danh mục</th>
							<th className="px-5 w-3/6 py-2 ">Hành động</th>
						</tr>
					</thead>
					<tbody>
						{category.map((item, index) => (
							<tr className="border-b border-blue-gray-50" key={item.id}>
								<td className="px-5 w-1/6 py-2 border-r">{index + 1}</td>
								<td className="px-5 w-3/6 py-2 border-r">
									{item.vietnameseName}
								</td>
								<td className="px-5 w-2/6 py-2 border-r">
									<Button
										onClick={() => handleOpenDeleteModal(item.id)}
										className="bg-red-900 px-3 py-2 rounded"
									>
										Xoá
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<ModalDeleteCategoryConfirm
				isOpen={deleteModalOpen}
				closeModal={handleOpenDeleteModal}
				reload={getData}
				categoryId={categoryId}
			/>
		</div>
	);
};

export default CategoryManage;
