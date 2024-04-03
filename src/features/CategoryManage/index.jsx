import { useEffect, useState } from "react";
import { getListCategory } from "./../../services/category";
import { toast } from "react-toastify";
import { IconButton } from "@material-tailwind/react";
import ModalAddCategory from "./modalAddCategory";
import ModalDeleteCategoryConfirm from "./deleteModalConfirm";
import Loading from "../../cores/components/loading";
import { ArchiveBoxXMarkIcon, PlusCircleIcon } from "@heroicons/react/24/solid";

const CategoryManage = () => {
	const [category, setCategory] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [categoryId, setCategoryId] = useState(0);
	const [loading, setLoading] = useState(false);

	const getData = async () => {
		try {
			setLoading(true);
			const response = await getListCategory();
			if (response.status === 200) {
				setCategory(response.data);
			} else {
				toast("Lấy danh mục gặp lỗi");
			}
			setLoading(false);
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
				<IconButton onClick={handleOpenModal}>
					<PlusCircleIcon className="w-5 h-5" />
				</IconButton>
			</div>
			<div className="relative overflow-x-auto">
				{loading ? (
					<Loading />
				) : (
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
										<IconButton
											onClick={() => handleOpenDeleteModal(item.id)}
											className="px-3 py-2 rounded"
											color="red"
										>
											<ArchiveBoxXMarkIcon className="w-5 h-5" />
										</IconButton>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
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
