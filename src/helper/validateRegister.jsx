export const validateRegister = (user) => {
	let errors = {};
	if (!user.displayName.trim()) {
		errors.displayName = "Thông tin cần phải nhập";
	}
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!user.email) {
		errors.email = "Thông tin cần phải nhập";
	} else if (!emailPattern.test(user.email)) {
		errors.email = "Email không hợp lệ";
	}
	if (!user.password) {
		errors.password = "Thông tin cần phải nhập";
	} else if (user.password.length < 8) {
		errors.password = "Mật khẩu phải 8 kí tự";
	}
	if (!user.confirmPassword || user.confirmPassword !== user.password) {
		errors.confirmPassword = "Mật khẩu không trùng";
	}
	const phonePattern = /^[0-9]{10,15}$/;
	if (!user.phone) {
		errors.phone = "Thông tin cần phải nhập";
	} else if (!phonePattern.test(user.phone)) {
		errors.phone = "Số điện thoại không hợp lệ";
	}
	if (!user.address.trim()) {
		errors.address = "Thông tin cần phải nhập";
	}

	return errors;
};
