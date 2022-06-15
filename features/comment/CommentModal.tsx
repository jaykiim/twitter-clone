import { Fragment, useState } from "react";
import { useSession } from "next-auth/react";

// recoil
import { useRecoilState } from "recoil";
import { commentModalState } from "../../atoms/modal";

// hooks
import useGetPost from "../../hooks/api/useGetPost";

// components
import PostMeta from "../post/PostMeta";
import TweetEditor from "../../components/TweetEditor";

// styles
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const CommentModal = () => {
  const { user } = useSession().data!;

  // 현재창 열림/닫힘 + 포스트 id
  const [commentModal, setCommentModal] = useRecoilState(commentModalState);

  // 포스트 내용
  const post = useGetPost();

  // submit 로딩 상태
  const [loading, setLoading] = useState(false);

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
                      <TweetEditor
                        loading={loading}
                        setLoading={setLoading}
                        postId={commentModal.postId}
                        comment
                      />
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
