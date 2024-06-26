import { Button, Typography, Input, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { validateResetPassword } from "@helper/validateResetPassword";
import { resetPassword } from "@services/auth";

const ResetPassword = () => {
	const [password, setPassword] = useState({
		newPassword: "",
		confirmNewPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [errors, setErrors] = useState({});

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleToggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleChangeInput = (event) => {
		const { name, value } = event.target;
		setPassword((prevLocation) => ({
			...prevLocation,
			[name]: value,
		}));
	};

	const queryParameters = new URLSearchParams(window.location.search);
	const tokenFromUrl = queryParameters.get("token");

	const navigate = useNavigate();

	const handleSubmit = async () => {
		const errors = validateResetPassword(password);
		setErrors(errors);
		if (Object.keys(errors).length === 0) {
			try {
				const body = {
					token: tokenFromUrl,
					newPassword: password.newPassword,
				};
				const response = await resetPassword(body);
				if (response.status === 200) {
					toast.success("Đổi mật khẩu thành công!");
					navigate("/login");
				} else {
					toast.error("Đổi mật khẩu thất bại!");
				}
			} catch (error) {
				toast.error("Bạn vui lòng tạo 1 phiếu đổi mật khẩu mới");
				navigate("/login");
			}
		} else {
			toast.error("Cần phải nhập đầy đủ thông tin!");
		}
	};

	return (
		<section className="flex h-[85vh] p-8 gap-4">
			<div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
				<div className="text-center">
					<Typography variant="h2" className="font-bold">
						Quên mật khẩu
					</Typography>
				</div>
				<form className="mt-8 mb-2 mx-auto max-w-screen-lg lg:w-1/2">
					<div className="mb-1 flex relative flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Mật khẩu khẩu mới <b className="text-red-400">*</b>
						</Typography>
						<Tooltip
							content={errors.newPassword}
							placement="top-end"
							open={!!errors.newPassword}
							className="!visible bg-transparent font-medium text-red-800 py-1 mt-1"
						>
							<Input
								size="lg"
								placeholder="••••••••"
								name="newPassword"
								type={showPassword ? "text" : "password"}
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
								value={password.newPassword}
								onChange={(event) => handleChangeInput(event)}
							/>
						</Tooltip>
						<button
							type="button"
							onClick={handleTogglePasswordVisibility}
							className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-700"
						>
							{showPassword ? (
								<EyeSlashIcon className="h-5 w-5 text-gray-500" />
							) : (
								<EyeIcon className="h-5 w-5 text-gray-500" />
							)}
						</button>
					</div>
					<div className="mb-1 flex relative flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Xác nhận mật khẩu khẩu mới <b className="text-red-400">*</b>
						</Typography>
						<Tooltip
							content={errors.confirmNewPassword}
							placement="top-end"
							open={!!errors.confirmNewPassword}
							className="!visible bg-transparent font-medium text-red-800 py-1 mt-1"
						>
							<Input
								size="lg"
								placeholder="••••••••"
								name="confirmNewPassword"
								type={showConfirmPassword ? "text" : "password"}
								className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
								labelProps={{
									className: "before:content-none after:content-none",
								}}
								value={password.confirmNewPassword}
								onChange={(event) => handleChangeInput(event)}
							/>
						</Tooltip>
						<button
							type="button"
							onClick={handleToggleConfirmPasswordVisibility}
							className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 text-gray-700"
						>
							{showConfirmPassword ? (
								<EyeSlashIcon className="h-5 w-5 text-gray-500" />
							) : (
								<EyeIcon className="h-5 w-5 text-gray-500" />
							)}
						</button>
					</div>
					<Button
						size="lg"
						className="mt-6"
						fullWidth
						onClick={() => handleSubmit()}
					>
						Xác nhận mật khẩu
					</Button>
				</form>
			</div>
			<div className="w-2/5 h-full hidden lg:block">
				<img
					src="/img/pattern.png"
					className="h-full w-full object-cover rounded-3xl"
				/>
			</div>
		</section>
	);
};

export default ResetPassword;
