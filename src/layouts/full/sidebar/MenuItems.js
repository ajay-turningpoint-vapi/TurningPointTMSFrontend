import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconSquareRoundedPlus,
  IconTypography,
  IconUserPlus,
  IconClockX,
  IconList,
  IconCheckupList,
  IconClipboardList,
  IconUsers,
  IconTags,
  IconClock,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Tasks",
  },
  {
    id: uniqueId(),
    title: "All Tasks",
    icon: IconList,
    href: "/all-tasks",
  },
  {
    id: uniqueId(),
    title: "My Tasks",
    icon: IconCheckupList,
    href: "/my-tasks",
  },
  {
    id: uniqueId(),
    title: "Delegated Tasks",
    icon: IconClipboardList,
    href: "/delegated-tasks",
  },
  {
    id: uniqueId(),
    title: "Overdue Tasks",
    icon: IconClock,
    href: "/overdued-tasks",
  },
  {
    id: uniqueId(),
    title: "Delayed Tasks",
    icon: IconClockX,
    href: "/delayed-tasks",
  },
  {
    id: uniqueId(),
    title: "Add Task",
    icon: IconSquareRoundedPlus,
    href: "/add-task",
  },
  {
    navlabel: true,
    subheader: "Users",
  },
  {
    id: uniqueId(),
    title: "All Users",
    icon: IconList,
    href: "/all-users",
  },
  {
    id: uniqueId(),
    title: "Create User",
    icon: IconSquareRoundedPlus,
    href: "/create-user",
  },
  {
    navlabel: true,
    subheader: "Performance",
  },
  {
    id: uniqueId(),
    title: "Users performance",
    icon: IconUsers,
    href: "/users-performance",
  },
  {
    id: uniqueId(),
    title: "All Categories",
    icon: IconTags,
    href: "/category-performance",
  },
];

const filterMenuItems = (role) => {
  switch (role) {
    case "Admin":
      return Menuitems; // Show all items for Admin
    case "TeamLeader":
      // Remove all Performance-related items for TeamLeader
      return Menuitems.filter(
        (item) =>
          item.title !== "All Categories" &&
          item.title !== "Users performance" &&
          item.subheader !== "Performance"
      );
    case "User":
      // Show only specific items for User
      return Menuitems.filter(
        (item) =>
          item.title === "Dashboard" ||
          item.title === "All Tasks" ||
          item.title === "Overdue Tasks" ||
          item.title === "Delayed Tasks"
      );
    default:
      return [];
  }
};

export const MenuitemsForUsers = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "All Tasks",
  },
  {
    id: uniqueId(),
    title: "Tasks",
    icon: IconList,
    href: "/all-tasks",
  },
  {
    id: uniqueId(),
    title: "Overdue Tasks",
    icon: IconClockX,
    href: "/overdued-tasks",
  },
  {
    id: uniqueId(),
    title: "Delayed Tasks",
    icon: IconClockX,
    href: "/delayed-tasks",
  },
];

export default filterMenuItems;
