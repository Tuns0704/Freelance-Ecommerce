export const deliveryStatus = (deliveryStatus) => {
	if (deliveryStatus === "pending") return "Đang chờ";
	if (deliveryStatus === "in_transit") return "Đang được giao";
	if (deliveryStatus === "delivered") return "Giao thành công";
	if (deliveryStatus === "failed") return "Giao thất bại";
};
