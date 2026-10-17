import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import PostCard from "../Home/PostCard";
import Loader from "../Loader/Loader";
import axios, { isAxiosError } from "axios";
import { toast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

export default function SinglePost() {

  const {token} = useAuth();

  const {id} = useParams();
  
  function getPost(){
    return axios.get(`https://route-posts.routemisr.com/posts/${id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const {data , isLoading , isError , error } = useQuery({
    queryKey : ["postDetails" , id],
    queryFn : getPost,
  });

  if(isLoading){
      return  <Loader />;
    }
  
    if(isError){
      if(isAxiosError(error)){
        toast.danger(error.response?.data.message);
      }
    }

  return (
    <section className="w-[70%] mx-auto py-6">
    <PostCard postData={data?.data.data.post} variant="details"/>
    </section>
  )
}
