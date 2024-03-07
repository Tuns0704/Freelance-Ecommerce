import { SwiperSlide, Swiper } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

const AboutUs = () => {
	const aboutUs = [
		{
			title: "Mua hàng Mỹ đa dạng",
			content: `Chúng tôi hỗ trợ mua hàng tại hầu hết các website lớn chính hãng
								tại Mỹ (Ebay, Amazon, Walmart, Bestbuy, Cotso …). Giúp bạn tìm
								được các hàng hóa, sản phẩm trong nước không có sẵn hoặc giá rất
								cao. Mẫu mã vô cùng đa dạng và phong phú. Tiếp cận được sản phẩm
								mới nhanh hơn, khi vừa ra mắt.`,
		},
		{
			title: "Cập nhật TOP DEAL giá sốc liên tục",
			content: `Website của chúng tôi sẽ tự động cập nhật hàng ngàn deal khuyến
      mãi giá giảm mạnh nhất và hiển thị ngay trên trang đầu rất trực
      quan cho khách hàng theo dõi.`,
		},
		{
			title: "Mục GIÁ TỐT NHẤT và lịch sử thay đổi giá của sản phẩm",
			content: `Đây là thông tin vô cùng hữu ích giúp khách hàng biết được mức
      giảm giá thấp nhất của sản phẩm để mua được với mức giá tốt nhất`,
		},
		{
			title: "Hệ thống an toàn và hiện đại",
			content: `Tất cả đơn hàng khi mua qua website đều được bảo hiểm 100%.
      Khách hàng có thể theo dõi đơn hàng qua web và được cập nhật
      liên tục.`,
		},
		{
			title: "Chăm sóc tận tâm",
			content: `Chúng tôi đặt sự hài lòng của bạn lên hàng đầu. Có đội ngũ nhân
      viên tư vấn, hỗ trợ riêng, nhanh chóng.`,
		},
	];
	const term = [
		"Được bảo hiểm hàng hóa 100% (đơn bị thất lạc hoặc rơi vỡ sẽ được hoàn lại tiền 100%)",
		"Hoàn tiền 100% bất cứ khi nào nếu phát hiện máy sửa chữa",
		"Có nhiều gói Bảo hành từ 1 tháng (giá rẻ nhất) tới 24 tháng cho khách chọn.",
		"Máy được bảo hành tất cả các lỗi từ Nhà sản xuất (tính từ ngày Khách Hàng nhận được máy).",
		"Nếu hết bảo hành, shop vẫn nhận hỗ trợ bảo hành tiếp có phí cực ưu đãi cho khách.",
		"Được mượn máy xài tạm nếu máy cần bảo hành.",
		"Tặng kèm Full bộ Office 365 bản quyền, chuột không dây và túi chống sốc loại xịn",
		"Tặng kèm Win bản quyền theo máy",
		"Hỗ trợ cài đặt phần mềm trọn đời máy",
		"Tặng 3 năm bảo dưỡng vệ sinh tra keo kiểm tra lại máy",
		"Hỗ trợ trả góp lãi suất 0% qua thẻ tín dụng, hoặc CMND - bằng lái xe (duyệt online rất nhanh)",
		"Hỗ trợ nâng cấp giá tốt, thâu lại máy bán ra giá cao, đổi cũ lấy mới giá tốt",
		"Có xuất VAT cho công ty",
		"Free ship toàn quốc, giao tận tay cho khách (KH vui lòng thanh toán đủ trước)",
		"Có ship COD: nhận hàng, kiểm tra ok mới phải thanh toán (toàn bộ phí ship Khách chịu với bên giao hàng)",
	];
	const img = [
		"/img/pic2.png",
		"/img/pic7.png",
		"/img/pic8.png",
		"/img/pic2.png",
		"/img/pic7.png",
		"/img/pic8.png",
		"/img/pic2.png",
		"/img/pic7.png",
		"/img/pic8.png",
		"/img/pic2.png",
		"/img/pic7.png",
		"/img/pic8.png",
	];
	return (
		<div className="flex flex-col gap-5">
			<h1 className="flex justify-center items-center text-3xl font-semibold mb-5">
				Về Chúng Tôi
			</h1>
			<div className=" text-lg">
				<h2 className="font-semibold">Về Orderus.vn</h2>
				<p className="text-justify">
					Orderus.vn là website thương mại điện tử cung cấp dịch vụ mua hàng hộ
					và vận chuyển hàng hộ từ Mỹ về Việt Nam – chủ yếu là các thiết bị công
					nghệ. Nền tảng Orderus.vn giúp kết nối người Việt với các nhà cung cấp
					sản phẩm tại Mỹ. Chúng tôi kết nối với các sàn thương mại điện tử lớn
					tại Mỹ (Ebay, Amazon, Walmart, Bestbuy, Cotso …) và hàng chục đối tác
					vận chuyển tại Mỹ (Fedex, UPS, DHL …) nhằm mang đến trải nghiệm mua
					sắm vượt trội cho khách hàng
				</p>
			</div>
			<div className="flex justify-center">
				<img
					src="/public/img/pic2.png"
					className="rounded justify-center h-[40vh] object-cover"
				/>
			</div>
			<div className="flex flex-col gap-5">
				<div>
					<h2 className="font-semibold text-xl mb-2">
						Vì sao phải order hàng Mỹ tại Haistore.vn?
					</h2>
					<div className="pl-8 md:pl-12">
						<ol className="list-decimal ">
							{aboutUs.map((item, index) => (
								<li key={index}>
									<p className="font-semibold text-lg">{item.title}</p>
									<p className="text-justify">{item.content}</p>
								</li>
							))}
						</ol>
					</div>
				</div>
				<div>
					<h2 className="font-semibold text-xl mb-2 text-justify">
						Chính sách quyền lợi của khách hàng khi order mặt hàng là Máy Tính
						Xách Tay (Laptop) tại OrderUs:
					</h2>
					<div className="pl-8 md:pl-12">
						<ol className="list-decimal">
							{term.map((item, index) => (
								<li className="text-lg text-justify" key={index}>
									{item}
								</li>
							))}
						</ol>
					</div>
				</div>
			</div>
			<div>
				<div className="flex gap-2 flex-col justify-center items-center border-b pb-5">
					<h2 className="font-semibold text-2xl">Thư Viện</h2>
					<p>Hình ảnh thực tế tại Orderus.vn</p>
				</div>
				<Swiper
					className="w-full h-fit py-5 px-3"
					slidesPerView={1}
					spaceBetween={20}
					grid={{
						rows: 2,
						fill: "row",
					}}
					pagination={{
						clickable: true,
					}}
					modules={[Grid, Pagination]}
					breakpoints={{
						320: {
							slidesPerView: 1,
							grid: {
								rows: 1,
							},
							spaceBetween: 20,
						},
						640: {
							slidesPerView: 2,
							grid: {
								rows: 1,
							},
							spaceBetween: 10,
						},
						768: {
							slidesPerView: 3,
							grid: {
								rows: 2,
							},
							spaceBetween: 10,
						},
						1024: {
							slidesPerView: 3,
							grid: {
								rows: 2,
							},
							spaceBetween: 10,
						},
						1280: {
							slidesPerView: 4,
							grid: {
								rows: 2,
							},
							spaceBetween: 20,
						},
					}}
				>
					{img.map((product, index) => (
						<SwiperSlide
							key={index}
							className="flex relative flex-col gap-2 bg-white shadow rounded-lg hover:cursor-pointer"
						>
							<img
								src={product}
								alt="products"
								className="w-full object-cover self-center h-48 sm:h-28 md:h-48 rounded-lg"
							/>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div></div>

			<div>
				<iframe
					className="w-full h-[50vh]"
					src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d173537.2977969947!2d108.01555496858708!3d16.030762420278602!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31421827a3c439f5%3A0xdec2fb897aa16a90!2sGreenwich%20Vi%E1%BB%87t%20Nam!5e0!3m2!1svi!2s!4v1709810004170!5m2!1svi!2s"
					style={{ border: 0 }}
					allowfullscreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
				></iframe>
			</div>
		</div>
	);
};

export default AboutUs;
