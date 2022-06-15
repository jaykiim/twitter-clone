import React, { useState } from "react";
import { useSession } from "next-auth/react";

// recoil
import { useSetRecoilState } from "recoil";
import { commentModalState } from "../atoms/modal";

// firebase
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

// components
import FeedEditorBtns from "./btns/TweetEditorBtns";

// styles
import { XIcon } from "@heroicons/react/outline";

// types
import { Base64 } from "../type";
import { useRouter } from "next/router";

type Props = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  comment?: boolean;
  postId?: string;
};

const TweetEditor = ({ loading, setLoading, comment, postId }: Props) => {
  const { user } = useSession().data!;
  const router = useRouter();

  const setCommentModal = useSetRecoilState(commentModalState);
  const [input, setInput] = useState("");
  const [selectedImg, setSelectedImg] = useState<Base64 | null>(null!);

  /* ==============================================================================================================================================================
  * 포스트 업로드
  ==============================================================================================================================================================*/

  const handleSubmitPost = async () => {
    if (loading) return;
    setLoading(true);

    // ? 컬렉션에 도큐먼트 추가

    const docRef = await addDoc(collection(db, "posts"), {
      // @ts-ignore
      id: user?.uid,
      username: user?.name,
      userImg: user?.image,
      // @ts-ignore
      tag: user?.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    // ? (이미지가 있을 경우) 이미지 파일 Ref

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedImg) {
      //
      // ? 스토리지에 이미지 업로드

      await uploadString(imageRef, selectedImg, "data_url").then(async () => {
        //
        // ? 이미지 파일 url

        const downloadURL = await getDownloadURL(imageRef);

        // ? 도큐먼트에 이미지 추가

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedImg(null);
  };

  /* ==============================================================================================================================================================
  * 댓글 업로드
  ==============================================================================================================================================================*/

  const handleSubmitComment = async () => {
    if (loading) return;
    setLoading(true);

    const commentRef = await addDoc(
      collection(db, "posts", postId!, "comments"),
      {
        comment: input,
        username: user?.name,
        // @ts-ignore
        tag: user?.tag,
        userImg: user?.image,
        timestamp: serverTimestamp(),
      }
    );

    const imageRef = ref(storage, `posts/${commentRef}/image`);

    if (selectedImg) {
      await uploadString(imageRef, selectedImg, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", postId!, "comments", commentRef.id), {
          image: downloadURL,
        });
      });
    }

    setCommentModal({ open: false, postId: "" });
    setInput("");

    router.push(`/post/${postId}`);
  };

  return (
    <div className="w-full divide-y divide-gray-700">
      {/*  */}
      {/* GUIDE 텍스트 및 사진 ============================================================================================================================================================== */}

      <div className={`${selectedImg && "pb-7"} ${input && "space-y-2.5"}`}>
        {/*  */}
        {/* TODO 텍스트 입력 */}

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          placeholder={comment ? "Tweet your reply" : "What's happening"}
          className="bg-transparent outline-none text-gray-light text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
        />

        {/*  */}
        {/* GUIDE 사진 ============================================================================================================================================================== */}

        {selectedImg && (
          <div className="relative">
            {/*  */}
            {/* TODO 지우기 버튼 */}

            <div
              onClick={() => setSelectedImg(null)}
              className="absolute top-1 left-1 bg-[#15181c] bg-opacity-50 hover:bg-opacity-75 w-8 h-8 rounded-full center-xy cursor-pointer"
            >
              <XIcon className="text-white h-5" />
            </div>

            {/* TODO 이미지 미리보기 */}

            <img
              src={selectedImg}
              alt="uploaded-image"
              className="rounded-2xl max-h-80 object-contain"
            />
          </div>
        )}
      </div>

      {/* GUIDE 버튼 ========================================================================================================================================================== */}

      {!loading && (
        <div className="flex items-center justify-between pt-2.5">
          <FeedEditorBtns setSelectedImg={setSelectedImg} />

          {/* TODO 업로드 버튼 */}

          <button
            className="btn-tweet px-4 py-1.5"
            disabled={!input.trim() && !selectedImg}
            onClick={comment ? handleSubmitComment : handleSubmitPost}
          >
            Tweet
          </button>
        </div>
      )}
    </div>
  );
};

export default TweetEditor;
