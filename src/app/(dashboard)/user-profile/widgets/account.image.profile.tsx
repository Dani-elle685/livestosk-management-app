import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FarmData } from "@/infrastructure/settings/dto/user.profile.dto";
import { PenLine } from "lucide-react";
import React from "react";

interface Props {
  profileInformation: FarmData;
}

const AccountImageProfile: React.FC<Props> = ({ profileInformation }) => {
  return (
    <div className="w-full bg-white p-4 flex gap-3 items-center border rounded-md">
      <Avatar className="bg-red-500 h-14 w-14">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col items-center">
        <Label className="">
          {profileInformation.firstName} {profileInformation.lastName}
        </Label>
        <Button
          variant={"ghost"}
          className="hover:bg-transparent cursor-pointer text-blue-600 hover:text-blue-600"
        >
          <PenLine /> Edit Image
        </Button>
      </div>
    </div>
  );
};

export default AccountImageProfile;
