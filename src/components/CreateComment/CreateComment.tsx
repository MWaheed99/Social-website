import { Button, TextArea, toast } from "@heroui/react";
import avatarImage from "../../assets/avatar-4.jpg";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useAuth } from "../../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAddCommentSchema, type CreateAddCommentFormValues } from "../../schema/CreateAddCommentSchema";
export default function CreateComment({ id }: { id: string }) {
	const queryClient = useQueryClient();
	const { token } = useAuth();
	const [PreviewImage, setPreviewImage] = useState<string>("");
	const [postImage, setPostImage] = useState<File | undefined>(undefined);
	const [postText, setPostText] = useState<string>("");
	const ImgRef = useRef<HTMLInputElement | null>(null);
	const TextRef = useRef<HTMLTextAreaElement | null>(null);

	// same query as Navbar (same key) -> served from the cache, no extra request
	const { data: profileData } = useQuery({
		queryKey: ["profileData"],
		queryFn: () =>
			axios.get("https://route-posts.routemisr.com/users/profile-data", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}),
	});
	const user = profileData?.data.data.user;

	const {
		handleSubmit,
		setValue,
		reset,
		formState: { errors },
	} = useForm<CreateAddCommentFormValues>({
		resolver: zodResolver(createAddCommentSchema),
		defaultValues: {
			content: "",
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

	function removePhoto() {
		if (ImgRef.current) {
			URL.revokeObjectURL(PreviewImage);
			setPreviewImage("");
			ImgRef.current.value = "";
			setPostImage(undefined);
			setValue("image", undefined);
		}
	}

	function cancelPost() {
		removePhoto();
		if (TextRef.current) {
			TextRef.current.value = "";
			setPostText("");
		}
		reset();
	}

	async function onSubmit() {
		const PostData = new FormData();
		if (postText) {
			PostData.append("content", postText);
		}
		if (postImage) {
			PostData.append("image", postImage);
		}
		return await axios.post(`https://route-posts.routemisr.com/posts/${id}/comments`, PostData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	const { mutate, isPending } = useMutation({
		mutationFn: onSubmit,
		onSuccess: function (data) {
			queryClient.invalidateQueries({ queryKey: ["comments", id] });
			queryClient.invalidateQueries({ queryKey: ["posts"] }); // top comment + commentsCount في الهوم
			queryClient.invalidateQueries({ queryKey: ["postDetails", id] }); // commentsCount في صفحة التفاصيل
			queryClient.invalidateQueries({ queryKey: ["profilePosts"] }); // نفس الكلام في صفحة البروفايل
			toast.success(data.data.message);
			cancelPost();
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
		<section className="bg-white shadow-md rounded-xl p-3 sm:p-4">
			<form onSubmit={handleSubmit(() => mutate())} className="space-y-2">
				<div className="flex items-center gap-3 sm:gap-4">
					<img src={user?.photo || avatarImage} alt={user?.name} className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-full object-cover" />
					<h4 className="text-sm sm:text-base truncate">{user?.name}</h4>
				</div>
				<TextArea ref={TextRef} onChange={handleText} className="h-10 w-full" variant="secondary" placeholder="What's on your mind" />
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
							Post
						</Button>
						<Button onClick={cancelPost} className="bg-transparent border-2 border-primary text-primary flex-1 sm:flex-none">
							Cancel
						</Button>
					</div>
				</div>
				{PreviewImage && (
					<div className="relative pt-4 border-t-2 border-gray-200">
						<img src={PreviewImage} className="w-full sm:w-[50%] h-48 sm:h-75 object-cover rounded-2xl mx-auto" alt="" />
						<Button onClick={removePhoto} className="absolute top-5 right-1 sm:right-35 min-w-0 bg-transparent">
							<i className="fa-regular fa-circle-xmark text-2xl text-red-700 fa-regular fa-image cursor-pointer"></i>
						</Button>
					</div>
				)}
			</form>
		</section>
	);
}
