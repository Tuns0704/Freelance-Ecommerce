import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { chartsConfig } from "@constant/chart";
import { formatChartData } from "@helper/formatChatData";
import { formatCurrency } from "@helper/formatCurrency";

export function StatisticsChart({ chart }) {
	const formattedData = formatChartData(chart);
	const dailySalesChart = {
		type: "line",
		height: 220,
		series: [
			{
				name: "Sales",
				data: formattedData.seriesData,
			},
		],
		options: {
			...chartsConfig,
			colors: ["#0288d1"],
			stroke: {
				lineCap: "round",
			},
			markers: {
				size: 5,
			},
			yaxis: {
				labels: {
					formatter: (value) => {
						return formatCurrency(value);
					},
				},
			},
			xaxis: {
				...chartsConfig.xaxis,
				categories: formattedData.categoriesData,
			},
		},
	};
	return (
		<div className="bg-white z-50 opacity-100">
			<div>
				<Chart {...dailySalesChart} />
			</div>
		</div>
	);
}

StatisticsChart.defaultProps = {
	color: "blue",
	footer: null,
};

StatisticsChart.propTypes = {
	chart: PropTypes.array,
};

export default StatisticsChart;
