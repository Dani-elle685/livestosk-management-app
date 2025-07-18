"use client";
import { VerticalTextComponent } from "@/components/reusable-components/vertical.text.component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PenLine } from "lucide-react";
import React, { useState } from "react";
import { LivestockDialog } from "../../livestock/forms/LivestockDialog";
import ProfileInformationUpdateForm from "../form/profile.information.update.form";
import { FarmData } from "@/infrastructure/settings/dto/user.profile.dto";

interface Props {
  profileInformation: FarmData;
}
const PersonalInformation: React.FC<Props> = ({ profileInformation }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Card className="p-3 gap-2 rounded-md">
      <div className="flex justify-between items-center">
        <Label>Personal Information</Label>
        <LivestockDialog
          title="UPDATE USER INFORMATION"
          description="Update user information below."
          trigger={
            <Button
              className="rounded-md cursor-pointer hover:bg-transparent"
              variant={"outline"}
            >
              Edit <PenLine />{" "}
            </Button>
          }
          open={openModal}
          onOpenChange={setOpenModal}
          className="rounded"
        >
          <ProfileInformationUpdateForm
            onSuccess={() => setOpenModal(false)}
            personalInformation={profileInformation}
          />
        </LivestockDialog>
      </div>
      <Separator />
      <div className="p-4 grid md:grid-cols-2 ">
        <VerticalTextComponent
          title={"First Name"}
          description={profileInformation.firstName}
        />
        <VerticalTextComponent
          title="Last Name"
          description={profileInformation.lastName}
        />
        <VerticalTextComponent
          title="Email Address"
          description={profileInformation.emailAddress}
        />
        <VerticalTextComponent
          title="Phone Number"
          description={profileInformation.phoneNumber}
        />
        <VerticalTextComponent
          title="Bio"
          description={profileInformation.bioInformation}
        />
      </div>
    </Card>
  );
};

export default PersonalInformation;
