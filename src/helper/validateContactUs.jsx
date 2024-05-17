export const validateContactUs = (contactUs) => {
	let errors = {};
	if (!contactUs.firstName.trim()) {
		errors.firstName = "Thông tin cần phải nhập";
	}
	if (!contactUs.lastName.trim()) {
		errors.lastName = "Thông tin cần phải nhập";
	}
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!contactUs.email) {
		errors.email = "Thông tin cần phải nhập";
	} else if (!emailPattern.test(contactUs.email)) {
		errors.email = "Email không hợp lệ";
	}
	const phonePattern = /^[0-9]{10,15}$/;
	if (!contactUs.phone) {
		errors.phone = "Thông tin cần phải nhập";
	} else if (!phonePattern.test(contactUs.phone)) {
		errors.phone = "Số điện thoại không hợp lệ";
	}
	if (!contactUs.comment.trim()) {
		errors.comment = "Thông tin cần phải nhập";
	} else if (contactUs.comment.length < 30) {
		errors.comment = "Thông tin cần ít nhất 30 ký tự";
	}

	return errors;
};
