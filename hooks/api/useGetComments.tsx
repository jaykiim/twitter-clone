import React, { useEffect, useState } from "react";

// firebase
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

// types
import { Comment } from "../../type";

const useGetComments = (postId: string) => {
  const [comments, setComments] = useState<never[] | Comment[]>([]);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", postId, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => {
          const docs = snapshot.docs as unknown;
          setComments(docs as Comment[]);
        }
      ),
    [db, postId]
  );

  return comments;
};

export default useGetComments;
