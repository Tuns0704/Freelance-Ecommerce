import { format } from "date-fns";

export const handleFilter = ({
	searchParams,
	setSearchParams,
	marketingPrice,
	productCategory,
	productCondition,
	minValue,
	maxValue,
	orderCondition,
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

	if (
		productCondition.isChecked &&
		productCondition.value !== param.get("condition")
	) {
		setSearchParams((prev) => {
			prev.set("condition", productCondition.value);
			return prev;
		});
	}

	if (productCondition.isChecked === false && param.has("condition")) {
		setSearchParams((prev) => {
			prev.delete("condition");
			return prev;
		});
	}

	if (
		orderCondition.isChecked &&
		orderCondition.value !== param.get("conditionOrder")
	) {
		setSearchParams((prev) => {
			prev.set("conditionOrder", orderCondition.value);
			return prev;
		});
	}

	if (orderCondition.isChecked === false && param.has("conditionOrder")) {
		setSearchParams((prev) => {
			prev.delete("conditionOrder");
			return prev;
		});
	}

	if ((minValue !== 0 && maxValue !== 0) || minValue !== 0 || maxValue !== 0) {
		setSearchParams((prev) => {
			prev.set("minPrice", minValue);
			prev.set("maxPrice", maxValue);
			return prev;
		});
	}
	if (minValue === 0 && maxValue === 0) {
		setSearchParams((prev) => {
			prev.delete("minPrice");
			prev.delete("maxPrice");
			return prev;
		});
	}
};

export const handleInitFilter = ({
	searchParams,
	setMarketingPrice,
	setProductCategory,
	setMinValue,
	setMaxValue,
	setProductCondition,
	setOrderCondition,
}) => {
	const param = new URLSearchParams(searchParams);

	if (param.has("marketingPrice")) {
		setMarketingPrice({ isChecked: true, value: true });
	}
	if (param.has("minPrice") && param.has("maxPrice")) {
		setMinValue(parseInt(param.get("minPrice")));
		setMaxValue(parseInt(param.get("maxPrice")));
	}
	if (param.has("category")) {
		setProductCategory({
			isChecked: true,
			value: param.get("category"),
		});
	}
	if (param.has("conditionOrder")) {
		setProductCondition({
			isChecked: true,
			value: param.get("conditionOrder"),
		});
	}
	if (param.has("conditionProduct")) {
		setOrderCondition({
			isChecked: true,
			value: param.get("conditionProduct"),
		});
	}
};

export const handleOrderFilter = ({
	searchParams,
	setSearchParams,
	deliveryStatus,
	paymentStatus,
	findBy,
	searchText,
	fromDate,
	toDate,
}) => {
	const param = new URLSearchParams(searchParams);

	if (deliveryStatus !== "all") {
		setSearchParams((prev) => {
			prev.set("deliveryStatus", deliveryStatus);
			return prev;
		});
	} else if (param.has("deliveryStatus")) {
		setSearchParams((prev) => {
			prev.delete("deliveryStatus");
			return prev;
		});
	}

	if (paymentStatus !== "all") {
		setSearchParams((prev) => {
			prev.set("paymentStatus", paymentStatus);
			return prev;
		});
	} else if (param.has("paymentStatus")) {
		setSearchParams((prev) => {
			prev.delete("paymentStatus");
			return prev;
		});
	}
	if (findBy === "userName" && searchText !== "") {
		setSearchParams((prev) => {
			prev.set("userName", searchText);
			return prev;
		});
	} else if (param.has("userName")) {
		setSearchParams((prev) => {
			prev.delete("userName");
			return prev;
		});
	}
	if (findBy === "phone" && searchText !== "") {
		setSearchParams((prev) => {
			prev.set("phone", searchText);
			return prev;
		});
	} else if (param.has("phone")) {
		setSearchParams((prev) => {
			prev.delete("phone");
			return prev;
		});
	}
	if (fromDate !== undefined && toDate !== undefined) {
		setSearchParams((prev) => {
			prev.set("createdAtFrom", format(fromDate, "yyyy-MM-dd"));
			prev.set("createdAtTo", format(toDate, "yyyy-MM-dd"));
			return prev;
		});
	} else if (param.has("createdAtFrom") && param.has("createdAtTo")) {
		setSearchParams((prev) => {
			prev.delete("createdAtFrom");
			prev.delete("createdAtTo");
			return prev;
		});
	}
};

export const handleInitOrderFilter = ({
	searchParams,
	setDeliveryStatus,
	setPaymentStatus,
	setFindBy,
	setSearchText,
}) => {
	const param = new URLSearchParams(searchParams);

	if (param.has("deliveryStatus")) {
		setDeliveryStatus(param.get("deliveryStatus"));
	} else {
		setDeliveryStatus("all");
	}

	if (param.has("paymentStatus")) {
		setPaymentStatus(param.get("paymentStatus"));
	} else {
		setPaymentStatus("all");
	}

	if (param.has("userName")) {
		setFindBy("userName");
		setSearchText(param.get("userName"));
	} else {
		setFindBy("userName");
		setSearchText("");
	}

	if (param.has("phone")) {
		setFindBy("phone");
		setSearchText(param.get("phone"));
	} else {
		setFindBy("phone");
		setSearchText("");
	}
};
