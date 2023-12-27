import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const slideItem = [
	{
		id: 1,
		img: "/src/assets/pic2.jpg",
	},
	{
		id: 2,
		img: "/src/assets/pic7.jpg",
	},
	{
		id: 3,
		img: "/src/assets/pic8.jpg",
	},
	{
		id: 4,
		img: "/src/assets/pic2.jpg",
	},
	{
		id: 5,
		img: "/src/assets/pic7.jpg",
	},
	{
		id: 6,
		img: "/src/assets/pic8.jpg",
	},
	{
		id: 7,
		img: "/src/assets/pic2.jpg",
	},
	{
		id: 8,
		img: "/src/assets/pic7.jpg",
	},
	{
		id: 9,
		img: "/src/assets/pic8.jpg",
	},
];

const ImageSlider = () => {
	return (
		<Swiper
			slidesPerView={2}
			spaceBetween={20}
			loop={true}
			speed={5000}
			autoplay={{
				delay: 0,
				disableOnInteraction: false,
			}}
			breakpoints={{
				640: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				768: {
					slidesPerView: 4,
					spaceBetween: 20,
				},
				1024: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
				1280: {
					slidesPerView: 7,
					spaceBetween: 20,
				},
			}}
			modules={[Autoplay]}
			className="w-full h-fit py-5"
		>
			{slideItem.map((item) => (
				<SwiperSlide key={item.id}>
					<img
						src={item.img}
						alt="sliderImage"
						className="w-60 h-60 object-cover rounded-lg shadow-lg"
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default ImageSlider;
