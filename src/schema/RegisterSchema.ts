import * as z from "zod";

export const RegisterSchema = z
	.object({
		name: z.string().min(2, { message: "Name must be at least 2 characters" }).max(20, { message: "Name must be less than 20 characters" }),
		username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(20, { message: "Username must be less than 20 characters" }),
		email: z.string().email({ message: "Invalid email address" }),
		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(20, "Password must be at most 20 characters")
			.regex(/[A-Z]/, "Must contain an uppercase letter")
			.regex(/[a-z]/, "Must contain a lowercase letter")
			.regex(/[0-9]/, "Must contain a number")
			.regex(/[!@#$%^&*]/, "Must contain a special character (!@#$%^&*)"),
		rePassword: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(20, "Password must be at most 20 characters")
			.regex(/[A-Z]/, "Must contain an uppercase letter")
			.regex(/[a-z]/, "Must contain a lowercase letter")
			.regex(/[0-9]/, "Must contain a number")
			.regex(/[!@#$%^&*]/, "Must contain a special character (!@#$%^&*)"),
		dateOfBirth: z.string().refine(
			(date) => {
				const today = new Date();
				const birthDate = new Date(date);
				const age = today.getFullYear() - birthDate.getFullYear();
				return age >= 13;
			},
			{ message: "Invalid date of birth - you must be at least 13 years old" },
		),
		gender: z.enum(["male", "female"], { message: "Gender must be either male or female" }),
	})
	.refine((data) => data.password === data.rePassword, {
		message: "Passwords don't match",
		path: ["rePassword"],
	});

export type RegisterFormSchema = z.infer<typeof RegisterSchema>;
