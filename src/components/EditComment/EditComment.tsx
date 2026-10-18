import { Button, TextArea, toast } from "@heroui/react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCommentSchema, type UpdateCommentFormValues } from "../../schema/UpdateCommentSchema";

interface EditCommentProps {
	postId: string;
	commentId: string;
	content?: string;
	image?: string;
	onClose: () => void;
}

export default function EditComment({ postId, commentId, content = "", image = "", onClose }: EditCommentProps) {
	const queryClient = useQueryClient();
	const { token } = useAuth();
	const [PreviewImage, setPreviewImage] = useState<string>(image);
	const [postImage, setPostImage] = useState<File | undefined>(undefined);
	const [postText, setPostText] = useState<string>(content);
	const ImgRef = useRef<HTMLInputElement | null>(null);
	const TextRef = useRef<HTMLTextAreaElement | null>(null);

	const {
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<UpdateCommentFormValues>({
		resolver: zodResolver(updateCommentSchema),
		defaultValues: {
			content,
			image: undefined,
		},
	});

	function handlePhoto() {
		if (ImgRef.current) {
			ImgRef.current.click();
		}
	}

	function onChangePhoto() {
		if (ImgRef.current) {
			const file = ImgRef.current.files?.[0];
			if (!file) return;
			setPostImage(file);
			setPreviewImage(URL.createObjectURL(file));
			setValue("image", file, { shouldValidate: true });
		}
	}

	function handleText() {
		if (TextRef.current) {
			setPostText(TextRef.current.value);
			setValue("content", TextRef.current.value, { shouldValidate: true });
		}
	}

	// removes only the newly picked image and goes back to the old one
	function removePhoto() {
		if (ImgRef.current) {
			if (postImage) URL.revokeObjectURL(PreviewImage);
			setPreviewImage(image);
			ImgRef.current.value = "";
			setPostImage(undefined);
			setValue("image", undefined);
		}
	}

	async function onSubmit() {
		const CommentData = new FormData();
		CommentData.append("content", postText);
		if (postImage) {
			CommentData.append("image", postImage);
		}
		return await axios.put(`https://route-posts.routemisr.com/posts/${postId}/comments/${commentId}`, CommentData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	const { mutate, isPending } = useMutation({
		mutationFn: onSubmit,
		onSuccess: function (data) {
			queryClient.invalidateQueries({ queryKey: ["comments", postId] });
			queryClient.invalidateQueries({ queryKey: ["postDetails", postId] });
			queryClient.invalidateQueries({ queryKey: ["profilePosts"] });
			queryClient.invalidateQueries({ queryKey: ["posts"] }); // top comment on the home page
			toast.success(data.data.message);
			onClose();
		},
		onError: function (error) {
			if (isAxiosError(error)) {
				toast.danger(error.response?.data.message);
			} else {
				toast.danger(error.message);
			}
		},
	});

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-4" onClick={onClose}>
			<section className="bg-white shadow-md rounded-xl p-3 sm:p-4 w-full max-w-lg max-h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
				<form onSubmit={handleSubmit(() => mutate())} className="space-y-2">
					<h3 className="text-base sm:text-lg font-bold text-primary">Edit Comment</h3>
					<TextArea ref={TextRef} defaultValue={content} onChange={handleText} className="h-20 w-full" variant="secondary" placeholder="Edit your comment" />
					{errors.content && <p className="text-sm text-red-600">{errors.content.message}</p>}
					<div>
						<input type="file" ref={ImgRef} onChange={onChangePhoto} accept="image/*,video/*" className="hidden" />
						{errors.image && <p className="text-sm text-red-600">{errors.image.message}</p>}
					</div>
					<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
						<Button onClick={handlePhoto} className="flex items-center justify-center gap-2 bg-secondary w-full sm:w-auto">
							<i className="fa-regular fa-image text-lg sm:text-xl text-white"></i>
							<p className="text-sm font-bold text-white">photo / video</p>
						</Button>
						<div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
							<Button isDisabled={isPending} type="submit" className="bg-primary text-white flex-1 sm:flex-none">
								{isPending ? "Saving..." : "Save"}
							</Button>
							<Button onClick={onClose} className="bg-transparent border-2 border-primary text-primary flex-1 sm:flex-none">
								Cancel
							</Button>
						</div>
					</div>
					{PreviewImage && (
						<div className="relative pt-4 border-t-2 border-gray-200">
							<img src={PreviewImage} className="w-full sm:w-[50%] h-48 sm:h-75 object-cover rounded-2xl mx-auto" alt="" />
							{postImage && (
								<Button onClick={removePhoto} className="absolute top-5 right-1 sm:right-35 min-w-0 bg-transparent">
									<i className="fa-regular fa-circle-xmark text-2xl text-red-700 cursor-pointer"></i>
								</Button>
							)}
						</div>
					)}
				</form>
			</section>
		</div>
	);
}