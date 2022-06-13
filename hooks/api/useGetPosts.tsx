import { useEffect, useState } from "react";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

import { Post } from "../../type";
import { db } from "../../firebase";

const useGetPosts = () => {
  const [posts, setPosts] = useState<never[] | Post[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          const docs = snapshot.docs as unknown;
          setPosts(docs as Post[]);
        }
      ),
    [db]
  );

  return posts;
};

export default useGetPosts;
