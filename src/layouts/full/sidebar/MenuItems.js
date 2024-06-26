import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
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
    subheader: "All Tickets",
  },
  {
    id: uniqueId(),
    title: "Tickets",
    icon: IconTypography,
    href: "/all-tickets",
  },
  {
    id: uniqueId(),
    title: "Add Ticket",
    icon: IconCopy,
    href: "/add-tickets",
  },
  {
    navlabel: true,
    subheader: "Users",
  },

  {
    id: uniqueId(),
    title: "All Users",
    icon: IconAperture,
    href: "/all-users",
  },
];
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
    subheader: "All Tickets",
  },
  {
    id: uniqueId(),
    title: "Tickets",
    icon: IconTypography,
    href: "/all-tickets",
  },
  {
    id: uniqueId(),
    title: "Add Ticket",
    icon: IconCopy,
    href: "/add-tickets",
  },
  
];
export const old = [
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
    subheader: "All Tickets",
  },
  {
    id: uniqueId(),
    title: "Tickets",
    icon: IconTypography,
    href: "/all-tickets",
  },
  {
    id: uniqueId(),
    title: "Add Ticket",
    icon: IconCopy,
    href: "/add-tickets",
  },
  {
    navlabel: true,
    subheader: "Users",
  },

  {
    id: uniqueId(),
    title: "All Users",
    icon: IconAperture,
    href: "/sample-page",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/auth/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/auth/register",
  },
];
export default Menuitems;
