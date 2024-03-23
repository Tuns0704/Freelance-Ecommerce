const policy = [
	{
		title: "1. Đối với hàng order",
		desc: [
			"Máy được bảo hành theo gói Khách hàng chọn: từ 1 tháng - 03 tháng. Máy được bảo hành tất cả các lỗi từ Nhà sản xuất (tính từ ngày Khách Hàng nhận được máy),. Khách có thể mua thêm gói bảo hành: 6 - 36 tháng + vui lòng liên hệ (Nếu hết bảo hành, shop vẫn nhận hỗ trợ bảo hành tiếp có phí cực ưu đãi cho khách)",
		],
	},
	{
		title: "2. Điều kiện bảo hành",
		desc: [
			"Sản phẩm đang trong thời hạn bảo hành, có tem bảo hành của nhà phân phối và có tem OrderUS. Hư hỏng được xác định do lỗi kỹ thuật hoặc do lỗi của nhà sản xuất.",
			"Tem bảo hành và mã vạch của công ty, của nhà cung cấp phải nguyên vẹn, không rách rời, vỡ nát, biến dạng, không bị tẩy xoá…",
			"Sản phẩm phải còn nguyên vẹn, không cong, vênh, rạn nứt, trầy xước, sứt mẻ, nứt khe cắm, vỡ…",
			"Dùng đúng nguồn điện, không bị mối mọt, côn trùng xâm nhập; không cháy nổ, phồng tụ; không bị ô xy hoá do đặt trong môi trường ẩm ướt…",
			"Chưa can thiệp vào phần cứng (tự ý tháo dỡ, sửa chữa…).",
			"Các điều kiện bảo hành của OrderUS đều tuân theo tiêu chuẩn bảo hành của hãng sản xuất hoặc nhà phân phối tại Việt Nam.",
			"Quý khách hàng lưu trữ phiếu xuất kho bán hàng hoặc đọc số điện thoại mua hàng để tiện bảo hành.",
			"Khi đến bảo hành, Quý khách hàng nên mang đầy đủ phụ kiện giống lúc mua, để trong trường hợp hết hàng đổi, OrderUS sẽ đổi qua dòng mới tương đương (nếu có) và sản phẩm này không nhất thiết phải là hàng mới 100%. Đổi một sản phẩm cấp cao hơn nếu khách hàng đồng ý mức giá thương lượng đổi bù. Thời hạn bảo hành được đánh dấu tiếp tục tính theo thời hạn bảo hành của sản phẩm cũ.",
		],
	},
	{
		title: "3. Điều kiện không bảo hành",
		desc: [
			"Sản phẩm hết thời hạn bảo hành. Thiết bị không do OrderUS bán ra.",
			"Tem bảo hành, mã vạch, chỉ số dung lượng, số serial number bị rách, mờ có dấu hiệu cạo sửa hay đánh tráo.",
			"Thiết bị do va chạm hoặc đã bị rơi rớt, bể mẻ, móp méo, biến dạng, trầy xước, rỉ xét, xì hoặc phù tụ …",
			"Thiết bị có dấu hiệu cháy nổ, chuột bọ, côn trùng xâm nhập hoặc đặt trong môi trường ẩm ướt.",
			"Hư hỏng do thiên tai hoả hoạn, sử dụng nguồn điện không ổn định hoặc do vận chuyển không đúng quy cách.",
			"Không bảo hành các lỗi do phần mềm gây ra, các phụ kiện tiêu hao đi kèm như: quạt, mực, dây cáp…",
			"OrderUS không chịu trách nhiệm với dữ liệu trong ổ cứng , SSD hư …",
			"Màn hình cấn, bể, sọc chỉ, số điểm chết nhỏ hơn 5 điểm, màn hình bị đốm sáng.",
			"Pin chai do sử dụng.",
			"Các trường hợp nhà sản xuất từ chối bảo hành do lỗi của người sử dụng.",
		],
	},
	{
		title: "4. Địa điểm nhận và trả bảo hành",
		desc: [
			"Địa chỉ: 18 Thân Văn Nhiếp, P.An Phú, TP.Thủ Đức - Link Google Map: https://goo.gl/maps/bXS3ksxQWMdWMZLU6",
			"Gọi bảo hành: 0819 15 3456",
			"Gọi khiếu nại góp ý: 0903 392 492",
			"Giờ làm việc : 09h00 – 19h00 các ngày trong tuần ( CN shop nghỉ)",
		],
	},
];
const WarrantyPolicy = () => {
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-blue-gray-900 text-center">
				Chính Sách Bảo Hành - Đổi Trả
			</h1>
			{policy.map(({ title, desc }, key) => (
				<div key={key}>
					<h2 className="text-lg font-bold text-blue-gray-900">{title}</h2>
					<ul className="list-disc pl-10">
						{desc.map((item, key) => (
							<li key={key} className="text-blue-gray-900">
								{item}
							</li>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};

export default WarrantyPolicy;
