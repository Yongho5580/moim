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
import NavLink from "./nav-link";

const navLinksData = [
  {
    href: "/products",
    activeIcon: <SolidHomeIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineHomeIcon className="w-7 h-7" />,
    label: "홈",
  },
  {
    href: "/community",
    activeIcon: <SolidNewspaperIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineNewspaperIcon className="w-7 h-7" />,
    label: "모임 소식",
  },
  {
    href: "/chats",
    activeIcon: <SolidChatIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineChatIcon className="w-7 h-7" />,
    label: "채팅",
  },
  {
    href: "/live",
    activeIcon: <SolidVideoCameraIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineVideoCameraIcon className="w-7 h-7" />,
    label: "급 번개",
  },
  {
    href: "/profile",
    activeIcon: <SolidUserIcon className="w-7 h-7" />,
    inactiveIcon: <OutlineUserIcon className="w-7 h-7" />,
    label: "프로필",
  },
];

export default function TabBar() {
  return (
    <div className="fixed bottom-0 w-full mx-auto max-w-screen-md grid grid-cols-5 border-neutral-600 border-t px-5 py-3 *:text-white">
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
  );
}
