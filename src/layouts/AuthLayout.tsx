import { Outlet } from "react-router-dom";

export default function AuthLayout() {
	return (
		<>
			<div className=" md:grid grid-cols-2">
				<div className="hidden relative overflow-hidden md:flex flex-col gap-4 justify-center items-center min-h-screen w-full py-10 bg-primary">
					<div className="absolute -top-12 -right-12 w-50 h-50 bg-secondary rounded-full"></div>
					<div className="absolute -bottom-12 -left-12 w-70 h-70 bg-[#1B2250] rounded-full"></div>
					<div className="z-10 flex flex-col gap-8 justify-center items-start w-full px-8 lg:px-20">
						<h1 className="text-2xl lg:text-4xl font-bold text-start text-white">Your people, all in one place.</h1>
						<p className="text-start text-[#C9CEE6] text-sm lg:text-base">Share moments, follow friends and join the groups you care about.</p>
						<ul className="w-full flex flex-col items-start gap-6">
							<li className="flex gap-4 items-center">
								<div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#272A3C] p-2 rounded-xl">
									<i className="fa-regular fa-image text-xl text-secondary"></i>
								</div>
								<span className="text-start text-[#C9CEE6] text-sm">Post photos, videos and thoughts</span>
							</li>
							<li className="flex gap-4 items-center">
								<div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#272A3C] p-2 rounded-xl">
									<i className="fa-regular fa-user text-xl text-secondary"></i>
								</div>
								<span className="text-start text-[#C9CEE6] text-sm">Connect with friends and followers</span>
							</li>
							<li className="flex gap-4 items-center">
								<div className="w-10 h-10 shrink-0 flex items-center justify-center bg-[#272A3C] p-2 rounded-xl">
									<i className="fa-regular fa-comment text-xl text-secondary"></i>
								</div>
								<span className="text-start text-[#C9CEE6] text-sm">Chat and react in real time</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex justify-center items-center min-h-screen w-full p-4 sm:p-6 bg-[#EEF0F6]">
					<Outlet />
				</div>
			</div>
		</>
	);
}