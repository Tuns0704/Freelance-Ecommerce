import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { PropTypes } from "prop-types";
import { useState, useEffect } from "react";

const initImages = [
	{
		slideImg: "/img/pic2.png",
	},
	{
		slideImg: "/img/pic7.png",
	},
	{
		slideImg: "/img/pic8.png",
	},
	{
		slideImg: "/img/pic2.png",
	},
	{
		slideImg: "/img/pic7.png",
	},
	{
		slideImg: "/img/pic8.png",
	},
	{
		slideImg: "/img/pic2.png",
	},
	{
		slideImg: "/img/pic7.png",
	},
	{
		slideImg: "/img/pic8.png",
	},
];

const ImageSlider = ({ images }) => {
	const [slides, setSlides] = useState(initImages);

	useEffect(() => {
		if (images && images.length < 8) {
			const copiedSlides = [...images];
			while (copiedSlides.length < 8) {
				const randomIndex = Math.floor(Math.random() * images.length);
				copiedSlides.push(images[randomIndex]);
			}
			setSlides(copiedSlides);
		} else {
			setSlides(images || []);
		}
	}, [images]);

	return (
		<Swiper
			slidesPerView={2}
			spaceBetween={20}
			speed={5000}
			autoplay={{
				delay: 0,
				disableOnInteraction: false,
			}}
			modules={[Autoplay]}
			loop={true}
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
			className="w-full h-fit py-2"
		>
			{slides.map((item, index) => (
				<SwiperSlide key={index}>
					<img
						src={item.slideImg}
						alt={`sliderImage${index}`}
						className="w-60 h-60 object-cover rounded-lg shadow-lg"
					/>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

ImageSlider.propTypes = {
	images: PropTypes.array,
};

export default ImageSlider;
