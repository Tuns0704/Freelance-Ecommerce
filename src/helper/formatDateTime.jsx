export const formatDateTime = (utcDateTime) => {
	const date = new Date(utcDateTime);
	const localDate = date.toLocaleDateString();
	const localTime = date.toLocaleTimeString();
	return localDate + " - " + localTime;
};
