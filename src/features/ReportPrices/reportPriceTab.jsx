import {
	Select,
	Option,
	Typography,
	TabPanel,
	Input,
	Button,
	IconButton,
} from "@material-tailwind/react";
import { formatCurrency } from "../../helper/formatCurrency";
import { useState, useEffect } from "react";
import { getListCategory } from "./../../services/category";

const ReportPriceTab = () => {
	const [weight, setWeight] = useState(0.1);
	const [productPrice, setProductPrice] = useState(0);
	const [price, setPrice] = useState(0);
	const [shippingPrice, setShippingPrice] = useState(0);
	const [total, setTotal] = useState(0);
	const [listCategory, setListCategory] = useState([]);

	const getCategories = async () => {
		const response = await getListCategory();
		setListCategory(response.data);
	};

	useEffect(() => {
		getCategories();
	}, []);

	const handleReportPrice = () => {
		setPrice(parseInt(productPrice * 24000));
		setShippingPrice(parseInt(weight * 235000));
	};

	useEffect(() => {
		setTotal(parseInt(price + shippingPrice));
	}, [price, shippingPrice]);

	const handleIncreaseWeight = () => {
		setWeight((prevWeight) => parseFloat((prevWeight + 0.1).toFixed(1)));
	};
	const handleDecreaseWeight = () => {
		if (weight > 0) {
			setWeight((prevWeight) => parseFloat((prevWeight - 0.1).toFixed(1)));
		}
	};

	const handleProductPriceChange = (event) => {
		const { value } = event.target;
		setProductPrice(value);
	};

	return (
		<TabPanel value="report-price" className="px-0 h-[60vh]">
			<div className="text-center">
				<Typography variant="h2" className="font-bold mb-4">
					Nhận báo giá
				</Typography>
			</div>
			<div className="flex gap-5">
				<div className="w-1/2 flex flex-col gap-5">
					<Select size="md" label="Loại sản phẩm">
						{listCategory.map((item) => (
							<Option key={item.id} value={item.englishName}>
								{item.vietnameseName}
							</Option>
						))}
					</Select>
					<Input
						label="Số tiền($)"
						value={productPrice}
						type="number"
						onChange={handleProductPriceChange}
					/>
					<div className="flex">
						<IconButton
							onClick={handleDecreaseWeight}
							className="rounded-r-none"
						>
							-
						</IconButton>
						<input
							type="number"
							className="border outline-none px-2"
							value={weight}
							readOnly
						/>
						<IconButton
							onClick={handleIncreaseWeight}
							className="rounded-l-none"
						>
							+
						</IconButton>
					</div>
					<Button onClick={handleReportPrice}>Nhận báo giá</Button>
				</div>
				<div className="w-1/2 border p-5">
					<Typography variant="h5" className="font-medium mb-4">
						Kết quả
					</Typography>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<p className="font-medium">Giá sản phẩm</p>
							<p>{formatCurrency(price)}</p>
						</div>
						<div className="flex justify-between">
							<p className="font-medium">Phí vận chuyển và cân nặng</p>
							<p>{formatCurrency(shippingPrice)}</p>
						</div>
						<hr />
						<div className="flex justify-between">
							<p className="font-medium">Tổng tiền</p>
							<p>{formatCurrency(total)}</p>
						</div>
					</div>
				</div>
			</div>
		</TabPanel>
	);
};

export default ReportPriceTab;
