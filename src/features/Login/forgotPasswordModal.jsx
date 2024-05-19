import { Dialog, Transition } from "@headlessui/react";
import { PropTypes } from "prop-types";
import {
	IconButton,
	Input,
	Typography,
	Button,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { forgotPassword } from "../../services/auth";

const ForgotPasswordModal = ({ isOpen, closeModal }) => {
	const [email, setEmail] = useState("");

	const handleSubmit = async () => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (email === "") {
			toast.error("Bạn cần nhập thông tin email");
		} else if (!emailPattern.test(email)) {
			toast.error("Email không hợp lệ");
		} else {
			try {
				const body = {
					email: email,
				};
				const response = await forgotPassword(body);
				if (response.status === 200) {
					toast.success("Bạn check mail để đặt lại mật khẩu");
					closeModal();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	return (
		<Transition appear show={isOpen}>
			<Dialog as="div" className="relative z-50" onClose={closeModal}>
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
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-[600px] transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
								<Dialog.Title
									as="h3"
									className="text-lg flex justify-between items-center font-medium leading-6 text-gray-900"
								>
									<div>Lấy lại mật khẩu</div>
									<IconButton onClick={closeModal}>
										<XMarkIcon className="w-5 h-5" />
									</IconButton>
								</Dialog.Title>
								<div className="mt-5 w-full flex flex-col gap-2">
									<div className="mb-4 flex flex-col gap-6">
										<Typography
											variant="small"
											color="blue-gray"
											className="-mb-5 font-medium"
										>
											Email
										</Typography>
										<Input
											size="lg"
											name="email"
											placeholder="name@mail.com"
											className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
											labelProps={{
												className: "before:content-none after:content-none",
											}}
											value={email}
											onChange={(event) => setEmail(event.target.value)}
										/>
									</div>
									<Button onClick={handleSubmit}>
										<p>Lấy lại mật khẩu ngay</p>
									</Button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
};

ForgotPasswordModal.propTypes = {
	isOpen: PropTypes.bool,
	closeModal: PropTypes.func,
	product: PropTypes.object,
};

export default ForgotPasswordModal;
