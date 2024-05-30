import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { checkAuthLoader, getToken } from "./util/auth";
import { action as logoutHandler } from "./pages/Logout";
import { action as updateUserProfile } from "./pages/Profile";
import { action as authentication } from "./pages/Auth";
import { loader as fetchUserProfileData } from "./components/PROFILE/UserProfile";
import LoaderSpinner from "./components/UI/LoaderSpinner";

const RootPageLazy = lazy(() => import("./pages/RootLayout"));
const ErrorPageLazy = lazy(() => import("./pages/Error"));
const HomePageLazy = lazy(() => import("./pages/Home"));
const AuthPageLazy = lazy(() => import("./pages/Auth"));
const ProfilePageLazy = lazy(() => import("./pages/Profile"));
const GamePageLazy = lazy(() => import("./pages/Game"));
const GameLevelLazy = lazy(() => import("./pages/GameLevel"));
const GameCompletedLazy = lazy(() => import("./pages/GameCompleted"));
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoaderSpinner />}>
        <RootPageLazy />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<LoaderSpinner />}>
        <ErrorPageLazy />
      </Suspense>
    ),
    loader: getToken,
    id: "root",
    children: [
      {
        path: "/",
        element: <Navigate to="/home" />,
      },
      {
        path: "/home",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <HomePageLazy />
          </Suspense>
        ),
        loader: getToken,
      },
      {
        path: "/auth",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <AuthPageLazy />
          </Suspense>
        ),
        action: authentication,
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <ProfilePageLazy />
          </Suspense>
        ),
        action: updateUserProfile,
        loader: fetchUserProfileData,
      },
      {
        path: "/game",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <GamePageLazy />
          </Suspense>
        ),
        loader: checkAuthLoader,
      },
      {
        path: "/game/game-level/:id",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <GameLevelLazy />
          </Suspense>
        ),
      },
      {
        path: "/game/game-completed",
        element: (
          <Suspense fallback={<LoaderSpinner />}>
            <GameCompletedLazy />
          </Suspense>
        ),
      },
      {
        path: "/logout",
        action: logoutHandler,
      },
    ],
  },
]);

export default router;
