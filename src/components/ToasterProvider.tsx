"use client";

import { Toaster } from "@/components/ui/sonner";

export const ToasterProvider = () => {
  return <Toaster position="top-right" duration={2000} richColors />;
};
