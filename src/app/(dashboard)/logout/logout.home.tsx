"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { signOutService } from "@/infrastructure/auth/services/logout.service";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

const LogoutHome = () => {
  const [isSubmitting, setTransition] = useTransition();
  const router = useRouter();
  const handleLogout = () => {
    setTransition(async () => {
      try {
        await signOutService();
        router.push(`/`);
        toast.success("Signed out successfully!");
      } catch (error: any) {
        toast.error(error.message ?? `Failed to log out. "Please try again`);
      }
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-[calc(100vh-4rem)] px-4">
      <Card className="w-full max-w-md p-6 flex flex-col rounded-md items-center gap-6 text-center">
        <div className="flex text-red-600 gap-4 items-center">
          <LogOut />
          <Label className="font-medium text-xl">Log out</Label>
        </div>

        <Label className="text-base text-muted-foreground">
          Are you sure you want to logout from the Livestock platform?
        </Label>

        <div className="flex gap-4 items-center py-4">
          <Button
            variant="outline"
            className="text-red-500 hover:text-red-500 hover:bg-transparent border-red-500 cursor-pointer"
            onClick={() => router.back()}
          >
            No
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleLogout}
          >
            {isSubmitting ? "Logging out.." : "Yes"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LogoutHome;
