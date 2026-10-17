import LeftSidebar from "../../components/Home/LeftSidebar";
import Posts from "../../components/Home/Posts";
import RightSidebar from "../../components/Home/RightSidebar";

export default function Home() {
  return (
    <section className="grid grid-cols-12 gap-4 w-full p-3">
      <div className="hidden lg:block lg:col-span-3">
        <LeftSidebar />
      </div>
      <div className="col-span-12 lg:col-span-6 min-w-0">
        <Posts />
      </div>
      <div className="hidden lg:block lg:col-span-3">
        <RightSidebar />
      </div>
    </section>
  )
}