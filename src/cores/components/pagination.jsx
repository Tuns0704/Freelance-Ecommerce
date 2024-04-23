import { IconButton, Button } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

import PropTypes from "prop-types";

const Pagination = ({ handleClick, page, totalPages, getItemProps }) => {
	const renderPaginationButtons = () => {
		const buttons = [];
		const maxVisibleButtons = 5;
		const start = Math.max(
			1,
			Math.min(
				page - Math.floor(maxVisibleButtons / 2),
				totalPages - maxVisibleButtons + 1
			)
		);
		const end = Math.min(start + maxVisibleButtons - 1, totalPages);

		for (let i = start; i <= end; i++) {
			buttons.push(
				<IconButton
					key={i}
					className={page === i ? "bg-gray-900 text-white" : ""}
					{...getItemProps(i)}
				>
					{i}
				</IconButton>
			);
		}

		if (start > 1) {
			buttons.unshift(
				<IconButton className="md:flex xxs:hidden" key="prevEllipsis" disabled>
					...
				</IconButton>
			);
		}

		if (end < totalPages) {
			buttons.push(
				<IconButton className="md:flex xxs:hidden" key="nextEllipsis" disabled>
					...
				</IconButton>
			);
		}

		return buttons;
	};

	return (
		<div className="flex items-center justify-center my-5 gap-4">
			<Button
				variant="text"
				className="flex items-center gap-2"
				onClick={() => handleClick(Math.max(parseInt(page) - 1, 1))}
				disabled={page === 1}
			>
				<ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
			</Button>
			<div className="flex items-center gap-2">{renderPaginationButtons()}</div>
			<Button
				variant="text"
				className="flex items-center gap-2"
				onClick={() => handleClick(Math.min(parseInt(page) + 1, totalPages))}
				disabled={page === totalPages}
			>
				<ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
			</Button>
		</div>
	);
};

Pagination.propTypes = {
	handleClick: PropTypes.func.isRequired,
	page: PropTypes.string.isRequired,
	totalPages: PropTypes.number.isRequired,
	getItemProps: PropTypes.func.isRequired,
};

export default Pagination;
