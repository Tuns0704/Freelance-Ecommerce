const banks = [
	{
		id: 1,
		name: "Viettinbank",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "6.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 2,
		name: "Citibank",
		month3: "3.9%",
		month6: "5.9%",
		month9: "6.9%",
		month12: "7.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 3,
		name: "SeABank",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 4,
		name: "KienLongBank",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "6.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 5,
		name: "TPBank",
		month3: "2.9%",
		month6: "5.9%",
		month9: "6.9%",
		month12: "7.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 6,
		name: "Vietcombank",
		month3: "3.9%",
		month6: "4.9%",
		month9: "5.9%",
		month12: "7.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 7,
		name: "Maritimebank",
		month3: "2.9%",
		month6: "4.9%",
		month9: "5.9%",
		month12: "6.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 8,
		name: "VPBank",
		month3: "2.9%",
		month6: "3.9%",
		month9: "7.9%",
		month12: "8.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 9,
		name: "HSBC",
		month3: "2.9%",
		month6: "5.9%",
		month9: "6.9%",
		month12: "8.9%",
		month15: "",
		month18: "9.9%",
		month24: "12.9%",
	},
	{
		id: 10,
		name: "VIB",
		month3: "3.5%",
		month6: "5.4%",
		month9: "6.9%",
		month12: "8.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 11,
		name: "BIDV",
		month3: "2%",
		month6: ",5%",
		month9: "4.9%",
		month12: "6.5%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 12,
		name: "MBBank",
		month3: "2.9%",
		month6: "4.9%",
		month9: "5.9%",
		month12: "6.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 13,
		name: "ACB",
		month3: "2.5%",
		month6: "4.9%",
		month9: "5.9%",
		month12: "7.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 14,
		name: "SHB",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 15,
		name: "BanViet",
		month3: "2.9%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 16,
		name: "Techcombank",
		month3: "3%",
		month6: "4.9%",
		month9: "5.9%",
		month12: "7.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 17,
		name: "SCB",
		month3: "3.9%",
		month6: "4.9%",
		month9: "6.9%",
		month12: "8.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 18,
		name: "OCB",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 19,
		name: "Standard-Chartered",
		month3: "3.5%",
		month6: "5.5%",
		month9: "7.5%",
		month12: "8.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 20,
		name: "Eximbank",
		month3: "2%",
		month6: "3.5%",
		month9: "4.5%",
		month12: "6.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 21,
		name: "HomeCredit",
		month3: "3.9%",
		month6: "5.9%",
		month9: "7.9%",
		month12: "8.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 22,
		name: "PVCombank",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 23,
		name: "LienVietPostBank",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 24,
		name: "HDBank",
		month3: "2.9%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 25,
		name: "WOORIBANK",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 26,
		name: "Sacombank",
		month3: "2%",
		month6: "4.9%",
		month9: "5.9%",
		month12: "7.9%",
		month15: "",
		month18: "9.9%",
		month24: "12.9%",
	},
	{
		id: 27,
		name: "MCredit",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 28,
		name: "LOTTE_FINANCE",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 29,
		name: "ShinhanFinance",
		month3: "2%",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 30,
		name: "NamA",
		month3: "",
		month6: "3.9%",
		month9: "",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 31,
		name: "SHBVN",
		month3: "",
		month6: "3.9%",
		month9: "4.9%",
		month12: "5.9%",
		month15: "",
		month18: "",
		month24: "",
	},
	{
		id: 32,
		name: "FECredit",
		month3: "",
		month6: "",
		month9: "4.9%",
		month12: "5.9%",
		month15: "6.9%",
		month18: "7.9%",
		month24: "",
	},
];

const InstallmentPolicy = () => {
	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-blue-gray-900 text-center">
				Chính Sách Trả Góp
			</h1>
			<div className="flex justify-center ">
				<img
					src="img/installment.png"
					alt="installment"
					className="md:w-2/3 rounded-lg"
				/>
			</div>
			<section className="">
				<p className="text-base font-medium text-justify">
					Nhằm nâng cao chất lượng phục vụ khách hàng cũng như hỗ trợ tối đa cho
					khách hàng trong việc thuận tiện mua những mặt hàng yêu thích.{" "}
					<b>OrderUS</b> phối hợp với công ty mPOS và nhiều đơn vị công ty tài
					chính uy tín mang đến cho khách hàng phương thức mua sắm trả góp dễ
					dàng, nhanh chóng qua 2 hình thức trả góp sau:
				</p>
				<ol className="list-decimal pl-8 md:pl-12">
					<li>Trả góp qua CMND hoặc thẻ căn cước công dân.</li>
					<li>Trả góp 0% qua thẻ tín dụng</li>
				</ol>
				<p className="text-base font-medium text-justify">
					Với sự hỗ trợ linh họat của các ngân hàng và công ty tài chính hàng
					đầu, bạn chỉ cần mất chưa tới 30 phút để có thể sở hữu ngay một sản
					phẩm cao cấp.
				</p>
			</section>
			<section className="flex flex-col gap-2">
				<h1 className="font-bold text-lg">
					Phương thức 1: Trả góp bằng CMND hoặc CCCD qua các Công ty tài chính (
					HD Saison, Homecredit):
				</h1>
				<p className="text-base font-medium text-justify">
					Mua hàng trả góp qua công ty tài chính là hình thức khách hàng vay
					tiền để mua sản phẩm bằng uy tín của mình, không cần phải thế chấp tài
					sản (nhà đất, xe…), không công chứng giấy tờ, không chứng minh tài
					chính. Tuy nhiên khách hàng phải chịu mức lãi suất cao hơn lãi suất
					thông thường của ngân hàng.
				</p>
				<table className="w-full border border-blue-gray-900">
					<thead className="text-left border-b border-blue-gray-900">
						<tr className="px-2 text-lg">
							<th className="p-2 w-1/2 border-r border-blue-gray-900">
								Điểm mạnh
							</th>
							<th className="pl-2 w-1/2">Điểm yếu</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="border-r border-blue-gray-900">
								<ul className="list-disc pl-10">
									<li>Không cần thẻ tín dụng.</li>
									<li>Không cần vay qua ngân hàng nhiều thủ tục rườm rà.</li>
									<li>Không cần vay qua ngân hàng nhiều thủ tục rườm rà.</li>
									<li>
										Thời gian nhanh chóng, tiết kiệm được thời gian cho khách
										hàng.
									</li>
									<li>
										Tất cả sản phẩm được bán tại cửa hàng đều được áp dụng trả
										góp.
									</li>
									<li>Mức vay lên đến 30.000.000 VNĐ.</li>
								</ul>
							</td>
							<td>
								<ul className="list-disc pl-10">
									<li>Từ 18 tuổi trở lên cần: CMND hoặc CCCD</li>
									<li>
										Thời gian duyệt 15 – 30 phút ( tùy hồ sơ của mỗi khách
										hàng).
									</li>
									<li>Trả trước số tiền từ 30% giá trị sản phẩm</li>
								</ul>
							</td>
						</tr>
					</tbody>
				</table>
			</section>
			<section className="flex flex-col gap-2">
				<h1 className="font-bold text-lg">
					Phương thức 2: TRẢ GÓP 0% QUA MPOS TẠI ORDER US
				</h1>
				<p className="text-base font-medium text-justify">
					Điểm đặc biệt của chương trình trả góp lãi suất 0% bằng thẻ tín dụng
					thông qua MPOS là cho phép bạn mua hàng bằng thẻ tín dụng và trả dần
					trong vòng từ 3 – 12 tháng mà không phải bổ sung bất kỳ giấy tờ chứng
					minh nào. (Khách hàng cần cung cấp CMND để xác minh chủ thẻ).
				</p>
				<ul className="list-disc pl-10">
					<li>Có phí chuyển đổi (tùy theo từng ngân hàng và kỳ hạn)</li>
				</ul>
				<div className="flex justify-center">
					<img
						src="img/installment2.png"
						alt="installment2"
						className="md:w-3/4 rounded-lg"
					/>
				</div>
				<div>
					<h1 className="font-bold text-base">QUY TRÌNH MUA HÀNG TRẢ GÓP 0%</h1>
					<ul className="list-disc pl-10">
						<li>Bước 1: Chọn mua sản phẩm.</li>
						<li>Bước 2: Chọn số tiền và số tháng muốn trả góp.</li>
						<li>
							Bước 3: Quẹt thẻ tín dụng trả góp qua thiết bị mPoS tại cửa hàng.
						</li>
						<li>Bước 4: Chủ thẻ xác nhận giao dịch trả góp.</li>
						<li>Bước 5: Thanh toán với ngân hàng hàng tháng.</li>
					</ul>
					<p className="text-base font-medium text-justify">
						Số tiền trả góp sẽ được chia ra hàng tháng và sẽ được gửi đến khách
						hàng trong bảng sao kê chi tiết. Khách hàng phải thanh toán số tiền
						này đúng hạn để không phát sinh thêm lãi suất của ngân hàng.
					</p>
				</div>
				<h1 className="font-bold text-base">
					PHÍ THAM GIA CHƯƠNG TRÌNH TRẢ GÓP (cập nhật ngày 07/2023)
				</h1>
				<div className="relative overflow-x-auto">
					<table className="w-full border border-blue-gray-900">
						<thead className="text-left border-b border-blue-gray-900">
							<tr>
								<th className="p-2 border-r border-blue-gray-900">STT</th>
								<th className="p-2 w-1/6 border-r border-blue-gray-900">
									Ngân hàng
								</th>
								<th className="p-2 border-r border-blue-gray-900">3 tháng</th>
								<th className="p-2 border-r border-blue-gray-900">6 tháng</th>
								<th className="p-2 border-r border-blue-gray-900">9 tháng</th>
								<th className="p-2 border-r border-blue-gray-900">12 tháng</th>
								<th className="p-2 border-r border-blue-gray-900">15 tháng</th>
								<th className="p-2 border-r border-blue-gray-900">18 tháng</th>
								<th>24 tháng</th>
							</tr>
						</thead>
						<tbody>
							{banks.map((item) => (
								<tr className="border-b border-blue-gray-900" key={item.id}>
									<td className="p-2 border-r border-blue-gray-900">
										{item.id}
									</td>
									<td className="p-2 border-r border-blue-gray-900">
										{item.name}
									</td>
									<td className="p-2 border-r border-blue-gray-900">
										{item.month3}
									</td>
									<td className="p-2 border-r border-blue-gray-900">
										{item.month6}
									</td>
									<td className="p-2 border-r border-blue-gray-900">
										{item.month9}
									</td>
									<td className="p-2 border-r border-blue-gray-900">
										{item.month12}
									</td>
									<td className="p-2 border-r border-blue-gray-900">
										{item.month15}
									</td>
									<td className="p-2 border-r border-blue-gray-900">
										{item.month18}
									</td>
									<td>{item.month24}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<p className="text-base font-medium text-justify">
					Phí chuyển đổi trả góp do ngân hàng phát hành thẻ thu. Ngoài ra sẽ
					không phát sinh thêm lãi suất.
				</p>
				<h1 className="font-bold text-base">Lưu ý.</h1>
				<ul className="list-disc pl-10">
					<li>
						Maritimebank thu của chủ thẻ 3% phí quản lý trả góp trên giá trị
						giao dịch
					</li>
					<li>
						Techcombank sẽ thu phí chuyển đổi giao dịch của Chủ thẻ khi tham gia
						trả góp là 1.1%*Giá trị giao dịch (đã bao gồm VAT, tối thiểu
						100.000VNĐ/1 giao dịch)
					</li>
					<li>
						Số tiền trả góp sẽ được chia ra hàng tháng và sẽ được gửi đến khách
						hàng trong bảng sao kê chi tiết. Khách hàng phải thanh toán số tiền
						này đúng hạn để không phát sinh thêm lãi suất của ngân hàng.
					</li>
					<li>
						Chú ý tới ngày sao kê của bạn:Chúng tôi khuyến cáo bạn nên mua hàng
						trước ít nhất kỳ sao kê là 2 ngày(Ví dụ ngày sao kê của bạn là ngày
						20 hàng tháng thì bạn nên thực hiện mua trước ngày 18 hoặc sau ngày
						20) vì tổ chức trả góp Mpos không gửi hồ sơ trả góp của bạn qua ngân
						hàng để làm kịp thủ tục chuyển đổi.
					</li>
				</ul>
				<h1 className="font-bold text-base">
					Để biết thêm thông tin, vui lòng liên hệ
				</h1>
				<ul>
					<li>
						<p>
							<b>Địa chỉ :</b> 18 Thân Văn Nhiếp, P.An Phú, TP.Thủ Đức
						</p>
					</li>
					<li>
						<p>
							<b>Hotline :</b> 0903 392 492 – 0973 46 0304
						</p>
					</li>
				</ul>
			</section>
		</div>
	);
};

export default InstallmentPolicy;
