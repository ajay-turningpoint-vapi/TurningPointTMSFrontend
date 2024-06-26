import React, { useEffect, useState } from "react";
import Menuitems, { MenuitemsForUsers } from "./MenuItems";
import { useLocation } from "react-router";
import { Box, List } from "@mui/material";
import NavItem from "./NavItem";
import NavGroup from "./NavGroup/NavGroup";
import { getProfile } from "../../../api/authApi";

const SidebarItems = () => {
  const { pathname } = useLocation();
  const [role, setRole] = useState(0);
  const pathDirect = pathname;
  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfile();
      setRole(profile.data.role);
    };
    fetchProfile();
  }, []);
  const itemsToRender = role === 1 ? Menuitems : MenuitemsForUsers;

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
