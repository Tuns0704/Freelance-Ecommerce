import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { chartsConfig } from "./../../constant/chart";
import { formatChartData } from "../../helper/formatChatData";

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
	color: PropTypes.oneOf([
		"white",
		"blue-gray",
		"gray",
		"brown",
		"deep-orange",
		"orange",
		"amber",
		"yellow",
		"lime",
		"light-green",
		"green",
		"teal",
		"cyan",
		"light-blue",
		"blue",
		"indigo",
		"deep-purple",
		"purple",
		"pink",
		"red",
	]),
	chart: PropTypes.object.isRequired,
	title: PropTypes.node.isRequired,
	description: PropTypes.node.isRequired,
	footer: PropTypes.node,
};

export default StatisticsChart;
