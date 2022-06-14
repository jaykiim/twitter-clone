import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import Moment from "react-moment";

// recoil
import { useSetRecoilState } from "recoil";
import { commentModalState } from "../../atoms/modal";

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
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";

// types
import { Post } from "../../type";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import useGetLikes from "../../hooks/api/useGetLikes";
import useGetComments from "../../hooks/api/useGetComments";
import PostMeta from "./PostMeta";

type Props = {
  postId: string;
  post: Post;
  detail: boolean;
};

const Post = ({ postId, post, detail }: Props) => {
  const router = useRouter();
  const { user } = useSession().data!;

  const likes = useGetLikes(postId);
  const comments = useGetComments(postId); // 코멘트 갯수 표시하기 위해

  const [liked, setLiked] = useState(false);
  const setCommentModal = useSetRecoilState(commentModalState);

  // 현재 포스트에 대한 사용자의 liked 상태 변경
  useEffect(
    // @ts-ignore
    () => setLiked(likes.findIndex((like) => like.id === user.uid) !== -1),
    [likes]
  );

  /* ==================================================================================================== 
  ? 이벤트 핸들러
  ==================================================================================================== */

  const onCommentClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 댓글 아이콘 클릭 시, 상세보기 이벤트 (전체 컨테이너 div 클릭) 전파 방지
    e.stopPropagation();
    setCommentModal({ open: true, postId });
  };

  const onDeleteClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    deleteDoc(doc(db, "posts", postId));
    router.push("/");
  };

  const onLikeClick = async () => {
    if (liked) {
      // @ts-ignore
      await deleteDoc(doc(db, "posts", postId, "likes", user.uid));
    } else {
      // @ts-ignore
      await setDoc(doc(db, "posts", postId, "likes", user.uid), {
        username: user?.name,
      });
    }
  };

  /* ==================================================================================================== 
  ? UI 렌더 함수
  ==================================================================================================== */

  const renderProfilePic = () => (
    <img
      src={post.userImg}
      alt="writer's profile picture"
      className="circle-11 mr-4"
    />
  );

  const renderPostText = () => (
    <p className="text-gray-light text-[15px] sm:text-base mt-0.5">
      {post.text}
    </p>
  );

  return (
    <div className="flex p-3 border-b border-gray-700 cursor-pointer">
      {/*  */}
      {/* TODO 프로필 사진 (피드) */}
      {!detail && renderProfilePic()}

      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!detail && "justify-between"}`}>
          {/*  */}
          {/* IDEA 프로필 사진 (상세페이지) */}
          {detail && renderProfilePic()}

          <div className="text-gray-dark">
            {/*  */}
            {/* TODO 작성자명 · 태그 · 작성 시각 */}
            <PostMeta post={post} />

            {/* TODO 포스트 내용 (피드) */}
            {!detail && renderPostText()}
          </div>

          <div className="icon-editor-container group">
            <DotsHorizontalIcon className="text-gray-dark icon-feed-blue" />
          </div>
        </div>

        {/* IDEA 포스트 내용 (상세페이지) */}
        {detail && renderPostText()}

        {post.image && (
          <img
            src={post.image}
            alt="post-image"
            className="rounded-2xl max-h-[700px] object-cover mr-2"
          />
        )}

        {/* GUIDE 하단 버튼 ====================================================================================================================================== */}

        <div
          className={`text-gray-dark flex justify-between w-10/12 ${
            detail && "mx-auto"
          }`}
        >
          {/*  */}
          {/* TODO 댓글 */}

          <div
            onClick={onCommentClick}
            className="flex items-center space-x-1 group"
          >
            {/* 아이콘 */}
            <div className="icon-editor-container group-hover:bg-tweet-blue-light group-hover:bg-opacity-10">
              <ChatIcon className="icon-feed-blue" />
            </div>

            {/* 댓글 갯수 */}
            {comments.length > 0 && (
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>

          {/* TODO 삭제 or 상세보기 */}

          <div className="flex items-center space-x-1 group">
            {/* @ts-ignore */}
            {user.uid === post.id ? (
              <div
                onClick={onDeleteClick}
                className="icon-editor-container group-hover:bg-red-600/10"
              >
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            ) : (
              <div className="icon-editor-container group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            )}
          </div>

          {/* TODO 좋아요 */}

          <div
            onClick={onLikeClick}
            className="flex items-center space-x-1 group"
          >
            {/* 아이콘 */}
            <div className="icon-editor-container group-hover:bg-pink-600/10">
              {liked ? (
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>

            {/* 좋아요 갯수 */}
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

          {/* TODO 공유 */}

          <div className="icon-editor-container group">
            <ShareIcon className="icon-feed-blue" />
          </div>

          {/* TODO 차트 */}

          <div className="icon-editor-container group">
            <ChartBarIcon className="icon-feed-blue" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
