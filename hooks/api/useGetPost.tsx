import { useEffect, useState } from "react";

// recoil
import { useRecoilValue } from "recoil";
import { commentModalState } from "../../atoms/modal";

// firebase
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

// types
import { Post } from "../../type";

const useGetPost = (postId?: string) => {
  const commentModal = useRecoilValue(commentModalState);
  const [post, setPost] = useState<undefined | Post>();

  const id = commentModal.postId || postId;

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", id!), (snapshot) => {
        const post = snapshot.data() as unknown;
        setPost(post as Post);
      }),
    [db]
  );

  return post;
};

export default useGetPost;
