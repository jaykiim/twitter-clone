import React from "react";

type Props = {
  text: string;
  Icon: (props: React.ComponentProps<"svg">) => JSX.Element;
  active?: boolean;
};

const SidebarIcon = ({ text, Icon, active }: Props) => {
  return (
    <div className="hoverAnimation text-gray-light flex items-center justify-center space-x-3 xl:justify-start">
      <Icon className="h-7" />
      <span className={`hidden xl:inline ${active && "font-bold"}`}>
        {text}
      </span>
    </div>
  );
};

export default SidebarIcon;
