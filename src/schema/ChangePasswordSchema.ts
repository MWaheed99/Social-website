import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const changePasswordSchema = z
	.object({
		password: z.string().min(1, "Current password is required"),
		newPassword: z
			.string()
			.regex(passwordRegex, "Min 8 chars, with uppercase, lowercase, a number and a special character"),
	})
	.refine((data) => data.password !== data.newPassword, {
		message: "New password must be different from the current one",
		path: ["newPassword"],
	});

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;