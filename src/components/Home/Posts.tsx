// import axios, { isAxiosError } from "axios";
// import AddNewPost from "./AddNewPost";
// import PostCard from "./PostCard";
// import { useAuth } from "../../Context/AuthContext";
// import { useEffect, useState } from "react";
// import type { Post } from "../../interfaces/Post";
// import Loader from "../Loader/Loader";
// import { toast } from "@heroui/react";

// export default function Posts() {

//   const {token} = useAuth();
//   const [posts, setPosts] = useState<Post[] | null>(null);
//   const [loading, setLoading] = useState(true);

//   async function getPosts(){
//     try {
//       const {data} = await axios.get("https://route-posts.routemisr.com/posts",{
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       console.log(data);
//       setPosts(data.data.posts);
//     } catch (error) {
//       if(isAxiosError(error)){
//               toast.danger(error.response?.data.message);
//             }
//     } finally {
//       setLoading(false);
//     }
//   }


//   useEffect(() => {
//     getPosts();
//   } , []);

//   return (
//     <section className="space-y-7">
//       <AddNewPost />
//       {loading ? [1, 2, 3].map(() => <Loader />) : posts?.map((post) => <PostCard key={post._id} postData={post} />)}
//     </section>
//   )
// }


// use useQuery

import axios, { isAxiosError } from "axios";
import AddNewPost from "./AddNewPost";
import PostCard from "./PostCard";
import { useAuth } from "../../Context/AuthContext";
import type { Post } from "../../interfaces/Post";
import Loader from "../Loader/Loader";
import { toast } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

export default function Posts() {

  const {token} = useAuth();


function getPosts(){
    
    return axios.get("https://route-posts.routemisr.com/posts",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
  }

  const {data , isLoading , isError , error } = useQuery({
    queryKey : ["posts"],
    queryFn : getPosts,
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
    <section className="space-y-7">
      <AddNewPost />
      {  data?.data.data.posts?.map((post:Post) => <PostCard key={post._id} postData={post} variant="Posts"/>)}
    </section>
  )
}