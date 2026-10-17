import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const createPostSchema = z
	.object({
		body: z
			.string()
			.trim()
			.max(2000, "Post must not exceed 2000 characters")
			.optional(),

		image: z
			.instanceof(File, { message: "Invalid file" })
			.refine((file) => file.size <= MAX_FILE_SIZE, "File size must be less than 10MB")
			.refine(
				(file) => file.type.startsWith("image/") || file.type.startsWith("video/"),
				"File must be an image or a video"
			)
			.optional(),
	})
	// Require either text or a file
	.refine((data) => !!data.body || !!data.image, {
		message: "Write something or upload a photo/video before posting",
		path: ["body"],
	});

export type CreatePostFormValues = z.infer<typeof createPostSchema>;