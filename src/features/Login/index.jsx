import { Button, Typography, Input } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordModal from "./forgotPasswordModal";
import { toast } from "react-toastify";
import { login } from "../../services/auth";
import { AppContext, SET_ROLE } from "../../cores/context/app.context";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import {
	SET_TOKEN,
	SET_AUTHENTICATED,
} from "./../../cores/context/app.context";
import { decodeToken } from "../../helper/decodeToken";

const Login = () => {
	const { dispatchAuth } = useContext(AppContext);
	const [user, setUser] = useState({
		email: "",
		password: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

	const handleToggleForgotPasswordModal = () => {
		setIsPasswordModalOpen((prev) => !prev);
	};

	const handleTogglePasswordVisibility = () => {
		setShowPassword((prevShowPassword) => !prevShowPassword);
	};

	const handleChangeInput = (event) => {
		const { name, value } = event.target;
		setUser((prevLocation) => ({
			...prevLocation,
			[name]: value,
		}));
	};

	const isValidEmail = (email) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const navigate = useNavigate();

	const handleLogin = async () => {
		if (isValidEmail(user.email)) {
			try {
				const response = await login(user);
				if (response.status === 201) {
					navigate(`/`);
					const token = response.data.token.access_token;
					localStorage.setItem("token", token);
					dispatchAuth({
						type: SET_TOKEN,
						payload: token,
					});
					dispatchAuth({ type: SET_AUTHENTICATED, payload: true });
					dispatchAuth({
						type: SET_ROLE,
						payload: decodeToken(token).role,
					});
					toast.success("Đăng nhập thành công!");
				}
			} catch (error) {
				toast.error("Email hoặc mật khẩu không đúng!");
			}
		} else {
			toast.info("Bạn cần nhập đúng email!");
		}
	};

	const handleLoginGoogle = async () => {
		const link = `${import.meta.env.VITE_API_URL}/auth/google/login`;
		window.open(link, "_self");
	};

	const handleLoginFacebook = () => {
		const link = `${import.meta.env.VITE_API_URL}/auth/facebook/login`;
		window.open(link, "_self");
	};

	return (
		<section className="flex h-[85vh] p-8 gap-4">
			<div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
				<div className="text-center">
					<Typography variant="h2" className="font-bold">
						Đăng nhập
					</Typography>
				</div>
				<form className="mt-8 mb-2 mx-auto max-w-screen-lg lg:w-1/2">
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
							value={user.email}
							onChange={(event) => handleChangeInput(event)}
						/>
					</div>
					<div className="mb-1 flex relative flex-col gap-6">
						<Typography
							variant="small"
							color="blue-gray"
							className="-mb-5 font-medium"
						>
							Mật khẩu
						</Typography>
						<Input
							size="lg"
							placeholder="••••••••"
							name="password"
							type={showPassword ? "text" : "password"}
							className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
							labelProps={{
								className: "before:content-none after:content-none",
							}}
							value={user.password}
							onChange={(event) => handleChangeInput(event)}
						/>
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
					<Button
						size="lg"
						className="mt-6"
						fullWidth
						onClick={() => handleLogin()}
					>
						Đăng nhập
					</Button>
					<Typography
						variant="paragraph"
						className="text-center text-blue-gray-500 font-medium mt-4"
					>
						Chưa có tài khoản?
						<Link to="/register" className="text-gray-900 ml-1 underline">
							Đăng ký ngay
						</Link>
					</Typography>
					<Typography
						variant="paragraph"
						className="text-center text-blue-gray-500 font-medium mt-4"
					>
						Quên mật khẩu?
						<Link
							onClick={handleToggleForgotPasswordModal}
							className="text-gray-900 ml-1 underline"
						>
							Lấy lại mật khẩu
						</Link>
					</Typography>
					<ForgotPasswordModal
						isOpen={isPasswordModalOpen}
						closeModal={handleToggleForgotPasswordModal}
					/>
					<div className="space-y-4 mt-8">
						<Button
							onClick={() => handleLoginGoogle()}
							size="lg"
							color="white"
							className="flex items-center gap-2 justify-center"
							fullWidth
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 17 16"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clipPath="url(#clip0_1156_824)">
									<path
										d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z"
										fill="#4285F4"
									/>
									<path
										d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z"
										fill="#34A853"
									/>
									<path
										d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z"
										fill="#FBBC04"
									/>
									<path
										d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z"
										fill="#EA4335"
									/>
								</g>
								<defs>
									<clipPath id="clip0_1156_824">
										<rect
											width="16"
											height="16"
											fill="white"
											transform="translate(0.5)"
										/>
									</clipPath>
								</defs>
							</svg>
							<span>Đăng nhập với Google</span>
						</Button>
						<Button
							onClick={() => handleLoginFacebook()}
							size="lg"
							color="white"
							className="flex items-center gap-2 justify-center shadow-md"
							fullWidth
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 16 16"
								id="facebook"
								width="20"
								height="20"
							>
								<path
									fill="#1976D2"
									d="M14 0H2C.897 0 0 .897 0 2v12c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2V2c0-1.103-.897-2-2-2z"
								></path>
								<path
									fill="#FAFAFA"
									fillRule="evenodd"
									d="M13.5 8H11V6c0-.552.448-.5 1-.5h1V3h-2a3 3 0 0 0-3 3v2H6v2.5h2V16h3v-5.5h1.5l1-2.5z"
									clipRule="evenodd"
								></path>
							</svg>
							<span>Đăng nhập với Facebook</span>
						</Button>
					</div>
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

export default Login;
