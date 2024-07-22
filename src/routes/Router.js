import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import PrivateRoute from "./PrivateRoute";
import NewUser from "../views/dashboard/components/NewUser";
import UsersDashboard from "../views/dashboard/components/UsersDashboard";
import OverDueTasks from "../views/dashboard/components/OverDueTasks";

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank/BlankLayout"))
);

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import("../views/dashboard/Dashboard")));
const AdminDashboard = Loadable(
  lazy(() => import("../views/dashboard/AdminDashboard"))
);
const TeamLeaderDashboard = Loadable(
  lazy(() => import("../views/dashboard/TeamLeaderDashboard"))
);
const SamplePage = Loadable(
  lazy(() => import("../views/sample-page/SamplePage"))
);
const Icons = Loadable(lazy(() => import("../views/icons/Icons")));
const TypographyPage = Loadable(
  lazy(() => import("../views/utilities/TypographyPage"))
);
const Shadow = Loadable(lazy(() => import("../views/utilities/Shadow")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const Register = Loadable(
  lazy(() => import("../views/authentication/Register"))
);
const Login = Loadable(lazy(() => import("../views/authentication/Login")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard" /> },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute allowedRoles={["User", "TeamLeader", "Admin"]} />
        ),
        children: [{ path: "/dashboard", exact: true, element: <Dashboard /> }],
      },
      
      {
        path: "/all-users",
        element: <PrivateRoute allowedRoles={["Admin", "TeamLeader"]} />,
        children: [
          { path: "/all-users", exact: true, element: <SamplePage /> },
        ],
      },
      {
        path: "/create-user",
        element: <PrivateRoute allowedRoles={["TeamLeader", "Admin"]} />,
        children: [{ path: "/create-user", exact: true, element: <NewUser /> }],
      },

      {
        path: "/add-task",
        element: <PrivateRoute allowedRoles={["TeamLeader", "Admin"]} />,
        children: [{ path: "/add-task", exact: true, element: <Icons /> }],
      },
      {
        path: "/overdue-tasks",
        element: (
          <PrivateRoute allowedRoles={["TeamLeader", "Admin", "User"]} />
        ),
        children: [
          { path: "/overdue-tasks", exact: true, element: <OverDueTasks /> },
        ],
      },

      {
        path: "/all-tasks",
        element: (
          <PrivateRoute allowedRoles={["User", "TeamLeader", "Admin"]} />
        ),
        children: [
          { path: "/all-tasks", exact: true, element: <TypographyPage /> },
        ],
      },
      { path: "/ui/shadow", exact: true, element: <Shadow /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/login", element: <Login /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
