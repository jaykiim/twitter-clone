import { DotsHorizontalIcon } from "@heroicons/react/outline";
import React from "react";

// types
import { Comment } from "../../type";
import PostMeta from "../post/PostMeta";

type Props = {
  comment: Comment;
};

const Comment = ({ comment }: Props) => {
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      <img
        src={comment?.userImg}
        alt="comment writer's profile pic"
        className="circle-11 mr-4"
      />

      <div className="flex flex-col space-y-2 w-full">
        <div className="flex justify-between">
          <div className="text-gray-dark">
            <div className="inline-block group">
              {/*  */}
              {/* TODO 작성자 정보  */}
              <PostMeta post={comment} />

              {/* TODO 댓글 텍스트 */}

              <p className="text-[#d9d9d9] mt-0.5 max-w-lg overflow-scroll-auto text-[15px] sm:text-base">
                {comment?.comment}
              </p>

              {/* TODO 댓글 이미지 */}

              {comment.image && (
                <div className="mt-2">
                  <img
                    src={comment.image}
                    alt="uploaded-image"
                    className="rounded-2xl max-h-80 object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* TODO ... 버튼 */}

          <div className="icon-editor-container group flex-shrink-0">
            <DotsHorizontalIcon className="h-5 text-gray-dark group-hover:text-tweet-blue-light" />
          </div>
        </div>

        {/* TODO 버튼 목록 */}
      </div>
    </div>
  );
};

export default Comment;
