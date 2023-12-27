import service_1 from "../../assets/service_1.svg";
import service_2 from "../../assets/service_2.svg";
import service_3 from "../../assets/service_3.svg";
import service_4 from "../../assets/service_4.svg";
import service_5 from "../../assets/service_5.svg";

const Instruct = () => {
	return (
		<section className="flex md:flex-row flex-col w-full justify-between gap-5 h-fit">
			<div className="md:w-2/3 w-full h-full">
				<h3 className="font-bold text-3xl mb-5">Cách săn deal trên web</h3>
				<video
					className="h-[450px] w-full rounded-lg object-cover"
					controls
					autoPlay
				>
					<source
						src="https://docs.material-tailwind.com/demo.mp4"
						type="video/mp4"
					/>
					Your browser does not support the video tag.
				</video>
			</div>
			<div className="flex flex-col md:w-1/3 w-full h-full">
				<h3 className="font-bold text-3xl mb-5">Dịch vụ</h3>
				<div className="flex items-center rounded-t-lg gap-5 border-t border-l border-r p-5">
					<img src={service_1} alt="icon" className="w-14 h-14" />
					<div className="flex flex-col gap-2">
						<h5 className="font-medium">Chuyên hàng quốc tế</h5>
						<p className="text-gray-700 text-sm">
							Hàng chính hãng 100% từ nguồn gốc uy tín
						</p>
					</div>
				</div>
				<div className="flex items-center gap-5 border p-5">
					<img src={service_2} alt="icon" className="w-14 h-14" />
					<div className="flex flex-col gap-2">
						<h5 className="font-medium">Hỗ trợ khách hàng</h5>
						<p className="text-gray-700 text-sm">Tận tâm phục vụ khách hàng</p>
					</div>
				</div>
				<div className="flex items-center gap-5 border p-5">
					<img src={service_3} alt="icon" className="w-14 h-14" />
					<div className="flex flex-col gap-2">
						<h5 className="font-medium">Chính sách sản phẩm</h5>
						<p className="text-gray-700 text-sm">
							Chính sách bảo hành và ưu đãi hấp dẫn
						</p>
					</div>
				</div>
				<div className="flex items-center gap-5 border p-5">
					<img src={service_4} alt="icon" className="w-14 h-14" />
					<div className="flex flex-col gap-2">
						<h5 className="font-medium">Thanh toán đa dạng</h5>
						<p className="text-gray-700 text-sm">
							Nhiều phương thức thanh toán
						</p>
					</div>
				</div>
				<div className="flex items-center rounded-b-lg gap-5 border-b border-l border-r p-5">
					<img src={service_5} alt="icon" className="w-14 h-14" />
					<div className="flex flex-col gap-2">
						<h5 className="font-medium">Khuyến mãi liên tục</h5>
						<p className="text-gray-700 text-sm">
							Nhiều chương trình khuyến mãi khách hàng
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Instruct;
