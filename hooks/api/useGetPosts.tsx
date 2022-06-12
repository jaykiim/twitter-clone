import { Post } from "../../type";

type Props = {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
};

const useGetPosts = ({ posts, setPosts }: Props) => {};

export default useGetPosts;
