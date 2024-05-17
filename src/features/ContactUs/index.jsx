import {
	Button,
	Input,
	Textarea,
	Typography,
	Tooltip,
} from "@material-tailwind/react";
import {
	MapPinIcon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import { validateContactUs } from "../../helper/validateContactUs";
import { toast } from "react-toastify";
import { sendContactUs } from "../../services/contactUs";
import { useNavigate } from "react-router-dom";

const contact = [
	{
		icon: <MapPinIcon className="w-6 h-6" />,
		title: "Địa Chỉ",
		content:
			"Số 15, Ngõ 28 Ngụy Như Kon Tum, P. Nhân Chính, Q. Thanh Xuân, Hà Nội",
	},
	{
		icon: <EnvelopeIcon className="w-6 h-6" />,
		title: "Email",
		content: "cskh.orderus@gmail.com",
	},
	{
		icon: <PhoneIcon className="w-6 h-6" />,
		title: "Điện Thoại",
		content: "0332.888.222 - 0962.139.661",
	},
];

const ContactUs = () => {
	const [contactUs, setContactUs] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		comment: "",
	});
	const [errors, setErrors] = useState({});

	const handleChangeInput = (e) => {
		const { name, value } = e.target;
		setContactUs((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const navigate = useNavigate();

	const handleSubmit = async () => {
		const errors = validateContactUs(contactUs);
		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			try {
				const response = await sendContactUs(contactUs);
				if (response.status === 201) {
					toast.success("Gửi liên hệ thành công!");
					navigate("/");
				} else {
					toast.error("Gửi liên hệ thất bại!");
				}
			} catch (error) {
				toast.error("Gửi liên hệ thất bại!");
			}
		} else {
			toast.error("Bạn cần nhập đúng thông tin!");
		}
	};

	return (
		<div className="md:h-[70vh] mb-5">
			<h1 className="text-3xl font-medium text-center mb-5">
				Liên hệ chúng tôi
			</h1>

			<div className="h-full md:flex gap-5">
				<div className="md:w-1/3 border p-5">
					<div className="mb-2 flex flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Tên <b className="text-red-400">*</b>
						</Typography>
						<Tooltip
							content={errors.lastName}
							placement="top-end"
							open={!!errors.lastName}
							className="!visible bg-transparent font-medium text-red-800 py-1 mt-1"
						>
							<Input
								size="lg"
								name="lastName"
								value={contactUs.lastName}
								onChange={handleChangeInput}
								placeholder="Tên"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900 "
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
						</Tooltip>
					</div>
					<div className="mb-2 flex flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Họ <b className="text-red-400">*</b>
						</Typography>
						<Tooltip
							content={errors.firstName}
							placement="top-end"
							open={!!errors.firstName}
							className="!visible bg-transparent font-medium text-red-800 py-1 mt-1"
						>
							<Input
								size="lg"
								placeholder="Nguyen Van A"
								name="firstName"
								value={contactUs.firstName}
								onChange={handleChangeInput}
								type="text"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
						</Tooltip>
					</div>
					<div className="mb-2 flex flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Email <b className="text-red-400">*</b>
						</Typography>
						<Tooltip
							content={errors.email}
							placement="top-end"
							open={!!errors.email}
							className="!visible bg-transparent font-medium text-red-800 py-1 mt-1"
						>
							<Input
								size="lg"
								placeholder="0919430112"
								name="email"
								value={contactUs.email}
								onChange={handleChangeInput}
								type="text"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
						</Tooltip>
					</div>
					<div className="mb-2 flex flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Số điện thoại <b className="text-red-400">*</b>
						</Typography>
						<Tooltip
							content={errors.phone}
							placement="top-end"
							open={!!errors.phone}
							className="!visible bg-transparent font-medium text-red-800 py-1 mt-1"
						>
							<Input
								size="lg"
								placeholder="0919430112"
								name="phone"
								value={contactUs.phone}
								onChange={handleChangeInput}
								type="text"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
						</Tooltip>
					</div>
					<div className="mb-2 flex flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Nhận xét/Câu hỏi <b className="text-red-400">*</b>
						</Typography>
						<Tooltip
							content={errors.comment}
							placement="top-end"
							open={!!errors.comment}
							className="!visible bg-transparent font-medium text-red-800 py-1 mt-1"
						>
							<Textarea
								size="lg"
								placeholder="Nếu bạn có thắc mắc hay vấn đề hãy gửi cho chúng tôi!"
								name="comment"
								value={contactUs.comment}
								onChange={handleChangeInput}
								type="text"
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
							/>
						</Tooltip>
					</div>

					<Button onClick={handleSubmit} className="mt-6" fullWidth>
						Đăng ký ngay
					</Button>
				</div>
				<div className="md:w-2/3 flex flex-col h-full justify-between">
					<iframe
						className="w-full h-[50vh]"
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.868473301721!2d105.79731751131779!3d20.99790878056296!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acbc80fa76b1%3A0x6787490119b5fb63!2zMTUgTmcuIDI4IFAuIE5n4buxeSBOaMawIEtvbiBUdW0sIE5ow6JuIENow61uaCwgVGhhbmggWHXDom4sIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1713945678052!5m2!1svi!2s"
						width="800"
						height="600"
						style={{ border: 0 }}
						allowfullscreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
					></iframe>
					<div>
						<h1 className="font-bold text-2xl mb-2">Nơi liên hệ</h1>
						{contact.map((item, index) => (
							<div key={index} className="flex gap-3 py-2">
								{item.icon}
								<div className="flex gap-2">
									<h1 className="font-bold">{item.title}: </h1>
									<p> {item.content}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactUs;
