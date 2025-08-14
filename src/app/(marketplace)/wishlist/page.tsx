import React, { Suspense } from "react";
import WishlistHomePage from "./WishListHomePage";

const page = () => {
  return (
    <Suspense>
      <WishlistHomePage />
    </Suspense>
  );
};

export default page;
