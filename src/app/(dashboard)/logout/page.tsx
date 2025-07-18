import React, { Suspense } from "react";
import LogoutHome from "./logout.home";

const LogoutPage = () => {
  return (
    <Suspense>
      <LogoutHome />
    </Suspense>
  );
};

export default LogoutPage;
