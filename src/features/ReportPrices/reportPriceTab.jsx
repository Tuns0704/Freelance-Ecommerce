import {
	Select,
	Option,
	Typography,
	TabPanel,
	Input,
	Button,
} from "@material-tailwind/react";
import { formatCurrency } from "../../helper/formatCurrency";
import { useState } from "react";

const ReportPriceTab = () => {
	const [weight, setWeight] = useState(0.1);
	const [price, setPrice] = useState(0);
	const [total, setTotal] = useState(0);

	const handleIncreaseWeight = () => {
		setWeight((prev) => prev + 0.1);
		setPrice((prev) => prev + 23500);
		setTotal(weight * 23500);
	};
	const handleDecreaseWeight = () => {
		setWeight((prev) => prev - 0.1);
		setWeight((prev) => prev - 23500);
		setTotal(weight * 23500);
	};

	return (
		<TabPanel value="report-price" className="px-0 h-[80vh]">
			<div className="text-center">
				<Typography variant="h2" className="font-bold mb-4">
					Nhận báo giá
				</Typography>
			</div>
			<div className="flex gap-5">
				<div className="w-1/2 flex flex-col gap-5">
					<Select size="md" label="Loại sản phẩm">
						<Option>Material Tailwind HTML</Option>
						<Option>Material Tailwind React</Option>
						<Option>Material Tailwind Vue</Option>
						<Option>Material Tailwind Angular</Option>
					</Select>
					<Input label="Số tiền($)" />
					<Input label="Cân nặng(kg)" />
					<Button>Nhận báo giá</Button>
				</div>
				<div className="w-1/2 border p-5">
					<Typography variant="h5" className="font-medium mb-4">
						Kết quả
					</Typography>
					<div className="flex flex-col gap-2">
						<div className="flex justify-between">
							<p className="font-medium">Giá sản phẩm</p>
							<p>{formatCurrency(0)}</p>
						</div>
						<div className="flex justify-between">
							<p className="font-medium">Phí vận chuyển và cân nặng</p>
							<p>{formatCurrency(900)}</p>
						</div>
						<hr />
						<div className="flex justify-between">
							<p className="font-medium">Tổng tiền</p>
							<p>{formatCurrency(900)}</p>
						</div>
					</div>
				</div>
			</div>
		</TabPanel>
	);
};

export default ReportPriceTab;
