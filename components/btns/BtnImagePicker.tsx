import { useRef } from "react";

import { PhotographIcon } from "@heroicons/react/outline";

import { Base64, SetSelectedImg } from "../../type";

type Props = {
  setSelectedImg: SetSelectedImg;
};

const ImagePicker = ({ setSelectedImg }: Props) => {
  const filePickerRef = useRef<HTMLInputElement>(null!);

  const onSelectImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedImg(readerEvent.target!.result as Base64);
    };
  };

  return (
    <div
      onClick={() => filePickerRef.current.click()}
      className="icon-editor-container"
    >
      <PhotographIcon className="icon-editor" />
      <input type="file" hidden ref={filePickerRef} onChange={onSelectImg} />
    </div>
  );
};

export default ImagePicker;
