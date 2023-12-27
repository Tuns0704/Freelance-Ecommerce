import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const slideItem = [
	{
		id: 1,
		img: "/img/pic2.png",
	},
	{
		id: 2,
		img: "/img/pic7.png",
	},
	{
		id: 3,
		img: "/img/pic8.png",
	},
	{
		id: 4,
		img: "/img/pic2.png",
	},
	{
		id: 5,
		img: "/img/pic7.png",
	},
	{
		id: 6,
		img: "/img/pic8.png",
	},
	{
		id: 7,
		img: "/img/pic2.png",
	},
	{
		id: 8,
		img: "/img/pic7.png",
	},
	{
		id: 9,
		img: "/img/pic8.png",
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
