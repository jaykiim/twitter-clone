import { SparklesIcon } from "@heroicons/react/outline";
import React from "react";

type Props = {
  text: string;
};

const Topbar = ({ text }: Props) => {
  return (
    <div className="flex items-center justify-between py-2 px-3 text-gray-light border-b border-gray-700 sticky top-0 z-50">
      <h2 className="capitalize text-lg sm:text-xl font-bold">{text}</h2>
      <div className="hoverAnimation center-xy w-9 h-9 xl:px-0">
        <SparklesIcon className="h-5 text-white" />
      </div>
    </div>
  );
};

export default Topbar;
