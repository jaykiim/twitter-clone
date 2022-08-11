import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Moment from "react-moment";

// recoil
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";

// firebase
import {
  onSnapshot,
  doc,
  addDoc,
  collection,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../firebase";

// styles
import { Dialog, Transition } from "@headlessui/react";
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";

function Modal() {
  const { data: session } = useSession();
  const router = useRouter();

  const [isOpen, setIsOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState();
  const [comment, setComment] = useState("");

  useEffect(
    () =>
      onSnapshot(doc(db, "posts", postId), (snapshot) => {
        setPost(snapshot.data());
      }),
    [db]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "posts", postId, "comments"), {
      comment,
      username: session.user.name,
      tag: session.user.tag,
      userImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    setIsOpen(false);
    setComment("");

    router.push(`/${postId}`);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
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
              {/* TODO 닫기 버튼 */}
              <div className="flex items-center px-1.5 py-2 border-b border-gray-700">
                <div
                  onClick={() => setIsOpen(false)}
                  className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0"
                >
                  <XIcon className="h-[22px] text-white" />
                </div>
              </div>

              <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                <div className="w-full">
                  {/* GUIDE 게시글 원문 ======================================================================================================================================== */}
                  <div className="text-[#6e767d] flex gap-x-3 relative">
                    {/* TODO 세로줄 */}
                    <span className="w-0.5 h-full z-[-1] absolute left-5 top-11 bg-gray-600" />

                    {/* TODO 작성자 프로필 이미지 */}
                    <img
                      src={post?.userImg}
                      alt="writer's profile image"
                      className="h-11 w-11 rounded-full"
                    />

                    {/* GUIDE 게시글 우측 ======================================================================================================================================== */}
                    <div>
                      <div className="inline-block group">
                        {/*  */}
                        {/* TODO 작성자명 */}
                        <h4 className="font-bold text-[15px] sm:text-base text-[#d9d9d9] inline-block">
                          {post?.username}
                        </h4>
                        {/*  */}
                        {/* TODO 작성자 태그 */}
                        <span className="ml-1.5 text-sm sm:text-[15px]">
                          @{post?.tag}
                        </span>{" "}
                        {/*  */}
                        {/*  */}· {/* TODO 작성 시각 */}
                        <span className="hover:underline text-sm sm:text-[15px]">
                          <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                        </span>
                        {/*  */}
                        {/* TODO 포스트 내용 */}
                        <p className="text-[#d9d9d9] text-[15px] sm:text-base ">
                          {post?.text}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* GUIDE 댓글 작성칸 ======================================================================================================================================== */}
                  <div className="mt-7 flex space-x-3 w-full">
                    {/* TODO 유저 프로필 이미지 */}
                    <img
                      src={session.user.image}
                      alt="user's profile image"
                      className="h-11 w-11 rounded-full"
                    />

                    <div className="flex-grow mt-2">
                      {/* TODO 텍스트 입력 */}
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tweet your reply"
                        rows="2"
                        className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[80px]"
                      />

                      {/* TODO 버튼 목록 */}
                      <div className="flex items-center justify-between pt-2.5">
                        <div className="flex items-center">
                          <div className="icon">
                            <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon rotate-90">
                            <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon">
                            <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>

                          <div className="icon">
                            <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                          </div>
                        </div>

                        {/* TODO 댓글 추가 버튼 */}
                        <button
                          className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                          type="submit"
                          onClick={sendComment}
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
}

export default Modal;
