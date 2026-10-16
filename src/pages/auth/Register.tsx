import { Button, Input, Radio, RadioGroup, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {  SyncLoader } from "react-spinners";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterFormData } from "../../interfaces/register";
import { RegisterSchema, type RegisterFormSchema } from "../../schema/RegisterSchema";

export default function Register() {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit , formState: { errors } } = useForm<RegisterFormSchema>(
    {
      defaultValues: {
        name: '',
        username: '',
        email: '',
        password: '',
        rePassword: '',
        dateOfBirth: '',
        gender: 'male',
      },
      resolver: zodResolver(RegisterSchema),
    }
    
  );



  async function onSubmit(formData : RegisterFormData) {
    try{
    setLoading(true);
      const {data} = await axios.post("https://route-posts.routemisr.com/users/signup", formData)
      toast.success(data.message);
      // console.log(data);
      navigate("/auth/login");
    }
    catch(error){
      if(isAxiosError(error)){
        toast.danger(error.response?.data.message);
      }
    }
    finally{
      setLoading(false);
    }
  }

	return (
		<>
			<div className="w-[90%] flex flex-col gap-8 bg-white p-10 rounded-lg shadow-md">
				<div>
					<h2 className="text-primary text-2xl font-bold mb-1.5">Create your account</h2>
					<p className="text-gray-600 text-sm">It only takes a minute to join.</p>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
					<Input {...register("name")} fullWidth placeholder="Enter your name" type="text" />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
					<Input {...register("username")} fullWidth placeholder="Enter your username" type="text" />
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
					<Input {...register("email")} fullWidth placeholder="Enter your email" type="email" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
					<Input {...register("password")} fullWidth placeholder="Enter your password" type="password" />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
					<Input {...register("rePassword")} fullWidth placeholder="Confirm your password" type="password" />
          {errors.rePassword && <p className="text-red-500 text-sm">{errors.rePassword.message}</p>}
					<Input {...register("dateOfBirth")} fullWidth placeholder="Enter your date of birth" type="date" />
          {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
					<RadioGroup name="gender" orientation="horizontal">
						<Radio {...register("gender")} value="male">
							<Radio.Content>
								<Radio.Control>
									<Radio.Indicator />
								</Radio.Control>
								Male
							</Radio.Content>
						</Radio>
						<Radio {...register("gender")} value="female">
							<Radio.Content>
								<Radio.Control>
									<Radio.Indicator />
								</Radio.Control>
								Female
							</Radio.Content>
						</Radio>
					</RadioGroup>
          {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
           <Button isDisabled={loading} type="submit" className="w-full bg-secondary text-white hover:bg-secondary/90">
           {loading && <SyncLoader color="#ffff" size={6} margin={1} />
}
           Create New Account
           </Button>
				</form>
        <p className="text-gray-600 text-sm">Already have an account?
           <Link to="/auth/login" className="text-secondary underline">Sign in</Link></p>
			</div>
		</>
	);
}



