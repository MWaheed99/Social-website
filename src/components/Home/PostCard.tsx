import type { Post } from "../../interfaces/Post";
import { Link } from "react-router-dom";
import CreateComment from "../CreateComment/CreateComment";
import { useState } from "react";
import CommentList from "../CommentList/CommentList";
import DropDownMenu from "../DropDownMenu/DropDownMenu";

interface PostCardProps {
	postData: Post;
	variant : "details" | "Posts"
}

export default function PostCard({ postData , variant }: PostCardProps) {
	const [showComment, setShowComment] = useState<boolean>(false);
	return (
		<div className="bg-white shadow-md rounded-xl p-3 sm:p-4 space-y-3 sm:space-y-6">
			<div className="card-header flex items-center justify-between gap-2">
				<Link to={`/profile/${postData.user._id}`} className="shrink-0">
				<div className="flex items-center gap-2 sm:gap-3 min-w-0">
					
					<img src={postData.user.photo} alt={postData.user.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
					
					<div className="min-w-0">
						<h4 className="text-sm sm:text-base font-bold text-primary truncate">{postData.user.name}</h4>
						<p className="text-xs sm:text-sm text-gray-500">
							{new Date(postData.createdAt).toLocaleDateString("en-US", {
								year: "numeric",
								month: "short",
								day: "numeric",
							})}
						</p>
					</div>
				</div>
				</Link>
				<DropDownMenu PostId={postData._id} OwnerId={postData.user._id} body={postData.body} image={postData.image} />
			</div>
			<div className="card-info space-y-3 sm:space-y-4">
				{postData.body && <p className="text-sm text-gray-500 break-words">{postData.body}</p>}
				{/* <p className="text-sm text-gray-500 break-words">{postData?.body}</p> */}
				{postData.image && <img src={postData.image} className="w-full h-auto max-w-full rounded-md" />}
			</div>
			<div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b-2 pb-2 sm:pb-1">
					<div className="flex items-center gap-1 whitespace-nowrap">
						<i className="fa-regular fa-heart text-[11px] sm:text-xs text-gray-400"></i>
						<span className="text-[11px] sm:text-xs text-gray-400">{postData.likesCount} Likes</span>
					</div>
					<div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:gap-4">
						<div className="flex items-center gap-1 whitespace-nowrap">
							<i className="fa-regular fa-comment text-[11px] sm:text-xs text-gray-400"></i>
							<span className="text-[11px] sm:text-xs text-gray-400">{postData.commentsCount} Comments</span>
						</div>
						<div className="flex items-center gap-1 whitespace-nowrap">
							<i className="fa-regular fa-share-from-square text-[11px] sm:text-xs text-gray-400"></i>
							<span className="text-[11px] sm:text-xs text-gray-400">{postData.sharesCount} Shares</span>
						</div>
						<Link to={`/post/${postData._id}`} className="text-[11px] sm:text-xs text-gray-400 whitespace-nowrap">
							View Post Details
						</Link>
					</div>
			</div>
			<div className="card-footer flex items-center justify-between gap-1 sm:gap-2">
				<div className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer whitespace-nowrap text-xs min-[400px]:text-sm sm:text-base">
					<i className="fa-regular fa-heart text-sm min-[400px]:text-base sm:text-xl text-primary"></i>
					<span>Like</span>
				</div>
				<div onClick={() => setShowComment(!showComment)} className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer whitespace-nowrap text-xs min-[400px]:text-sm sm:text-base">
					<i className="fa-regular fa-comment text-sm min-[400px]:text-base sm:text-xl text-primary"></i>
					<span>Comment</span>
				</div>
				<div className="flex flex-1 sm:flex-none items-center justify-center gap-1.5 sm:gap-2 px-1 sm:px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer whitespace-nowrap text-xs min-[400px]:text-sm sm:text-base">
					<i className="fa-regular fa-share-from-square text-sm min-[400px]:text-base sm:text-xl text-primary"></i>
					<span>Share</span>
				</div>

				{/* <div className="flex items-center gap-3">
					<i className="fa-regular fa-bookmark text-2xl text-primary"></i>
				</div> */}
			</div>
			{variant !== "details" && postData.topComment && (
				<div className="top-comment flex items-start justify-between gap-2 bg-gray-100 px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl">
					<div className="flex items-start gap-2 sm:gap-3 min-w-0">
						<img src={postData.topComment.commentCreator.photo} className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full object-cover" alt={postData.topComment.commentCreator.name} />
						<div className="space-y-1 sm:space-y-2 min-w-0">
							<div className="flex flex-wrap items-center gap-x-2">
								<h4 className="text-xs sm:text-sm text-gray-700 font-bold">{postData.topComment.commentCreator.name}</h4>
								<p className="text-[11px] sm:text-xs text-gray-400">
									{new Date(postData.topComment.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
									})}
								</p>
							</div>
							<p className="text-xs sm:text-sm text-gray-500 break-words">{postData.topComment.content}</p>
							{postData.topComment.image && <img src={postData.topComment.image} className="w-20 h-20 sm:w-25 sm:h-25 rounded-xl object-cover" alt="" />}
						</div>
					</div>
					<DropDownMenu PostId={postData._id} OwnerId={postData.topComment.commentCreator._id} CommentId={postData.topComment._id} content={postData.topComment.content} image={postData.topComment.image} />
				</div>
			)}
			<CommentList id={postData._id} isDetails={variant === "details"}/>

			{showComment && <CreateComment id={postData._id} />}
		</div>
	);
}