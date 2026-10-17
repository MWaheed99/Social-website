import { toast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import Loader from "../Loader/Loader";
import PostCard from "../Home/PostCard";
import type { Post } from "../../interfaces/Post";


export default function ProfilePosts() {

  const {id} = useParams();

  const  {token} = useAuth();
  function getUserPostData() {


      return  axios.get(
        `https://route-posts.routemisr.com/users/${id}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
  }
  const {data , isLoading , isError , error } = useQuery({
      queryKey : ["profilePosts"],
      queryFn : getUserPostData,
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
         <div className="space-y-4">
         {  data?.data.data.posts?.map((post:Post) => <PostCard key={post._id} postData={post} variant="Posts"/>)}
         </div>

  )
}
