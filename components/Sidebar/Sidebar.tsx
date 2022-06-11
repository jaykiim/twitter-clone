import Image from "next/image";

import SidebarIcon from "./SidebarIcon";

// styles
import { HomeIcon } from "@heroicons/react/solid";
import {
  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  return (
    <div className="hidden fixed p-2 h-full flex-col items-center sm:flex xl:items-start xl:w-[340px]">
      <div className="hoverAnimation w-14 h-14 p-0 flex items-center justify-center xl:ml-24">
        <Image src="https://rb.gy/ogau5a" width={30} height={30} />
      </div>

      <div className="space-y-2.5 mt-4 mb-2.5 xl:ml-24">
        <SidebarIcon text="Home" Icon={HomeIcon} active />
        <SidebarIcon text="Explore" Icon={HashtagIcon} />
        <SidebarIcon text="Notification" Icon={BellIcon} />
        <SidebarIcon text="Message" Icon={InboxIcon} />
        <SidebarIcon text="Bookmarks" Icon={BookmarkIcon} />
        <SidebarIcon text="Lists" Icon={ClipboardListIcon} />
        <SidebarIcon text="Profile" Icon={UserIcon} />
        <SidebarIcon text="More" Icon={DotsCircleHorizontalIcon} />
      </div>

      <button className="hidden xl:inline btn-tweet w-56 h-[52px] ml-auto">
        Tweet
      </button>

      <div className="hoverAnimation text-gray-light flex items-center justify-center mt-auto xl:ml-auto xl:-mr-5">
        <img
          src="https://lh3.googleusercontent.com/a/AATXAJxjDEHxLArBpKJZwCFjNc9-zjQnwwkVDYceHq2C=s83-c-mo"
          alt="user-profile-picture"
          className="circle-10 xl:mr-2.5"
        />

        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">성이름</h4>
          <p className="text-gray-dark">tidzmtm12@gmail.com</p>
        </div>

        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
    </div>
  );
};

export default Sidebar;
