import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import PropTypes from "prop-types";

const ImageSlider = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const handleSlideClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<div className="flex w-full justify-between h-[50vh] xs:h-[60vh] sm:h-[70vh] md:h-[500px] gap-4">
			{images && (
				<>
					<Swiper
						direction={"vertical"}
						spaceBetween={10}
						slidesPerView={3}
						freeMode={true}
						watchSlidesProgress={true}
						modules={[FreeMode, Navigation, Thumbs]}
						className="mySwiper w-2/6 sm:w-1/6 lg:w-1/6 m-0 h-[350px]"
					>
						{images.map((image, index) => (
							<SwiperSlide key={index}>
								<img
									src={image.imageUrl}
									className={`rounded-lg border-2 hover:cursor-pointer object-contain object-center w-full h-[80px] xs:h-[100px] md:h-[120px] lg:h-[150px] p-2 ${
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
						className="mySwiper2 w-5/6 lg:w-5/6 m-0 border-2 border-blue-gray-900 rounded-md"
					>
						{images.map((image, index) => (
							<SwiperSlide key={index} className="p-5">
								<img
									src={image.imageUrl}
									className="w-full h-full rounded-lg hover:cursor-pointer object-contain object-center"
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
