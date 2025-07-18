"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { LogOut } from "lucide-react";
import React from "react";

const LogoutHome = () => {
  return (
    <div className="flex items-center justify-center h-full w-full overflow-hidden">
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
          >
            No
          </Button>
          <Button variant="destructive" className="cursor-pointer">
            Yes
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LogoutHome;
