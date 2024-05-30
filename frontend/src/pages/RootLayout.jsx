import { Outlet, useLoaderData } from "react-router";
import MainNavigation from "../components/UI/MainNavigation";

import { useEffect } from "react";
import { useSubmit } from "react-router-dom";
import { getTokenDuration } from "../util/auth";
function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "POST" });
    }
    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "POST" });
    }, tokenDuration);
  }, [token, submit]);
  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}
export default RootLayout;
