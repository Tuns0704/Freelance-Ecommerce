import {
	XMarkIcon,
	ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { PropTypes } from "prop-types";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";

const ConfirmLogin = ({ isOpen, closeModal }) => {
	const navigate = useNavigate();
	const navigateToLogin = () => {
		navigate("/login");
	};

	return (
		<Transition appear show={isOpen}>
			<Dialog
				open={isOpen}
				as="div"
				className="relative z-10"
				onClose={closeModal}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex h-screen items-center justify-center text-center">
						<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
							<Dialog.Title
								as="h3"
								className="text-lg text-center font-medium leading-6 text-gray-900 mb-5"
							>
								Bạn cần đăng nhập
							</Dialog.Title>
							<div className="flex justify-between gap-5">
								<Button
									className="flex bg-red-900 w-1/2 gap-2 justify-center items-center"
									onClick={() => closeModal()}
								>
									<XMarkIcon strokeWidth={2} className="w-5 h-5" />
									Huỷ
								</Button>
								<Button
									className="flex w-1/2 gap-2 justify-center items-center"
									onClick={() => navigateToLogin()}
								>
									<ArrowRightOnRectangleIcon
										strokeWidth={2}
										className="w-5 h-5"
									/>
									Đăng nhập
								</Button>
							</div>
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

ConfirmLogin.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
};
export default ConfirmLogin;
