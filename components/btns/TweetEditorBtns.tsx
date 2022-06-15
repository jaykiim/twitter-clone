// components
import ImagePicker from "./BtnImagePicker";

// styles
import {
  CalendarIcon,
  ChartBarIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";

// types
import { SetSelectedImg } from "../../type";

type Props = {
  setSelectedImg: SetSelectedImg;
};

const FeedEditorBtns = ({ setSelectedImg }: Props) => {
  return (
    <div className="flex items-center">
      {/*  */}
      {/* TODO 사진 업로드 버튼 */}

      <ImagePicker setSelectedImg={setSelectedImg} />

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
  );
};

export default FeedEditorBtns;
