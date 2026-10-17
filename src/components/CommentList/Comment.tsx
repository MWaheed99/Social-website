

import type { PostComment } from "../../interfaces/Post";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

export default function Comment({ comment }: { comment: PostComment }) {
	return (
		<div className="top-comment flex items-start justify-between bg-gray-100 px-4 py-3 rounded-2xl">
			<div className="flex items-center gap-3">
				<img src={comment.commentCreator.photo} className="w-10 h-10 rounded-full" alt={comment.commentCreator.name} />
				<div className="space-y-2">
					<div className="flex items-center gap-2">
						<h4 className="text-sm text-gray-700 font-bold">{comment.commentCreator.name}</h4>
						<p className="text-xs text-gray-400">
							{new Date(comment.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</p>
					</div>
					{comment.content && <p className="text-sm text-gray-500 break-words">{comment.content}</p>}
					{comment.image && <img src={comment.image} className="w-25 h-25 rounded-xl" alt="" />}
				</div>
			</div>

			<DropDownMenu PostId={comment.post} OwnerId={comment.commentCreator._id} CommentId={comment._id} content={comment.content} image={comment.image} />
		</div>
	);
}
