"use client";

import {
  HomeIcon as SolidHomeIcon,
  NewspaperIcon as SolidNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidVideoCameraIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as OutlineHomeIcon,
  NewspaperIcon as OutlineNewspaperIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineVideoCameraIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import NavLink from "./NavLink";

const navLinksData = [
  {
    href: "/home",
    activeIcon: <SolidHomeIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineHomeIcon className="w-7 h-7" />,
    label: "홈",
  },
  {
    href: "/community",
    activeIcon: <SolidNewspaperIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineNewspaperIcon className="w-7 h-7" />,
    label: "커뮤니티",
  },
  {
    href: "/chats",
    activeIcon: <SolidChatIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineChatIcon className="w-7 h-7" />,
    label: "채팅",
  },
  {
    href: "/profile",
    activeIcon: <SolidUserIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineUserIcon className="w-7 h-7" />,
    label: "마이페이지",
  },
];

export default function BottomNavigation() {
  return (
    <div
      id="bottom-navigation"
      className="fixed bottom-0 w-full mx-auto max-w-screen-sm items-cente *:text-[#777777] bg-white"
    >
      <div className="flex w-full max-w-screen-sm flex-row items-center justify-center border-t px-3 border-border">
        {navLinksData.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            activeIcon={link.activeIcon}
            inactiveIcon={link.inactiveIcon}
            label={link.label}
          />
        ))}
      </div>
    </div>
  );
}
