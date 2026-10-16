import LeftSidebar from "../../components/Home/LeftSidebar";
import Posts from "../../components/Home/Posts";
import RightSidebar from "../../components/Home/RightSidebar";

export default function Home() {
  return (
    <section className="flex gap-4 w-full p-3">
      <LeftSidebar />
      <Posts />
      <RightSidebar />
    </section>
  )
}
