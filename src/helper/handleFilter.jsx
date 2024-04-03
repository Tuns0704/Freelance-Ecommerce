export const handleFilter = ({
	searchParams,
	setSearchParams,
	marketingPrice,
	productPrice,
	productCategory,
}) => {
	const param = new URLSearchParams(searchParams);
	if (marketingPrice.isChecked) {
		setSearchParams((prev) => {
			prev.set("marketingPrice", marketingPrice.value);
			return prev;
		});
	}
	if (
		marketingPrice.isChecked === false &&
		marketingPrice.value !== param.has("marketingPrice")
	) {
		setSearchParams((prev) => {
			prev.delete("marketingPrice");
			return prev;
		});
	}
	if (
		productPrice.isChecked &&
		productPrice.value.minPrice !== param.get("minPrice") &&
		productPrice.value.maxPrice !== param.get("maxPrice")
	) {
		setSearchParams((prev) => {
			prev.set("minPrice", productPrice.value.minPrice);
			prev.set("maxPrice", productPrice.value.maxPrice);
			return prev;
		});
	}
	if (
		productPrice.isChecked === false &&
		param.has("minPrice") &&
		param.has("maxPrice")
	) {
		setSearchParams((prev) => {
			prev.delete("minPrice");
			prev.delete("maxPrice");
			return prev;
		});
	}
	if (
		productCategory.isChecked &&
		productCategory.value !== param.get("category")
	) {
		setSearchParams((prev) => {
			prev.set("category", productCategory.value);
			return prev;
		});
	}
	if (productCategory.isChecked === false && param.has("category")) {
		setSearchParams((prev) => {
			prev.delete("category");
			return prev;
		});
	}
};

export const handleInitFilter = ({
	searchParams,
	setMarketingPrice,
	setProductPrice,
	setProductCategory,
}) => {
	const param = new URLSearchParams(searchParams);

	if (param.has("marketingPrice")) {
		setMarketingPrice({ isChecked: true, value: true });
	}
	if (param.has("minPrice") && param.has("maxPrice")) {
		setProductPrice({
			isChecked: true,
			value: {
				minPrice: parseInt(param.get("minPrice")),
				maxPrice: parseInt(param.get("maxPrice")),
			},
		});
	}
	if (param.has("category")) {
		setProductCategory({
			isChecked: true,
			value: param.get("category"),
		});
	}
};
