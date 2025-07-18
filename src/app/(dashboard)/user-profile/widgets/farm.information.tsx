"use client";
import { VerticalTextComponent } from "@/components/reusable-components/vertical.text.component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PenLine } from "lucide-react";
import React, { useState } from "react";
import { LivestockDialog } from "../../livestock/forms/LivestockDialog";
import FarmInformationUpdateForm from "../form/farm.information.update.form";
import { FarmData } from "@/infrastructure/settings/dto/user.profile.dto";

interface Props {
  profileInformation: FarmData;
}
const FarmInformation: React.FC<Props> = ({ profileInformation }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Card className="p-3 gap-2 rounded-md">
      <div className="flex justify-between items-center">
        <Label>Farm Information</Label>

        <LivestockDialog
          title="UPDATE FARM INFORMATION"
          description="Update the farm information below respectvely."
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
          <FarmInformationUpdateForm
            onSuccess={() => setOpenModal(false)}
            profileInformation={profileInformation}
          />
        </LivestockDialog>
      </div>
      <Separator />
      <div className="p-4 grid md:grid-cols-2 ">
        <VerticalTextComponent
          title="Farm / Business Name"
          description={profileInformation.farmName}
        />
        <VerticalTextComponent
          title="Farm / Business Type"
          description={profileInformation.farmType}
        />
        <VerticalTextComponent
          title="Farm Size"
          description={`${profileInformation.farmSize.toString()} Acres`}
        />
        <VerticalTextComponent
          title="Farm Description"
          description={profileInformation.farmDescription}
        />
        <VerticalTextComponent
          title="Country"
          description={profileInformation.country}
        />
        <VerticalTextComponent
          title="Region"
          description={profileInformation.region}
        />
        <VerticalTextComponent
          title="County"
          description={profileInformation.county}
        />
        <VerticalTextComponent
          title="Sub County"
          description={profileInformation.subCounty}
        />
        <VerticalTextComponent
          title="Ward"
          description={profileInformation.ward}
        />

        <VerticalTextComponent
          title="Farm Location"
          description={profileInformation.farmLocation}
        />
        <VerticalTextComponent
          title="Farm Coordinates"
          description={profileInformation.farmCoordinates}
        />
      </div>
    </Card>
  );
};

export default FarmInformation;
