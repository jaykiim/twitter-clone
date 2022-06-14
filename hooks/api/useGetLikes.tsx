import React, { useEffect, useState } from "react";

// firebase
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// types
import { Like } from "../../type";

const useGetLikes = (postId: string) => {
  const [likes, setLikes] = useState<never[] | Like[]>([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) => {
        const docs = snapshot.docs as unknown;
        setLikes(docs as Like[]);
      }),
    [db, postId]
  );

  return likes;
};

export default useGetLikes;
