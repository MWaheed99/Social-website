import { Button, Input,toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import { LoginSchema, type LoginFormSchema } from "../../schema/LoginSchema";
import type { loginFormData } from "../../interfaces/login";
import { useAuth } from "../../Context/AuthContext";
export default function Login() {
	const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { updateToken } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormSchema>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(LoginSchema),
	});

	async function onSubmit(formData:loginFormData) {
		try {
			setLoading(true);
			const { data } = await axios.post("https://route-posts.routemisr.com/users/signin", formData);
			toast.success(data.message);
			// console.log(data);
      updateToken(data.data.token);
      navigate("/");
		} catch (error) {
			if (isAxiosError(error)) {
				toast.danger(error.response?.data.message);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<>
			<div className="w-[90%] flex flex-col gap-8 bg-white p-10 rounded-lg shadow-md">
				<div>
					<h2 className="text-primary text-2xl font-bold mb-1.5">Welcome back</h2>
					<p className="text-gray-600 text-sm">Log in to see what your friends are sharing.</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<Input {...register("email")} fullWidth placeholder="Enter your email" type="email" />
					{errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					<Input {...register("password")} fullWidth placeholder="Enter your password" type="password" />
					{errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
					<Button isDisabled={loading} type="submit" className="w-full bg-secondary text-white hover:bg-secondary/90">
						{loading && <SyncLoader color="#ffff" size={6} margin={1} />}
						LogIn
					</Button>
				</form>
				<p className="text-gray-600 text-sm">
					New Here?
					<Link to="/auth/register" className="text-secondary underline">
						Create an account
					</Link>
				</p>
			</div>
		</>
	);
}
