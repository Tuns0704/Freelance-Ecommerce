import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const ImageSlider = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 768);
		};

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const handleSlideClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className="flex flex-col-reverse sm:flex-row w-full justify-between h-fit gap-4">
			{images && (
				<>
					<Swiper
						direction={isMobile ? "horizontal" : "vertical"}
						spaceBetween={10}
						slidesPerView={3.5}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper w-full sm:h-[550px] sm:w-[30%] xl:w-1/6  m-0"
					>
						{images.map((image, index) => (
							<SwiperSlide key={index}>
								<img
									src={image.imageUrl}
									className={`rounded-lg border-2 hover:cursor-pointer object-contain object-center w-full h-[80px] sm:h-[150px] p-2 ${
										index === activeIndex ? "border-blue-gray-900 " : ""
									}`}
									onClick={() => handleSlideClick(index)}
									alt={`gallery-image-${index}`}
								/>
							</SwiperSlide>
						))}
					</Swiper>
					<Swiper
						style={{
							"--swiper-navigation-color": "transparent",
						}}
						onActiveIndexChange={(swiper) => {
							setActiveIndex(swiper.activeIndex);
						}}
						spaceBetween={10}
						navigation={true}
						thumbs={{ swiper: ".mySwiper" }}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper2 w-full sm:w-[70%] h-fit sm:h-[550px] xl:w-5/6 m-0 border-2 border-blue-gray-900 rounded-md"
					>
						{images.map((image, index) => (
							<SwiperSlide key={index} className="p-5">
								<img
									src={image.imageUrl}
									className="w-full h-[300px] sm:h-full rounded-lg hover:cursor-pointer object-contain object-center"
									alt={`gallery-image-${index}`}
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</>
			)}
		</div>
	);
};

ImageSlider.propTypes = {
	images: PropTypes.array.isRequired,
};

export default ImageSlider;
