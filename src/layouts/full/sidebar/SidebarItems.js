import React, { useEffect, useState } from "react";
import Menuitems, { MenuitemsForUsers } from "./MenuItems";
import { useLocation } from "react-router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import filterMenuItems from "./MenuItems";
const SidebarItems = () => {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  if (user?.role === null) {
    return <Navigate to="/auth/login" />;
  }
  const itemsToRender = filterMenuItems(user?.role);

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {itemsToRender.map((item) => {
          if (item.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;
