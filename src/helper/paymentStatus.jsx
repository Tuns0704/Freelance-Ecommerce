export const paymentStatus = (paymentStatus) => {
	if (paymentStatus === "not_paid") return "Chưa thanh toán";
	if (paymentStatus === "partially_paid") return "Đã thanh toán cọc";
	if (paymentStatus === "fully_paid") return "Đã thanh toán toàn bộ";
};
