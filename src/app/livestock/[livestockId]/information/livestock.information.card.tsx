import { VerticalTextComponent } from "@/components/reusable-components/vertical.text.component";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Livestock } from "@/infrastructure/livestosks/dto/livestock-dto";
import React from "react";

interface Props {
  livestockInfo: Livestock;
}

const LivestockInformationCard: React.FC<Props> = ({ livestockInfo }) => {
  return (
    <Card className="mt-4 w-full p-2 md:p-6 rounded-md">
      <div className="">
        <div className="flex gap-3">
          <Avatar>
            <AvatarImage
              src="https://tse4.mm.bing.net/th/id/OIP.YyhyIJa1GUj94BtCviLT_AHaKZ?rs=1&pid=ImgDetMain&o=7&rm=3"
              alt="animal"
            />
            <AvatarFallback className="bg-red-300 font-bold">LV</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-bold">{livestockInfo?.tagNumber!}</h2>
            <p className="capitalize font-medium text-base flex gap-3">
              <span className=" px-4 rounded-2xl bg-red-200">
                {livestockInfo?.status}
              </span>
              <span className="px-4 rounded-2xl bg-red-200">
                {livestockInfo?.healthStatus!}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between items-start gap-4">
        <Card className="w-full rounded p-0 gap-0">
          <h2 className="font-bold text-base p-4">Basic Information</h2>
          <Separator />
          <div className="p-4 grid md:grid-cols-2 ">
            <VerticalTextComponent
              title="Tag"
              description={livestockInfo?.tagNumber!}
            />
            <VerticalTextComponent
              title="Name"
              description={livestockInfo?.name!}
            />
            <VerticalTextComponent
              title="Gender"
              description={livestockInfo?.gender!}
            />
            <VerticalTextComponent
              title="Date of Birth"
              description={livestockInfo?.dateOfBirth!}
            />
            <VerticalTextComponent
              title="Breed"
              description={livestockInfo?.breed!}
            />
            <VerticalTextComponent
              title="Health Status"
              description={livestockInfo?.healthStatus!}
            />
          </div>
        </Card>
        <Card className="w-full rounded p-0 gap-0">
          <h3 className="font-bold text-base p-4">Other Information</h3>
          <Separator />
          <div className="p-4 grid md:grid-cols-2 ">
            <VerticalTextComponent
              title="Color"
              description={livestockInfo?.color!}
            />
            <VerticalTextComponent
              title="Weight"
              description={livestockInfo?.weight!.toString()}
            />
            <VerticalTextComponent
              title="Status"
              description={livestockInfo?.status!}
            />
            <VerticalTextComponent
              title="Purchase Date"
              description={livestockInfo?.purchaseDate!}
            />
            <VerticalTextComponent
              title="Notes"
              description={livestockInfo?.notes!}
            />
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default LivestockInformationCard;
