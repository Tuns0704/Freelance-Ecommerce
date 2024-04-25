export const setValueSort = ({ searchParams, setSelectedOption }) => {
	if (searchParams.has("sortField") && searchParams.has("sortDirection")) {
		if (
			searchParams.get("sortField") === "price" &&
			searchParams.get("sortDirection") === "descend"
		) {
			setSelectedOption("priceDesc");
		}
		if (
			searchParams.get("sortField") === "price" &&
			searchParams.get("sortDirection") === "ascend"
		) {
			setSelectedOption("priceAsc");
		}
		if (
			searchParams.get("sortField") === "creatAt" &&
			searchParams.get("sortDirection") === "descend"
		) {
			setSelectedOption("creatAtDesc");
		}
		if (
			searchParams.get("sortField") === "creatAt" &&
			searchParams.get("sortDirection") === "ascend"
		) {
			setSelectedOption("creatAtAsc");
		}
	}
};
