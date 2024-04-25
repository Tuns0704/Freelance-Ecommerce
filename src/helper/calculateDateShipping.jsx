export const calculateDateShipping = () => {
	const currentDate = new Date();
	const shippingDate = new Date(currentDate);
	shippingDate.setDate(shippingDate.getDate() + 28);

	return (
		currentDate.toLocaleDateString() + " - " + shippingDate.toLocaleDateString()
	);
};
