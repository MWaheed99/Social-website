import { useQuery } from "@tanstack/react-query";
import ProfileHeader from "../../components/profile/ProfileHeader";
import { useAuth } from "../../Context/AuthContext";
import axios, { isAxiosError } from "axios";
import Loader from "../../components/Loader/Loader";
import { toast } from "@heroui/react";
import { useParams } from "react-router-dom";
import ProfilePosts from "../../components/profile/ProfilePosts";
import RightSidebar from "../../components/Home/RightSidebar";
export default function Profile() {
      const {id} = useParams();

  const  {token} = useAuth();
  
 function getMyProfileData() {


      return  axios.get(
        `https://route-posts.routemisr.com/users/${id}/profile`,
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
      return [1, 2, 3].map(() => <Loader />);
    }
  
    if(isError){
      if(isAxiosError(error)){
        toast.danger(error.response?.data.message);
      }
    }


    
  return (
    <>
    <ProfileHeader ProfileData={data?.data.data.user}/>
    <div className="w-[94%] sm:w-[90%] mx-auto grid grid-cols-12 gap-3.5">
      <div className="order-2 lg:order-1 col-span-12 lg:col-span-8 min-w-0">
        <ProfilePosts />
      </div>
      <div className="order-1 lg:order-2 col-span-12 lg:col-span-4 min-w-0">
        <RightSidebar />
      </div>
    </div>
    </>
  )
}