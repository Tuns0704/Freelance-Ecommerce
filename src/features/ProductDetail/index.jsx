import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../services/product";
import {
	Accordion,
	AccordionHeader,
	AccordionBody,
} from "@material-tailwind/react";
import Loading from "../../cores/components/loading";
// import { Button } from "@material-tailwind/react";
// import DescriptionModal from "./descriptionModal";
import { formatCurrency } from "./../../helper/formatCurrency";
import { calculateDateShipping } from "./../../helper/calculateDateShipping";
import { TruckIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import ImageSlider from "./imageSlider";

const term = [
	{
		term: [
			"Sau khi đồng ý với đơn hàng, Khách hàng chuyển khoản trước 10% tổng giá trị đơn hàng trên website để cọc săn hàng: NGÂN HÀNG Á CHÂU ACB - CN Hà Nội (PGD HA DONG) ",
			"Sau khi mua thành công, đơn hàng dự kiến sẽ về tới Việt Nam sau 2 đến 3 tuần làm việc kể từ khi hàng về kho Mỹ (có cập nhật tracking liên tục).",
			"Khi đơn hàng về tới Việt Nam, khách hàng có thể ghé Shop lấy máy hoặc nhờ giao hàng, Shop sẽ thu 90% tiền hàng còn lại khi Khách nhận máy.",
		],
		note: [
			"Trường hợp không xử lý đơn hàng thành công, Khách hàng có thể chọn mua tiếp sản phẩm khác hoặc yêu cầu nhận lại tiền cọc.",
			"Khách đã cọc nhưng Shop chưa mua được hàng mà muốn hủy đơn, khách phải báo Shop trước 6 tiếng để xử lý hủy đơn (do VN lệch múi giờ với bên Mỹ)",
			"Nếu đơn đã được Shop mua thì không hủy được, khách hủy sẽ bị mất tiền cọc (10% đơn hàng). Do tính chất phức tạp của việc giao dịch quốc tế nên shop không nhận return trả lại hàng người bán trong mọi trường hợp.",
			"Nếu đơn hàng về chậm hơn 45 ngày vì các lý do không mong muốn, Khách hàng có thể yêu cầu hủy đơn và nhận lại toàn bộ 100% tiền cọc. Khách hàng sẽ được tặng 01 voucher mua hàng lần sau trị giá 300.000đ",
		],
	},
];

const benifits = [
	"Được bảo hiểm hàng hóa 100% (đơn bị thất lạc hoặc rơi vỡ sẽ được hoàn tiền 100%)",
	"Hoàn tiền 100% bất cứ khi nào nếu phát hiện máy sửa chữa",
	"Máy được bảo hành 03-12 tháng tất cả các lỗi từ Nhà sản xuất (tính từ ngày Khách Hàng nhận được máy). Có gói BH cao hơn, khách vui lòng liên hệ",
	"Nếu hết bảo hành, shop vẫn nhận hỗ trợ bảo hành tiếp có phí cực ưu đãi cho khách.",
	"Tặng kèm Full bộ Office 365 bản quyền, chuột không dây và túi chống sốc loại xịn.",
	"Có kèm Win bản quyền theo máy.",
	"Hỗ trợ cài đặt phần mềm trọn đời máy",
	"Tặng 3 năm bảo dưỡng vệ sinh tra keo kiểm tra lại máy.",
	"Hỗ trợ trả góp lãi suất 0% qua thẻ tín dụng, hoặc CMND - bằng lái xe (duyệt online rất nhanh)",
	"Hỗ trợ nâng cấp giá tốt, thâu lại máy bán ra giá cao, đổi cũ lấy mới giá tốt",
	"Có xuất VAT cho công ty",
	"Free ship toàn quốc, giao tận tay cho khách (KH vui lòng thanh toán đủ trước)",
	"Có ship COD: nhận hàng, kiểm tra ok mới phải thanh toán (toàn bộ phí ship Khách chịu với bên giao hàng)",
];

const guaranteeCondition = [
	{
		time: 3,
		price: 0,
	},
	{
		time: 6,
		price: 990000,
	},
	{
		time: 12,
		price: 1420000,
	},
];

const ProductDetail = () => {
	const { id } = useParams();
	const [openAccordion, setOpenAccordion] = useState(0);
	const [images, setImages] = useState([]);
	// const [isOpen, setIsOpen] = useState(false);
	const [product, setProduct] = useState({});
	const [price, setPrice] = useState(0);
	const [loading, setLoading] = useState(false);
	const [guarantee, setGuarantee] = useState(3);

	const handleOpen = (value) => {
		setOpenAccordion(value === openAccordion ? 0 : value);
	};

	const handleChangeGuarantee = (time, guaranteePrice, itemPrice) => {
		setGuarantee(time);
		setPrice(itemPrice + guaranteePrice);
	};

	// const closeModal = () => {
	// 	setIsOpen(false);
	// };

	// const openModal = () => {
	// 	setIsOpen(true);
	// };

	useEffect(() => {
		const getDetailData = async () => {
			setLoading(true);
			try {
				const response = await getProduct(id);
				setProduct(response.data);
				const combinedImages = [
					{
						imageUrl: response.data.image.imageUrl,
						width: response.data.image.width,
						height: response.data.image.height,
					},
					...response.data.additionalImages,
				];
				setImages(combinedImages);
				setPrice(response.data.price.value);
				setLoading(false);
				console.log(response.data);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};

		getDetailData();
	}, [id]);

	if (loading) {
		return <Loading />;
	}

	return (
		<div className="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-1 grid-flow-col gap-4">
			<div className="col-start-auto row-auto">
				<ImageSlider images={images} />
			</div>
			<div className="sm:row-span-2 sm:col-start-2 sm:row-start-1 col-start-1 row-start-2 row-end-3 flex flex-col gap-5">
				<div className="flex gap-2">
					{product.marketingPrice && (
						<div className="text-lg px-3 py-1 border border-red-900 bg-red-900 text-white font-bold rounded">
							Flash Sale
						</div>
					)}
					<div className="text-lg px-3 py-1 border border-red-900 text-red-900 font-bold rounded">
						{product.condition}
					</div>
				</div>
				<h1 className="font-bold text-blue-gray-900 sm:text-3xl text-lg text-justify">
					{product.title}
				</h1>
				<div className="flex gap-2">
					<p className="uppercase font-semibold">Hãng:</p>
					<p className="font-bold text-white px-2 bg-blue-800 rounded">
						{product.brand}
					</p>
				</div>
				<div>
					<div className="flex gap-2 items-center">
						<p className="font-bold text-red-900 text-3xl">
							{formatCurrency(price)}
						</p>
						{product.marketingPrice && (
							<del className="font-bold text-gray-500 line-through">
								{formatCurrency(product.marketingPrice.originalPrice?.value)}
							</del>
						)}
						{product.marketingPrice && (
							<del className="font-bold text-gray-500 line-through">
								({product.marketingPrice.discountPercentage}%)
							</del>
						)}
					</div>
					<p className="font-semibold">
						Giá nhìn thấy là giá về tay (đã bao gồm toàn bộ thuế + phí ship)
					</p>
				</div>
				<div>
					<div className="flex gap-2 items-center">
						<TruckIcon className="w-6 h-6" />
						<p className="text-base font-bold">Thời gian giao hàng</p>
					</div>
					<div>
						Thời gian hàng dự kiến: <b>{calculateDateShipping()}</b>
					</div>
				</div>
				<div className="flex gap-2 items-center">
					<ShieldCheckIcon className="w-6 h-6" />
					<p className="text-base font-bold">Chính sách bảo hành và cam kết</p>
				</div>
				<div className="flex flex-col gap-2">
					<p>
						Máy được <b>Bảo hành {guarantee} tháng</b> (tính từ ngày Khách Hàng
						nhận được máy). Khách có thể chọn mua thêm bảo hành khi nhận máy.
					</p>
					<div className="flex w-full gap-5">
						{guaranteeCondition.map((item, index) => (
							<div
								className={`flex flex-col items-center justify-center w-1/3 px-3 py-2 border rounded hover:cursor-pointer ${
									item.time === guarantee
										? "border-blue-600"
										: "border-gray-600"
								}`}
								key={index}
								onClick={() =>
									handleChangeGuarantee(
										item.time,
										item.price,
										product.price.value
									)
								}
							>
								<p className="font-semibold text-center">
									Bảo hành {item.time} tháng
								</p>
								<p>{formatCurrency(item.price)}</p>
							</div>
						))}
					</div>
				</div>
				<p className="text-justify">
					<b>Mô tả:</b> {product.shortDescription}
				</p>
			</div>
			<div className="sm:col-start-1 sm:row-start-2 col-start-1 row-start-3">
				<Accordion open={openAccordion === 1}>
					<AccordionHeader
						className="font-semibold text-blue-gray-900 text-lg"
						onClick={() => handleOpen(1)}
					>
						Chính sách mua hàng và vận chuyển
					</AccordionHeader>
					<AccordionBody>
						{term.map((item, index) => (
							<div key={index}>
								<ul className="list-disc pl-5">
									{item.term.map((term, index) => (
										<li key={index}>
											<p className="text-justify">{term}</p>
										</li>
									))}
								</ul>
								<h2 className="font-semibold text-lg">Lưu ý</h2>
								<ul className="list-disc pl-5">
									{item.note.map((note, index) => (
										<li key={index}>
											<p className="text-justify">{note}</p>
										</li>
									))}
								</ul>
							</div>
						))}
					</AccordionBody>
				</Accordion>
				<Accordion open={openAccordion === 2}>
					<AccordionHeader
						className="font-semibold text-blue-gray-900 text-lg"
						onClick={() => handleOpen(2)}
					>
						Quyền lợi mua hàng
					</AccordionHeader>
					<AccordionBody>
						<ol className="list-decimal pl-5">
							{benifits.map((item, index) => (
								<li key={index}>
									<p className="text-justify">{item}</p>
								</li>
							))}
						</ol>
					</AccordionBody>
				</Accordion>
				<Accordion open={openAccordion === 3}>
					<AccordionHeader
						className="font-semibold text-blue-gray-900 text-lg"
						// onClick={() => handleOpen(3)}
					>
						Đánh giá của khách hàng
					</AccordionHeader>
				</Accordion>
			</div>
		</div>
	);
};

export default ProductDetail;
