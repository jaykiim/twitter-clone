import React, { useRef, useState } from "react";
import {
  EmojiHappyIcon,
  PhotographIcon,
  ChartBarIcon,
  CalendarIcon,
} from "@heroicons/react/outline";

const FeedEditor = () => {
  const filePickerRef = useRef<HTMLInputElement>(null!);

  const [input, setInput] = useState("");
  const [selectedImg, setSelectedImg] = useState(null);

  const onSelectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
  };

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

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={2}
          placeholder="What's happening?"
          className="bg-transparent outline-none text-gray-light text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
        />

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

          <div className="btn-tweet px-4 py-1.5">Tweet</div>
        </div>
      </div>
    </div>
  );
};

export default FeedEditor;
