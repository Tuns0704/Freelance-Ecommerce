import { Button, Input, Textarea } from "@material-tailwind/react";
import {
	MapPinIcon,
	EnvelopeIcon,
	PhoneIcon,
} from "@heroicons/react/24/outline";

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
	return (
		<div className="md:h-[70vh] mb-5">
			<h1 className="text-3xl font-medium text-center mb-5">
				Liên hệ chúng tôi
			</h1>

			<div className="h-full md:flex gap-5">
				<div className="md:w-1/3 border">
					<div className="flex flex-col gap-5 p-5">
						<Input label="Tên" placeholder="Nhập tên" required />
						<Input label="Họ" placeholder="Nhập họ" required />
						<Input label="Email" placeholder="Nhập email" required />
						<Input label="Điện Thoại" placeholder="Nhập điện thoại" required />
						<Textarea label="Nhận Xét / Câu Hỏi" className="h-40" required />
						<Button className="px-14 py-3 rounded">Gửi</Button>
					</div>
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
