import { Button } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();

	return (
		<section className="min-h-[80vh] flex items-center justify-center px-4 py-10">
			<div className="bg-white shadow-md rounded-xl w-full max-w-lg p-6 sm:p-10 text-center space-y-6">
				{/* 404 with an icon instead of the zero */}
				<div className="flex items-center justify-center gap-2 sm:gap-4 font-extrabold text-primary leading-none">
					<span className="text-6xl sm:text-8xl">4</span>
					<span className="flex items-center justify-center w-16 h-16 sm:w-24 sm:h-24 rounded-full bg-secondary/10">
						<i className="fa-regular fa-face-frown text-4xl sm:text-6xl text-secondary"></i>
					</span>
					<span className="text-6xl sm:text-8xl">4</span>
				</div>

				<div className="space-y-2">
					<h1 className="text-xl sm:text-2xl font-bold text-gray-700">Page not found</h1>
					<p className="text-sm sm:text-base text-gray-500 break-words">
						The page you are looking for doesn't exist or may have been moved.
					</p>
				</div>

				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
					<Link
						to="/"
						className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white w-full sm:w-auto hover:opacity-90"
					>
						<i className="fa-solid fa-house"></i>
						Back to Home
					</Link>
					<Button
						onClick={() => navigate(-1)}
						className="flex items-center justify-center gap-2 bg-transparent border-2 border-primary text-primary w-full sm:w-auto"
					>
						<i className="fa-solid fa-arrow-left"></i>
						Go Back
					</Button>
				</div>
			</div>
		</section>
	);
}