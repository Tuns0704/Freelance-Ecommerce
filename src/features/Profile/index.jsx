// import PropTypes from "prop-types";
import { Card, CardBody, Avatar } from "@material-tailwind/react";
import { ProfileInfoCard } from "./profileInforCard";
import { useCallback, useEffect } from "react";
import { useState } from "react";
import { decodeToken } from "@helper/decodeToken";
import { getUserOrder, getUserProfile } from "@services/user";
import OrderItem from "./orderItem";

const Profile = () => {
	const [profile, setProfile] = useState({});
	const [orders, setOrders] = useState([]);

	const token = localStorage.getItem("token");

	const getOrderOfUser = useCallback(async () => {
		const useId = decodeToken(token).sub;
		const response = await getUserOrder(useId);
		if (response.status === 200) {
			setOrders(response.data);
		}
	}, [token]);

	const getUserInformation = async () => {
		const response = await getUserProfile();
		setProfile(response.data);
	};

	useEffect(() => {
		setProfile(decodeToken(token));
		getOrderOfUser();
		getUserInformation();
	}, [getOrderOfUser, token]);

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
								<p className="mb-1 text-xl font-bold">{profile.displayName}</p>
							</div>
						</div>
					</div>
					<div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
						<ProfileInfoCard
							title="Thông tin cá nhân"
							description=""
							details={{
								Tên: profile.displayName,
								"Số điện thoại": profile.phone
									? profile.phone
									: "Hiện tại bạn chưa nhập số điện thoại",
								email: profile.email,
								"Địa chỉ": profile.address
									? profile.address
									: "Hiện tại bạn chưa nhập địa chỉ",
							}}
						/>
					</div>
					<div className="w-full flex gap-2 flex-wrap">
						{orders.map((order) => (
							<OrderItem key={order.id} order={order} reload={getOrderOfUser} />
						))}
					</div>
				</CardBody>
			</Card>
		</>
	);
};

export default Profile;
