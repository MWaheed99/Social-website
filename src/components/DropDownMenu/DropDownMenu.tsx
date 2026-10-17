// import { Button, Dropdown, Label, toast } from "@heroui/react";
// import { useAuth } from "../../Context/AuthContext";
// import axios, { isAxiosError } from "axios";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

// interface DropDownMenuProps {
//   PostId: string;
//   CommentId?: string;
// }

// export default function DropDownMenu({
//   PostId,
//   CommentId,
// }: DropDownMenuProps) {
//   const { token } = useAuth();
//   const queryClient = useQueryClient();

//   // Delete Post
//   function deletePost() {
//     return axios.delete(
//       `https://route-posts.routemisr.com/posts/${PostId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   }

//   // Delete Comment
//   function deleteComment() {
//     return axios.delete(
//       `https://route-posts.routemisr.com/posts/${PostId}/comments/${CommentId}`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );
//   }

//   const deletePostMutation = useMutation({
//     mutationFn: deletePost,
//     onSuccess: (data) => {
//       toast.success(data.data.message);

//       queryClient.invalidateQueries({
//         queryKey: ["posts"],
//       });

//       queryClient.invalidateQueries({
//         queryKey: ["postDetails", PostId],
//       });
//     },
//     onError: (error) => {
//       if (isAxiosError(error)) {
//         toast.danger(
//           error.response?.data?.message || "Failed to delete post"
//         );
//       }
//     },
//   });

//   const deleteCommentMutation = useMutation({
//     mutationFn: deleteComment,
//     onSuccess: (data) => {
//       toast.success(data.data.message);

//       queryClient.invalidateQueries({
//         queryKey: ["comments", PostId],
//       });
//     },
//     onError: (error) => {
//       if (isAxiosError(error)) {
//         toast.danger(
//           error.response?.data?.message || "Failed to delete comment"
//         );
//       }
//     },
//   });

//   return (
//     <Dropdown>
//       <Button aria-label="Menu" variant="secondary">
//         <i className="fa-solid fa-ellipsis-vertical"></i>
//       </Button>

//       <Dropdown.Popover>
//         <Dropdown.Menu>
//           <Dropdown.Item id="save-post" textValue="Save Post">
//             <Label>Save Post</Label>
//           </Dropdown.Item>

//           <Dropdown.Item id="edit-post" textValue="Edit Post">
//             <Label>Edit Post</Label>
//           </Dropdown.Item>

//           {CommentId ? (
//             <Dropdown.Item
//               id="delete-comment"
//               textValue="Delete Comment"
//               variant="danger"
//               isDisabled={deleteCommentMutation.isPending}
//               onClick={() => deleteCommentMutation.mutate()}
//             >
//               <Label>
//                 {deleteCommentMutation.isPending
//                   ? "Deleting..."
//                   : "Delete Comment"}
//               </Label>
//             </Dropdown.Item>
//           ) : (
//             <Dropdown.Item
//               id="delete-post"
//               textValue="Delete Post"
//               variant="danger"
//               isDisabled={deletePostMutation.isPending}
//               onClick={() => deletePostMutation.mutate()}
//             >
//               <Label>
//                 {deletePostMutation.isPending
//                   ? "Deleting..."
//                   : "Delete Post"}
//               </Label>
//             </Dropdown.Item>
//           )}
//         </Dropdown.Menu>
//       </Dropdown.Popover>
//     </Dropdown>
//   );
// }

import { Button, Dropdown, Label, toast } from "@heroui/react";
import { useAuth } from "../../Context/AuthContext";
import axios, { isAxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import EditPost from "../EditPost/EditPost";
import EditComment from "../EditComment/EditComment";

interface DropDownMenuProps {
	PostId: string;
	CommentId?: string;
	OwnerId?: string;
	// current values (used to pre-fill the edit modal)
	body?: string; // post body
	content?: string; // comment content
	image?: string;
}

export default function DropDownMenu({ PostId, CommentId, OwnerId, body, content, image }: DropDownMenuProps) {
	const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
	const { token } = useAuth();
	const queryClient = useQueryClient();

	const { data: profileData } = useQuery({
		queryKey: ["profileData"],
		queryFn: () =>
			axios.get("https://route-posts.routemisr.com/users/profile-data", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
	});
	const myId = profileData?.data.data.user._id;

	// Delete Post
	function deletePost() {
		return axios.delete(`https://route-posts.routemisr.com/posts/${PostId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	// Delete Comment
	function deleteComment() {
		return axios.delete(`https://route-posts.routemisr.com/posts/${PostId}/comments/${CommentId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	const deletePostMutation = useMutation({
		mutationFn: deletePost,
		onSuccess: (data) => {
			toast.success(data.data.message);

			queryClient.invalidateQueries({
				queryKey: ["posts"],
			});

			queryClient.invalidateQueries({
				queryKey: ["postDetails", PostId],
			});
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.danger(error.response?.data?.message || "Failed to delete post");
			}
		},
	});

	const deleteCommentMutation = useMutation({
		mutationFn: deleteComment,
		onSuccess: (data) => {
			toast.success(data.data.message);

			queryClient.invalidateQueries({ queryKey: ["comments", PostId] });
			queryClient.invalidateQueries({ queryKey: ["posts"] });
			queryClient.invalidateQueries({ queryKey: ["postDetails", PostId] });
			queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.danger(error.response?.data?.message || "Failed to delete comment");
			}
		},
	});

	if (!myId || myId !== OwnerId) return null;

	return (
		<>
			<Dropdown>
				<Button aria-label="Menu" variant="secondary">
					<i className="fa-solid fa-ellipsis-vertical"></i>
				</Button>

				<Dropdown.Popover>
					<Dropdown.Menu>
						<Dropdown.Item id="save-post" textValue="Save Post">
							<Label>Save Post</Label>
						</Dropdown.Item>

						<Dropdown.Item id="edit" textValue={CommentId ? "Edit Comment" : "Edit Post"} onClick={() => setIsEditOpen(true)}>
							<Label>{CommentId ? "Edit Comment" : "Edit Post"}</Label>
						</Dropdown.Item>

						{CommentId ? (
							<Dropdown.Item id="delete-comment" textValue="Delete Comment" variant="danger" isDisabled={deleteCommentMutation.isPending} onClick={() => deleteCommentMutation.mutate()}>
								<Label>{deleteCommentMutation.isPending ? "Deleting..." : "Delete Comment"}</Label>
							</Dropdown.Item>
						) : (
							<Dropdown.Item id="delete-post" textValue="Delete Post" variant="danger" isDisabled={deletePostMutation.isPending} onClick={() => deletePostMutation.mutate()}>
								<Label>{deletePostMutation.isPending ? "Deleting..." : "Delete Post"}</Label>
							</Dropdown.Item>
						)}
					</Dropdown.Menu>
				</Dropdown.Popover>
			</Dropdown>

			{/* the modal lives outside the Dropdown so it stays mounted when the menu closes */}
			{isEditOpen && !CommentId && <EditPost postId={PostId} body={body} image={image} onClose={() => setIsEditOpen(false)} />}
			{isEditOpen && CommentId && <EditComment postId={PostId} commentId={CommentId} content={content} image={image} onClose={() => setIsEditOpen(false)} />}
		</>
	);
}
