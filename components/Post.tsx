import { useSession } from "next-auth/react";
import { useState } from "react";

import Moment from "react-moment";

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
import { Post } from "../type";

type Props = {
  post: Post;
  postPage: boolean;
};

const Post = ({ post, postPage }: Props) => {
  const { user } = useSession().data!;

  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);

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
      {/* IDEA 프로필 사진 (피드) */}
      {!postPage && renderProfilePic()}

      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {/*  */}
          {/* IDEA 프로필 사진 (상세페이지) */}
          {postPage && renderProfilePic()}

          <div className="text-gray-dark">
            {/*  */}
            {/* GUIDE 작성자 정보 ====================================================================================================================================== */}
            <div className="inline-block group">
              <h4
                className={`text-gray-light font-bold text-[15px] sm:text-base group-hover:underline ${
                  !postPage && "inline-block"
                }`}
              >
                {post.username}
              </h4>
              <span
                className={`text-sm sm:text-[15px] ${!postPage && "ml-1.5"}`}
              >
                @{post.tag}
              </span>
            </div>{" "}
            ·
            {/* GUIDE 작성 시각 ====================================================================================================================================== */}
            {/*  */}
            <span className="hover:underline text-sm sm:text-[15px]">
              {/* @ts-ignore */}
              <Moment fromNow>{post.timestamp?.toDate()}</Moment>
            </span>
            {/*  */}
            {/* IDEA 포스트 내용 (피드) */}
            {!postPage && renderPostText()}
          </div>

          <div className="icon-editor-container group">
            <DotsHorizontalIcon className="text-gray-dark icon-feed-blue" />
          </div>
        </div>

        {/* IDEA 포스트 내용 (상세페이지) */}
        {postPage && renderPostText()}

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
            postPage && "mx-auto"
          }`}
        >
          {/*  */}
          {/* TODO 댓글 */}

          <div className="flex items-center space-x-1 group">
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
              <div className="icon-editor-container group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            ) : (
              <div className="icon-editor-container group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            )}
          </div>

          {/* TODO 좋아요 */}

          <div className="flex items-center space-x-1 group">
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
