import { Button, Dropdown, Label, toast } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios, { isAxiosError } from "axios";
import { useQuery } from "@tanstack/react-query";
const links = [
	{
		path: "/",
		name: "Home",
		icon: "fa-solid fa-house",
	},
	{
		path: "/profile",
		name: "Profile",
		icon: "fa-solid fa-user",
	},
	{
		path: "/notifications",
		name: "Notifications",
		icon: "fa-solid fa-bell",
	},
];
export default function Navbar() {
const  {token, updateToken} = useAuth();
const navigation = useNavigate();;
  
 function getMyProfileData() {

      return  axios.get(
        "https://route-posts.routemisr.com/users/profile-data",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
  }
  const {data , isLoading , isError , error } = useQuery({
      queryKey : ["profileData"],
      queryFn : getMyProfileData,
    });
  
    if(isLoading){
      console.log('loading')
    }
  
    if(isError){
      if(isAxiosError(error)){
        toast.danger(error.response?.data.message);
      }
    }





// async function getMyProfileData(){
//   try{
//     const {data} = await axios.get("https://route-posts.routemisr.com/users/profile-data",{
//       headers:{
//         Authorization:`Bearer ${token}`
//       }
//     })
//     console.log(data)
//   }
//   catch(error){
//     console.log(error)
//   }
// }

function navigateToSetting(){
  navigation("/setting")
}
  function LogOut(){
    updateToken(null)
    navigation("/auth/login")
  }

		return (
		<>
			<nav className="sticky top-0 right-0 left-0 z-50 bg-primary shadow-md">
				<div className="flex justify-between items-center gap-2 sm:gap-4 w-[92%] sm:w-[90%] mx-auto py-3 sm:py-4">
					<div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-xl bg-secondary flex justify-center items-center">
						<span className="text-primary text-lg sm:text-xl font-bold">MW</span>
					</div>
					<ul className="hidden md:flex items-center justify-center gap-4 lg:gap-6">
						<li>
								<NavLink to="/" className="flex items-center justify-center text-white">
									<i className="fa-solid fa-house mr-2 text-white"></i>
									<p>Home</p>
								</NavLink>
							</li>
							<li>
								<NavLink to={`/profile/${data?.data.data.user._id}`} className="flex items-center justify-center text-white">
									<i className="fa-solid fa-user mr-2 text-white"></i>
									<p>Profile</p>
								</NavLink>
							</li>
							{/* <li>
								<NavLink to="/notifications" className="flex items-center justify-center text-white">
									<i className="fa-solid fa-bell mr-2 text-white"></i>
									<p>Notifications</p>
								</NavLink>
							</li> */}
					</ul>
					<ul className="flex items-center justify-center gap-5 sm:gap-8 md:hidden">
						
							<li>
								<NavLink to="/" className="flex items-center justify-center p-2 text-white">
									<i className="fa-solid fa-house text-xl text-white"></i>
								</NavLink>
							</li>
							<li>
								<NavLink to={`/profile/${data?.data.data.user._id}`} className="flex items-center justify-center p-2 text-white">
									<i className="fa-solid fa-user text-xl text-white"></i>
								</NavLink>
							</li>
							{/* <li>
								<NavLink to="/notifications" className="flex items-center justify-center p-2 text-white">
									<i className="fa-solid fa-bell text-xl text-white"></i>
								</NavLink>
							</li> */}
						
					</ul>
					<Dropdown>
						<Button aria-label="Menu" className="flex items-center gap-2 bg-secondary h-10 sm:h-12 px-2 sm:px-4 shrink-0 min-w-0">
							<div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 p-1 bg-primary rounded-full overflow-hidden">
								<img src={data?.data.data.user.photo} className="w-full h-full rounded-full object-cover" alt={data?.data.data.user.name} />
							</div>
							<p className="hidden sm:block max-w-24 lg:max-w-40 truncate text-primary font-bold">{data?.data.data.user.name}</p>
							<i className="fa-solid fa-caret-down text-primary"></i>
						</Button>
						<Dropdown.Popover>
							<Dropdown.Menu>
								<Dropdown.Item id="setting" onClick={navigateToSetting} textValue="Setting">
									<Label>Setting</Label>
								</Dropdown.Item>
								<Dropdown.Item id="log-out" onClick={LogOut} textValue="Log Out" variant="danger">
									<Label>Log Out</Label>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown.Popover>
					</Dropdown>
				</div>
			</nav>
		</>
	);
}
