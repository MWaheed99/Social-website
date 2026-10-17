import { NavLink } from "react-router-dom";
import profileImage from "../../assets/avatar-4.jpg";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
export default function LeftSidebar() {

  const { token } = useAuth();
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
	return (
		<section className="sticky top-22 h-fit hidden md:flex flex-col gap-5">
			<div className="relative overflow-hidden flex flex-col justify-center items-center gap-3 bg-white shadow-md rounded-xl p-4">
				<div className="absolute top-0 right-0 left-0 h-20 bg-primary"></div>
				<div className="z-10 w-25 h-25 p-1 rounded-full overflow-hidden bg-secondary flex justify-center items-center">
					<img src={user.photo} className="w-full h-full rounded-full" alt="Profile" />
				</div>
				<div className="z-10 text-center">
					<h2 className="text-lg font-bold">{user.name}</h2>
					<p className="text-sm text-gray-500">{user.username}</p>
				</div>
        <div className="z-10 w-full flex items-center justify-around pt-1.5 gap-2 border-t-2">
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">[ 1000 ]</h3>
            <p className="text-sm text-gray-500">Posts</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">[ 100 ]</h3>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h3 className="text-lg font-bold">[ 109 ]</h3>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
			</div>
      <div className="flex flex-col justify-center items-start gap-3 bg-white shadow-md rounded-xl p-4">
        <ul className="sidebar-link flex flex-col gap-3 w-full">
          <li>
            <NavLink to="/" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <i className="fa-solid fa-house"></i>
              <span>Home</span></NavLink>
          </li>
          <li>
            <NavLink to={`/profile/${user._id}`} className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <i className="fa-solid fa-user"></i>
              <span>Profile</span></NavLink>
          </li>
          <li>
            <NavLink to="/setting" className="flex items-center gap-2 text-gray-600 hover:text-primary">
              <i className="fa-solid fa-gear"></i>
              <span>Setting</span></NavLink>
          </li>
        </ul>
      </div>
		</section>
	);
}
