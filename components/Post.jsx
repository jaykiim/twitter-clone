import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Moment from "react-moment";

// recoil
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";

// firebase
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";

// styles
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";

const Post = ({ id, post, postPage }) => {
  console.log("post", post);
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);

  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

  // fetch 댓글
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db, id]
  );

  // fetch 좋아요
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  // 현재 사용자가 좋아요 눌렀는지 여부
  useEffect(
    () =>
      setLiked(likes.findIndex((like) => like.id === session.user?.uid) !== -1),
    [likes]
  );

  const likePost = async () => {
    if (liked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  return (
    <div
      className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/${id}`)}
    >
      {/*  */}
      {/* GUIDE 전체 박스 좌측 ====================================================================================================================================== */}

      {/* TODO 작성자 프로필 이미지 */}
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}

      {/* GUIDE 전체 박스 우측 ====================================================================================================================================== */}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img
              src={post?.userImg}
              alt="profile pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}

          {/* GUIDE 포스트 좌측 ====================================================================================================================================== */}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              {/*  */}
              {/* TODO 유저명 */}
              <h4
                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post?.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post?.tag}
              </span>
            </div>{" "}
            · {/* TODO 작성 시간 */}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
            </span>
            {/*  */}
            {/* TODO 포스트 내용 */}
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                {post?.text}
              </p>
            )}
          </div>

          {/* GUIDE 포스트 우측 ====================================================================================================================================== */}
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>

        {postPage && (
          <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
            {post?.text}
          </p>
        )}

        {/* TODO 포스트 이미지 */}
        {post.image && (
          <img
            src={post.image}
            alt="post-image"
            className="rounded-2xl max-h-[700px] object-cover mr-2"
          />
        )}

        {/* GUIDE 하단 버튼 ====================================================================================================================================== */}
        <div
          className={`text-[#6e767d] flex justify-between w-10/12 ${
            postPage && "mx-auto"
          }`}
        >
          {/* TODO 댓글 버튼 */}
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation(); // 부모 요소에 걸린 이벤트가 실행되는 것을 막음 (현재 컴포넌트의 최상위 div에 onClick 이벤트가 걸려있음)
              setPostId(id);
              setIsOpen(true);
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {/* TODO 삭제 버튼 */}
          {session.user.uid === post?.id ? (
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));
                router.push("/");
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (
            // 본인이 작성한 포스트가 아닐 경우
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          {/* TODO 좋아요 버튼 */}
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (
              <span
                className={`group-hover:text-pink-600 text-sm ${
                  liked && "text-pink-600"
                }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          {/* TODO 공유 버튼 */}
          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>

          {/* TODO 차트 버튼 */}
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
