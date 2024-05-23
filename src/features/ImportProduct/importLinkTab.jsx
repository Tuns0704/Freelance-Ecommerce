import {
	TabPanel,
	Typography,
	Button,
	Select,
	Option,
	Input,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";
import { getListCategory } from "../../services/category";
import { addProductByLink } from "../../services/product";

const ImportLinkTab = () => {
	const [link, setLink] = useState("");
	const [listCategory, setListCategory] = useState([]);
	const [category, setCategory] = useState("");

	const getCategories = async () => {
		try {
			const response = await getListCategory();
			setListCategory(response.data);
		} catch (error) {
			toast.error("Lỗi khi lấy danh mục");
		}
	};

	useEffect(() => {
		getCategories();
	}, []);

	const onSubmitGetItemFromLink = async () => {
		const ebayItemRegex = /ebay\.com\/itm\/(\d+)/i;
		const itemIdMatch = link.match(ebayItemRegex);
		if (itemIdMatch !== null && itemIdMatch.length > 0 && category !== "") {
			const body = {
				id: itemIdMatch[1],
				category: category,
			};
			const response = await addProductByLink(body);
			if (response.status === 201) {
				toast.success("Thêm sản phẩm thành công");
			}
		} else {
			toast.error("Vui lòng điền đủ thông tin và nhập đúng link!");
		}
	};

	return (
		<TabPanel value="report-price-auto" className="px-0  min-h-[60vh]">
			<div className="text-center">
				<Typography variant="h2" className="font-bold text-gray-900 mb-4">
					Import theo Link
				</Typography>
			</div>
			<div className="flex flex-col justify-between gap-5">
				<Input
					value={link}
					onChange={(event) => setLink(event.target.value)}
					className="w-full"
					label="Nhập link"
					type="text"
				/>
				<Select label="Loại sản phẩm">
					{listCategory.map((item) => (
						<Option
							onClick={() => setCategory(item.englishName)}
							key={item.id}
							value={item.englishName}
						>
							{item.vietnameseName}
						</Option>
					))}
				</Select>
				<Button onClick={onSubmitGetItemFromLink}>Thêm sản phẩm</Button>
			</div>
		</TabPanel>
	);
};

export default ImportLinkTab;
