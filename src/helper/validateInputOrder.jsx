export const validateInputs = (phoneNumber, location) => {
	const errors = {};

	if (phoneNumber.length !== 10 && phoneNumber.length !== 12) {
		errors.phoneNumber = "Số điện thoại phải có độ dài là 10 hoặc 12 ký tự.";
	}

	if (location.street.trim() === "") {
		errors.street = "Vui lòng nhập tên đường, toà nhà, số nhà.";
	}
	if (location.ward.trim() === "") {
		errors.ward = "Vui lòng nhập phường/xã.";
	}
	if (location.district.trim() === "") {
		errors.district = "Vui lòng nhập quận/huyện.";
	}
	if (location.city.trim() === "") {
		errors.city = "Vui lòng nhập tỉnh/thành phố.";
	}

	return errors;
};
