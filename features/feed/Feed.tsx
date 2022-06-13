import FeedEditor from "./FeedEditor";
import Topbar from "../../components/Topbar";
import useGetPosts from "../../hooks/api/useGetPosts";

const Feed = () => {
  const posts = useGetPosts();

  console.log(posts);

  return (
    <div className="text-white sm:ml-[73px] xl:ml-[370px] border-x border-gray-700 flex-grow max-w-2xl">
      <Topbar text="home" />
      <FeedEditor />
    </div>
  );
};

export default Feed;
