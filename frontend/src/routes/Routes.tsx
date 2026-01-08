import { lazy } from "react";
import Loadable from "../components/layout/Loadable";
import Layout from "../components/layout/layout";
import AuthLayout from "../components/layout/AuthLayout";

const LoginPage = Loadable(lazy(() => import("../pages/login"))); // Lazy-loaded  page
const SignUpPage = Loadable(lazy(() => import("../pages/signup"))); // Lazy-loaded  page
const CourseList = Loadable(lazy(() => import("../pages/courseList"))); // Lazy-loaded  page
const MyCourseList = Loadable(lazy(() => import("../pages/myCourse"))); // Lazy-loaded  page

// Routes for authentication
const LoginRoutes = [
  {
    path: "/", // Root path
    element: <Layout />, // Layout component for non-authenticated pages
    children: [
      {
        path: "/", // Home path
        element: <LoginPage />, // Home page component
      },  {
        path: "/sign-up", // Home path
        element: <SignUpPage />, // Home page component
      },
    ],
  },
  {
    path: "/", // Root path
    element: <AuthLayout />, // Layout component for authenticated pages
    children: [
      {
        path: "/course-list", //  path
        element: <CourseList />, //  page component
      },
      {
        path: "/my-course", //  path
        element: <MyCourseList />, //  page component
      },
    ],
  },
];

export default LoginRoutes;
