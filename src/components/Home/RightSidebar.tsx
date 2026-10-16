import { Button } from "@heroui/react";

const Friends = [
  { name: "John Doe", color: "bg-red-500" },
  { name: "Jane Smith", color: "bg-blue-500" },
  { name: "Bob Johnson", color: "bg-green-500" },
  { name: "Alice Williams", color: "bg-purple-500" },
];




export default function RightSidebar() {
	return (
		<section className="w-[25%] bg-white shadow-md rounded-xl p-4">
			<h3 className="text-xl font-bold text-primary mb-8">Suggested for you</h3>
			{Friends.map((friend, index) => (
				<div key={index} className="flex items-center justify-between gap-3 mt-3">
					<div className={`flex items-center justify-center rounded-full w-12 h-12 ${friend.color}`}>
						<span className="text-lg font-bold text-white">{friend.name.trim().split(/\s+/).map((word) => word[0]).slice(0, 2).join("").toUpperCase()}</span>
					</div>

					<div>
						<h4 className="text-lg font-bold">{friend.name}</h4>
						<p className="text-xs text-gray-500">[3] mutual friends</p>
					</div>

					<Button className="bg-white text-primary border-2 border-primary">Follow</Button>
				</div>
			))}
		</section>
	);
}
