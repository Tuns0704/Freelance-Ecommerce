export const validateResetPassword = (password) => {
	const errors = {};

	if (!password.newPassword) {
		errors.newPassword = "Thông tin cần phải nhập";
	} else if (password.newPassword.length < 8) {
		errors.newPassword = "Mật khẩu phải có ít nhất 8 kí tự";
	}

	if (!password.confirmNewPassword) {
		errors.confirmNewPassword = "Thông tin cần phải nhập";
	} else if (password.newPassword !== password.confirmNewPassword) {
		errors.confirmNewPassword = "Mật khẩu không trùng";
	}

	return errors;
};
