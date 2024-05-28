import {
	Select,
	Option,
	Typography,
	TabPanel,
	Input,
	Button,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { getListCategory } from "@services/category";
import { addProductByStoreName } from "@services/product";

const ImportShopTab = () => {
	const [listCategory, setListCategory] = useState([]);
	const [storeName, setStoreName] = useState("");
	const [keywords, setKeywords] = useState("");
	const [category, setCategory] = useState("");

	const getCategories = async () => {
		const response = await getListCategory();
		setListCategory(response.data);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const onSubmit = async () => {
		try {
			if (storeName !== "" && category !== "") {
				const body = {
					storeName: storeName,
					keywords: keywords,
					category: category,
				};
				const response = await addProductByStoreName(body);
				if (response.status === 201) {
					toast.success("Thêm sản phẩm từ cửa hàng thành công!");
				} else {
					toast.error("Thêm sản phẩm thất bại");
				}
			} else {
				toast.warning("Vui lòng nhập đầy đủ thông tin");
			}
		} catch (error) {
			toast.error("Lỗi khi add thêm sản phẩm");
		}
	};

	return (
		<TabPanel value="report-price" className="px-0 h-[60vh]">
			<div className="text-center">
				<Typography variant="h2" className="font-bold mb-4">
					Import theo shop
				</Typography>
			</div>
			<div className="flex w-full gap-5 items-center justify-center">
				<div className="flex w-full flex-col gap-5">
					<Input
						value={storeName}
						onChange={(event) => setStoreName(event.target.value)}
						className="w-full"
						label="Tên shop"
						type="text"
					/>
					<Input
						value={keywords}
						onChange={(event) => setKeywords(event.target.value)}
						className="w-full"
						label="Keyword"
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
					<Button onClick={onSubmit}>Thêm sản phẩm</Button>
				</div>
			</div>
		</TabPanel>
	);
};

export default ImportShopTab;
