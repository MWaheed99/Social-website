import { Button, Input, toast } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../Context/AuthContext";
import { changePasswordSchema, type ChangePasswordFormValues } from "../../schema/ChangePasswordSchema";

export default function ChangePassword() {
	const { token, updateToken } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ChangePasswordFormValues>({
		resolver: zodResolver(changePasswordSchema),
		defaultValues: {
			password: "",
			newPassword: "",
		},
	});

	async function changePassword(values: ChangePasswordFormValues) {
		return await axios.patch("https://route-posts.routemisr.com/users/change-password", values, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	}

	const { mutate, isPending } = useMutation({
		mutationFn: changePassword,
		onSuccess: function (data) {
			toast.success(data.data.message);
			// if the API returns a fresh token after the change, keep the user logged in with it
			const newToken = data.data?.data?.token;
			if (newToken) {
				updateToken(newToken);
			}
			reset();
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
		<section className="px-5 w-full max-w-md mx-auto py-10">
			<form onSubmit={handleSubmit((values) => mutate(values))} className="bg-white shadow-md rounded-xl p-6 space-y-4">
				<h2 className="text-xl font-bold text-primary">Change Password</h2>

				<div className="space-y-1">
					<label htmlFor="password" className="text-sm text-gray-600">
						Current password
					</label>
					<Input id="password" type="password" variant="secondary" className="w-full" placeholder="Current password" {...register("password")} />
					{errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
				</div>

				<div className="space-y-1">
					<label htmlFor="newPassword" className="text-sm text-gray-600">
						New password
					</label>
					<Input id="newPassword" type="password" variant="secondary" className="w-full" placeholder="New password" {...register("newPassword")} />
					{errors.newPassword && <p className="text-sm text-red-600">{errors.newPassword.message}</p>}
				</div>

				<Button isDisabled={isPending} type="submit" className="w-full bg-primary text-white">
					{isPending ? "Updating..." : "Change Password"}
				</Button>
			</form>
		</section>
	);
}