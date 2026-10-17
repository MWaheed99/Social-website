import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import Profile from "../pages/profile/Profile";
import ProtectedRouts from "../components/ProtectedRouts/ProtectedRouts";
import PostDetails from "../pages/postDetails/PostDetails";
import NotFound from "../pages/notFound/NotFound";
import ChangePassword from "../pages/ChangePassword/ChangePassword";

export const router = createBrowserRouter([
	{
		path: "auth",
		element: <AuthLayout />,
		children: [
			{
				index: true,
				element: <Login />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "register",
				element: <Register />,
			},
			{
				path: "*",
				element: <NotFound />,
			},
		],
	},
	{
		element: <ProtectedRouts />,
		children: [
			{
				path: "",
				element: <MainLayout />,
				children: [
					{
						index: true,
						element: <Home />,
					},
					{
						path: "profile/:id",
						element: <Profile />,
					},
					// {
					// 	path: "notifications",
					// 	element: <Notifications />,
					// },
          {
            path: "setting",
            element: <ChangePassword />,
          },
					{
						path: "post/:id",
						element: <PostDetails />,
					},
					{
						path: "*",
						element: <NotFound />,
					},
				],
			},
		],
	},
]);
