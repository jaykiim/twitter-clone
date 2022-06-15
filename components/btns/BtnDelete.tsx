import { TrashIcon } from "@heroicons/react/outline";

type Props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

const BtnDelete = ({ onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="icon-editor-container group-hover:bg-red-600/10"
    >
      <TrashIcon className="h-5 group-hover:text-red-600" />
    </div>
  );
};

export default BtnDelete;
