import { Fragment, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

// recoil
import { useRecoilState } from "recoil";
import { commentModalState } from "../../atoms/modal";

// styles
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

// types
import { Post } from "../../type";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Moment from "react-moment";
import PostMeta from "../post/PostMeta";

const CommentModal = () => {
  const { user } = useSession().data!;

  // 현재창 열림/닫힘 + 포스트 id
  const [commentModal, setCommentModal] = useRecoilState(commentModalState);

  // 포스트 내용
  const [post, setPost] = useState<undefined | Post>();

  // 댓글 입력
  const [comment, setComment] = useState("");

  // 포스트 내용 패치
  useEffect(() =>
    onSnapshot(doc(db, "posts", commentModal.postId), (snapshot) => {
      const post = snapshot.data() as unknown;
      setPost(post as Post);
    })
  );

  const handleModalClose = () => setCommentModal({ open: false, postId: "" });

  return (
    <Transition.Root show={commentModal.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 pt-8"
        onClose={handleModalClose}
      >
        <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-black rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
              {/*  */}
              {/* GUIDE 실선 상단 ================================================================================================================================================================================================================== */}

              {/* TODO 닫기 버튼 */}

              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0">
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>

              {/* GUIDE 실선 하단 ================================================================================================================================================================================================================== */}

              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  {/*  */}
                  {/* GUIDE 포스트 원문 ================================================================================================================================================================================================================== */}

                  <div className="text-gray-dark flex gap-x-3 relative">
                    {/*  */}
                    {/* TODO 세로줄 */}

                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />

                    {/* TODO 작성자 프로필 사진 */}

                    <img
                      src={post?.userImg}
                      alt="writer's profile picture"
                      className="circle-11"
                    />

                    {/* GUIDE 포스트 우측 ======================================================================================================================================== */}

                    <div>
                      <PostMeta post={post} />

                      {/* TODO 포스트 내용 */}

                      <p className="text-gray-light text-[15px] sm:text-base">
                        {post?.text}
                      </p>
                    </div>
                  </div>

                  {/* GUIDE 댓글 작성란 ======================================================================================================================================== */}

                  <div className="flex w-full mt-7 space-x-3">
                    {/*  */}
                    {/* GUIDE 좌측 ========================================================================================================================================*/}

                    {/* TODO 사용자 프로필 사진 */}

                    <img
                      src={user?.image || undefined}
                      alt="user profile picture"
                      className="circle-11"
                    />

                    {/* GUIDE 우측 ========================================================================================================================================*/}

                    <div className="flex-grow mt-2">
                      {/*  */}
                      {/* TODO 텍스트 입력 */}

                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={2}
                        placeholder="Tweet your reply"
                        className="bg-transparent outline-none text-gray-light text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                      />

                      {/* GUIDE 버튼 목록 ======================================================================================================================================== */}

                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          {/*  */}
                          {/* TODO 사진 버튼 */}

                          <div className="icon-editor-container">
                            <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          {/* TODO 차트 버튼 */}

                          <div className="icon-editor-container">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          {/* TODO 이모지 버튼 */}

                          <div className="icon-editor-container">
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          {/* TODO 캘린더 버튼 */}

                          <div className="icon-editor-container">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>
                        </div>

                        {/* TODO 댓글 추가 버튼 */}

                        <button
                          className="btn-tweet px-4 py-1.5"
                          disabled={!comment.trim()}
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommentModal;
