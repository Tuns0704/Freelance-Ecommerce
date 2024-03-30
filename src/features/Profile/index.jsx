// import PropTypes from "prop-types";
import {
	Card,
	CardBody,
	Avatar,
	Typography,
	// Tabs,
	// TabsHeader,
	// Tab,
	// Tooltip,
	Button,
} from "@material-tailwind/react";
import {
	// HomeIcon,
	// ChatBubbleLeftEllipsisIcon,
	// Cog6ToothIcon,
	PencilIcon,
} from "@heroicons/react/24/solid";
import { ProfileInfoCard } from "./profileInforCard";
import { useEffect } from "react";
import { useState } from "react";
import { decodeToken } from "../../helper/decodeToken";

const Profile = () => {
	const [profile, setProfile] = useState({});

	useEffect(() => {
		const token = localStorage.getItem("token");
		setProfile(decodeToken(token));
	}, []);

	return (
		<>
			<div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
				<div className="absolute inset-0 h-full w-full bg-gray-900/75" />
			</div>
			<Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
				<CardBody className="p-4">
					<div className="mb-10 flex items-center justify-between flex-wrap gap-6">
						<div className="flex items-center gap-6">
							<Avatar
								src={profile.avatar ? profile.avatar : "img/user.png"}
								alt="bruce-mars"
								size="xl"
								variant="rounded"
								className="rounded-lg bg-blue-gray-900 shadow-lg shadow-blue-gray-500/40"
							/>
							<div>
								<Typography variant="h5" color="blue-gray" className="mb-1">
									{profile.displayName}
								</Typography>
							</div>
						</div>
						<div>
							<Button className="flex gap-2 items-center">
								<PencilIcon className="w-5 h-5" />
								<p className="hidden md:flex">Sửa thông tin</p>
							</Button>
						</div>
						{/* <div className="w-96">
							<Tabs value="app">
								<TabsHeader>
									<Tab value="app">
										<HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
										App
									</Tab>
									<Tab value="message">
										<ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
										Message
									</Tab>
									<Tab value="settings">
										<Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
										Settings
									</Tab>
								</TabsHeader>
							</Tabs>
						</div> */}
					</div>
					<div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
						<ProfileInfoCard
							title="Thông tin cá nhân"
							description=""
							details={{
								Tên: profile.displayName,
								"Số điện thoại": profile.phoneNumber
									? profile.phoneNumber
									: "Hiện tại bạn chưa nhập số điện thoại",
								email: profile.email,
								"Địa chỉ": profile.location
									? profile.location
									: "Hiện tại bạn chưa nhập địa chỉ",
							}}
						/>
					</div>
				</CardBody>
			</Card>
		</>
	);
};

// Profile.propTypes = {};

export default Profile;
