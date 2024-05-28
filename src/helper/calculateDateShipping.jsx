export const calculateDateShipping = () => {
	const currentDate = new Date();
	const shippingStartDate = new Date(currentDate);
	shippingStartDate.setDate(shippingStartDate.getDate() + 21);
	const shippingEndDate = new Date(currentDate);
	shippingEndDate.setDate(shippingEndDate.getDate() + 28);

	return (
		shippingStartDate.toLocaleDateString() +
		" - " +
		shippingEndDate.toLocaleDateString()
	);
};
