import { Spinner } from "@material-tailwind/react";

const Loading = () => {
	return (
		<div className=" w-full h-[80vh] flex justify-center items-center">
			<Spinner className="h-12 w-12" />;
		</div>
	);
};

export default Loading;
