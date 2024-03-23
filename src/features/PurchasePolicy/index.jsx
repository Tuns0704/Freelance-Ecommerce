const policy = [
	{
		title: "3. Trách nhiệm của OrderUS:",
		desc: [
			"OrderUS đảm bảo mua đúng thông tin đơn hàng mà khách hàng cung cấp (website, giá cả, size, màu sắc).",
			"Theo dõi, cập nhật thông tin, tư vấn và hỗ trợ khách hàng để hoàn tất các thủ tục giúp việc giao dịch được thành công.",
			"Thông báo, giải đáp thắc mắc trong quá trình khách hàng đặt đơn hàng",
			"Đảm bảo bảo mật thông tin khách hàng",
			"Đối với đơn hàng bị hư hại hoặc bị thất lạc trong quá trình vận chuyển, Shop sẽ bảo hiểm đơn hàng 100% cho khách hàng, hoàn lại toàn bộ tiền cọc cho khách hàng.",
		],
	},
	{
		title: "4. Trách nhiệm của Khách hàng:",
		desc: [
			"Tìm hiểu kỹ thông tin chi tiết sản phẩm trước khi đặt mua hàng như: thông số kỹ thuật sản phẩm, chất liệu, màu sắc, cân nặng … trước khi đặt hàng.",
			"Nhằm hỗ trợ và bảo hiểm hàng hóa được tốt nhất, khi nhận được đơn hàng Khách hàng vui lòng quay kỹ lại quá trình mở thùng nhận hàng có băng keo có hình của nhà Vận Chuyển trên đó. OrderUS từ chối xử lý các trường hợp không có video quay lại.",
			"Thông báo, giải đáp thắc mắc trong quá trình khách hàng đặt đơn hàng",
			"Đảm bảo đầy đủ thông tin về người nhận: Địa chỉ, họ tên, số điện thoại nhận hàng (ở Việt Nam). OrderUS sẽ không chịu trách nhiệm nếu thông tin không đầy đủ hoặc sai sót dẫn đến việc thất lạc trong quá trình mua hàng hoặc vận chuyển.",
		],
	},
	{
		title: "5. Định nghĩa:",
		desc: [
			"“Khách hàng”: Là các cá nhân/tổ chức tại lãnh thổ Việt Nam, có nhu cầu đặt mua hộ các sản phẩm trên các website quốc tế thông qua website OrderUS",
			"“Website OrderUS”: Là công ty cung cấp dịch vụ thương mại điện tử quốc tế, có chức năng như một đơn vị trung gian tiến hành việc đặt hàng hóa (mua hộ trực tuyến) các mặt hàng được đăng bán trên các các sàn giao dịch thương mại điện tử quốc tế: eBay.com, Amazon.com, Walmart, Bestbuy, Dell, Lenovo …",
			"“Người bán - seller”: Là cá nhân/doanh nghiệp đăng bán các mặt hàng được đăng bán trên các các sàn giao dịch thương mại điện tử quốc tế: eBay.com, Amazon.com, Walmart, Bestbuy, Dell, Lenovo …",
			"“Kho – đơn vị vận chuyển”: có nghĩa và bao gồm toàn bộ các hoạt động và dịch vụ mà chúng tôi thực hiện có liên quan đến việc vận chuyển lô hàng.",
		],
	},
];

const PurchasePolicy = () => {
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-blue-gray-900 text-center">
				Chính Sách Mua Hàng Hộ (Order Từ Nước Ngoài) Của OrderUS
			</h1>
			<div>
				<h2 className="text-lg font-bold text-blue-gray-900">
					1. Chính sách quyền lợi của khách hàng khi order mặt hàng là Máy Tính
					Xách Tay (Laptop) tại OrderUS:
				</h2>
				<ol className="list-decimal pl-10">
					<li>
						Được bảo hiểm hàng hóa 100% (đơn bị thất lạc hoặc rơi vỡ sẽ được
						hoàn lại tiền 100%)
					</li>
					<li>Hoàn tiền 100% bất cứ khi nào nếu phát hiện máy sửa chữa</li>
					<li>
						Có nhiều gói Bảo hành từ 3 tháng (giá rẻ nhất) tới 24 tháng cho
						khách chọn.
					</li>
					<li>
						Máy được bảo hành tất cả các lỗi từ Nhà sản xuất (tính từ ngày Khách
						Hàng nhận được máy)
					</li>
					<li>
						Nếu hết bảo hành, shop vẫn nhận hỗ trợ bảo hành tiếp có phí cực ưu
						đãi cho khách.
					</li>
					<li>Được mượn máy xài tạm nếu máy cần bảo hành.</li>
					<li>
						Tặng kèm Full bộ Office 365 bản quyền, chuột không dây và túi chống
						sốc loại xịn
					</li>
					<li>Tặng kèm Win bản quyền theo máy</li>
					<li>Hỗ trợ cài đặt phần mềm trọn đời máy</li>
					<li>Tặng 3 năm bảo dưỡng vệ sinh tra keo kiểm tra lại máy</li>
					<li>
						Hỗ trợ trả góp lãi suất 0% qua thẻ tín dụng, hoặc CMND - bằng lái xe
						(duyệt online rất nhanh)
					</li>
					<li>
						Hỗ trợ nâng cấp giá tốt, thâu lại máy bán ra giá cao, đổi cũ lấy mới
						giá tốt
					</li>
					<li>Có xuất VAT cho công ty</li>
					<li>
						Free ship toàn quốc, giao tận tay cho khách (KH vui lòng thanh toán
						đủ trước)
					</li>
					<li>
						Có ship COD: nhận hàng, kiểm tra ok mới phải thanh toán (toàn bộ phí
						ship Khách chịu với bên giao hàng)
					</li>
				</ol>
			</div>
			<div>
				<h2 className="text-lg font-bold text-blue-gray-900">
					2. Các điều khoản chung:
				</h2>
				<ol className="list-disc pl-10">
					<li>
						Sau khi đồng ý với đơn hàng, Khách hàng chuyển khoản trước 10% tổng
						giá trị đơn hàng trên website để cọc săn hàng:NGÂN HÀNG Á CHÂU ACB -
						CN Hà Nội (PGD HA DONG) - ĐOÀN CÔNG HẢI - 36362345678
					</li>
					<li>
						Sau khi mua thành công, đơn hàng dự kiến sẽ về tới Việt Nam sau 2
						đến 4 tuần làm việc kể từ khi hàng về kho Mỹ (có cập nhật tracking
						liên tục).
					</li>
					<li>
						Khi đơn hàng về tới Việt Nam, khách hàng có thể ghé Shop lấy máy
						hoặc nhờ giao hàng, Shop sẽ thu 90% tiền hàng còn lại khi Khách nhận
						máy.
					</li>
				</ol>
				<div className="font-semibold">Lưu ý:</div>
				<ol className="list-disc pl-10">
					<li>
						Trường hợp không xử lý đơn hàng thành công, Khách hàng có thể chọn
						mua tiếp sản phẩm khác hoặc yêu cầu nhận lại tiền cọc.
					</li>
					<li>
						Khách đã cọc nhưng Shop chưa mua được hàng mà muốn hủy đơn, khách
						phải báo Shop trước 6 tiếng để xử lý hủy đơn (do VN lệch múi giờ với
						bên Mỹ)
					</li>
					<li>
						Nếu đơn đã được Shop mua thì không hủy được, khách hủy sẽ bị mất
						tiền cọc (10% đơn hàng). Do tính chất phức tạp của việc giao dịch
						quốc tế nên shop không nhận return trả lại hàng người bán trong mọi
						trường hợp.
					</li>
					<li>
						Nếu đơn hàng về chậm hơn 45 ngày vì các lý do không mong muốn, Khách
						hàng có thể yêu cầu hủy đơn và nhận lại toàn bộ 100% tiền cọc. Khách
						hàng sẽ được tặng 01 voucher mua hàng lần sau trị giá 300.000đ.
					</li>
				</ol>
			</div>
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

export default PurchasePolicy;
