export const formatChartData = (data) => {
	return {
		seriesData: data.map((item) => item.value),
		categoriesData: data.map((item) =>
			new Date(item.lastUpdated).toLocaleDateString("vi-VN", {
				weekday: "short",
				day: "2-digit",
				month: "numeric",
				year: "numeric",
			})
		),
	};
};
