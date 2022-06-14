import FeedEditor from "./FeedEditor";
import Topbar from "../../components/Topbar";
import useGetPosts from "../../hooks/api/useGetPosts";
import Post from "../post/Post";

const Feed = () => {
  const posts = useGetPosts();

  return (
    <div className="text-white sm:ml-[73px] xl:ml-[370px] border-x border-gray-700 flex-grow max-w-2xl">
      <Topbar text="home" />
      <FeedEditor />

      <div className="pb-72">
        {posts.map((post) => (
          // @ts-ignore
          <Post key={post.id} postId={post.id} post={post.data()} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
