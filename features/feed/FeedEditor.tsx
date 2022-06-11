import React, { useRef, useState } from "react";
import {
  EmojiHappyIcon,
  PhotographIcon,
  ChartBarIcon,
  CalendarIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Base64 } from "../../type";

const FeedEditor = () => {
  const filePickerRef = useRef<HTMLInputElement>(null!);

  const [input, setInput] = useState("");
  const [selectedImg, setSelectedImg] = useState<Base64 | null>(null);

  const onSelectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      console.log(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedImg(readerEvent.target!.result as Base64);
    };
  };

  const createPost = async () => {};

  return (
    <div className="p-3 overflow-y-auto border-b border-gray-700 flex space-x-3">
      {/*  */}
      {/* GUIDE 프로필 사진 ============================================================================================================================================================== */}

      <img
        src="https://lh3.googleusercontent.com/a/AATXAJxjDEHxLArBpKJZwCFjNc9-zjQnwwkVDYceHq2C=s83-c-mo"
        alt="user-profile-image"
        className="circle-11 cursor-pointer"
      />

      <div className="w-full divide-y divide-gray-700">
        {/*  */}
        {/* GUIDE 포스트 입력 ============================================================================================================================================================== */}

        <div className={`${selectedImg && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={2}
            placeholder="What's happening?"
            className="bg-transparent outline-none text-gray-light text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />

          {/* TODO 사진 */}

          {selectedImg && (
            <div className="relative">
              {/*  */}
              {/* TODO 닫기 버튼 */}

              <div
                onClick={() => setSelectedImg(null)}
                className="absolute top-1 left-1 bg-[#15181c] bg-opacity-50 hover:bg-opacity-75 w-8 h-8 rounded-full center-xy cursor-pointer"
              >
                <XIcon className="text-white h-5" />
              </div>

              <img
                src={selectedImg}
                alt="uploaded-image"
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        {/* GUIDE 버튼 목록 ========================================================================================================================================================== */}

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            {/*  */}
            {/* TODO 사진 업로드 버튼 */}

            <div
              onClick={() => filePickerRef.current.click()}
              className="icon-editor-container"
            >
              <PhotographIcon className="icon-editor" />
              <input
                type="file"
                hidden
                ref={filePickerRef}
                onChange={onSelectImg}
              />
            </div>

            {/*  */}
            {/* TODO 차트 버튼 */}

            <div className="icon-editor-container">
              <ChartBarIcon className="icon-editor" />
            </div>

            {/*  */}
            {/* TODO 이모지 버튼 */}

            <div className="icon-editor-container">
              <EmojiHappyIcon className="icon-editor" />
            </div>

            {/*  */}
            {/* TODO 캘린더 버튼 */}

            <div className="icon-editor-container">
              <CalendarIcon className="icon-editor" />
            </div>
          </div>

          {/* TODO 업로드 버튼 */}

          <button
            className="btn-tweet px-4 py-1.5"
            disabled={!input.trim() && !selectedImg}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedEditor;
