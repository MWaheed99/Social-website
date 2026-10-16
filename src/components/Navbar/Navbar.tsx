import { Button, Dropdown, Label } from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import ProfileImage from "../../assets/avatar-4.jpg";
import { useAuth } from "../../Context/AuthContext";
// import axios from "axios";
// import { useEffect, useState } from "react";
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
const  {updateToken} = useAuth();
const navigation = useNavigate();
// const [profileData, setProfileData] = useState<any>(null);

// async function getMyProfileData() {
//   try {
//     const { data } = await axios.get(
//       "https://route-posts.routemisr.com/users/profile-data",
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setProfileData(data.data);
//   } catch (error) {
//     console.log(error);
//   }
// }

// useEffect(() => {
//   if (token) {
//     getMyProfileData();
//   }
// }, [token]);

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
			<nav className="sticky top-0 right-0 left-0 bg-primary shadow-md">
				<div className="flex justify-between items-center w-[90%] mx-auto py-4">
					<div className="w-12 h-12 rounded-xl bg-secondary flex justify-center items-center">
						<span className="text-primary text-xl font-bold">MW</span>
					</div>
					<ul className="hidden md:block">
						{links.map((link) => (
							<li key={link.path} className="inline-block mr-4">
								<NavLink to={link.path} className="text-white">
									<i className={`${link.icon} mr-2 text-white`}></i>
									{link.name}
								</NavLink>
							</li>
						))}
					</ul>
					<ul className="flex items-center justify-center gap-6 md:hidden">
						{links.map((link) => (
							<li key={link.path}>
								<NavLink to={link.path} className="flex items-center justify-center text-white">
									<i className={`${link.icon} text-white`}></i>
								</NavLink>
							</li>
						))}
					</ul>
					<Dropdown>
						<Button aria-label="Menu" className="flex items-center gap-2 bg-secondary h-12">
							<img src={ProfileImage} className="w-8 h-8 rounded-full" alt="Profile" />
							<p className="text-primary font-bold">John Doe</p>
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
