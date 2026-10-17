import axios from "axios"
import { useAuth } from "../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Comment from "./Comment";
import type { PostComment } from "../../interfaces/Post";
import { Button } from "@heroui/react";

interface Comment {
  id: string;
  isDetails: boolean
}
export default function CommentList({id , isDetails }:Comment) {

  const {token} = useAuth();

  function getAllComments() {
    return axios.get(`https://route-posts.routemisr.com/posts/${id}/comments`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  const {data , isLoading , isError , error} =  useQuery({
      queryKey : ["comments" , id],
      queryFn : getAllComments,
    })


    console.log("Comments response:", data?.data);
console.log("Loading:", isLoading);
console.log("Error:", error);
  return (
    <>
    {
      isDetails && data?.data.data.comments.map((comment : PostComment) => (
        <Comment key={comment._id} comment={comment} />
      ))
    }
    {/* {
      data?.data.data.comments.length > 2 && <span className="text-sm text-gray-500 underline cursor-pointer ">Show More</span>
    } */}
    </>
  )
}
