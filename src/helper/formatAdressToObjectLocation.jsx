export const formatAddressToLocation = (address) => {
	const [street, ward, district, city] = address
		.split(",")
		.map((part) => part.trim());
	return {
		street: street,
		ward: ward,
		district: district,
		city: city,
	};
};
