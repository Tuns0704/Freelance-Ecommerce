export const calculateSalePrice = (price, discount) => {
	const result = price - discount;
	return result.toFixed(2);
};
