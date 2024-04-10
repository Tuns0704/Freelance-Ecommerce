import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "@material-tailwind/react";
import { getSettings } from "../../services/setting";
import { formatCurrency } from "../../helper/formatCurrency";
import ImageSlider from "../../cores/components/imageSlider";
import Loading from "../../cores/components/loading";
import ModalEditSettings from "./editModal";
import { WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

const AdminSetting = () => {
	const [settings, setSettings] = useState({});
	const [isOpen, setIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const getData = async () => {
		try {
			setIsLoading(true);
			const response = await getSettings();
			if (response.status === 200) {
				setSettings(response.data);
				setIsLoading(false);
			} else {
				toast("Lấy danh mục gặp lỗi");
			}
		} catch (error) {
			toast.error("Lỗi khi lấy danh mục");
		}
	};

	useEffect(() => {
		getData();
	}, []);

	const handleToggleEditModal = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className="mt-5">
			<div className="flex justify-between items-center mb-5">
				<h2 className="text-2xl font-semibold ">Cài đặt trang</h2>
				<Button
					className="flex justify-center items-center gap-2"
					onClick={handleToggleEditModal}
				>
					<WrenchScrewdriverIcon className="w-5 h-5" />
					Settings
				</Button>
			</div>
			{isLoading ? (
				<Loading />
			) : (
				<>
					<div className="flex flex-col w-full gap-5">
						<div className="flex gap-5">
							<div className="w-1/2">
								<h1 className="font-semibold mb-2">Banner đầu trang chủ:</h1>
								<img
									src={settings.bannerTop}
									alt=""
									className="rounded-md h-[40vh]"
								/>
							</div>
							<div className="w-1/2">
								<h1 className="font-semibold  mb-2">Banner cuối trang chủ:</h1>
								<img
									src={settings.bannerBot}
									alt=""
									className="rounded-md h-[40vh]"
								/>
							</div>
						</div>
						<p className="font-semibold">Thông tin chuyển khoản</p>
						<div className="flex gap-5 w-full">
							<div className="w-1/2 flex flex-col gap-2 justify-center items-center">
								<img
									className="md:w-1/3 rounded"
									src={settings.bankUrl}
									alt=""
								/>
								<p className="font-semibold text-lg">{settings.bankInfoName}</p>
							</div>
							<div className="w-1/2">
								<div className="flex gap-2">
									<p className="font-semibold">Tỉ giá: </p>{" "}
									{formatCurrency(settings.ratioPrice)}
								</div>
								<div className="flex gap-2">
									<p className="font-semibold">Giá vận chuyển theo kg: </p>{" "}
									{formatCurrency(settings.weightBasedPrice)}
								</div>
								<p className="font-semibold">Giá bảo hành: </p>{" "}
								<ul className=" list-disc list-inside">
									{settings?.warrantyFees ? (
										<>
											{settings?.warrantyFees.map((item) => (
												<div key={item.duration}>
													<li>
														Bảo hành {item.duration} tháng: {item.fee}% (giá sản
														phẩm)
													</li>
												</div>
											))}
										</>
									) : (
										""
									)}
								</ul>
							</div>
						</div>
						<div>
							<h1 className="font-semibold">Slide ảnh:</h1>
							<ImageSlider images={settings.slide} />
						</div>
					</div>
					<ModalEditSettings
						isOpen={isOpen}
						closeModal={handleToggleEditModal}
						adminSettings={settings}
						reload={getData}
						loading={setIsLoading}
					/>
				</>
			)}
		</div>
	);
};

export default AdminSetting;
