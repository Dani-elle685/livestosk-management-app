"use client";
import { VerticalTextComponent } from "@/components/reusable-components/vertical.text.component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PenLine } from "lucide-react";
import React from "react";

const FarmInformation = () => {
  return (
    <Card className="p-3 gap-2 rounded-md">
      <div className="flex justify-between items-center">
        <Label>Farm Information</Label>
        <Button className="rounded-md cursor-pointer hover:bg-transparent" variant={"outline"}>
          Edit <PenLine />{" "}
        </Button>
      </div>
      <Separator />
      <div className="p-4 grid md:grid-cols-2 ">
        <VerticalTextComponent title="Farm / Business Name" description={"XYZ Farm Inc"} />
        <VerticalTextComponent title="Farm / Business Type" description={"Dairy Farm"} />
        <VerticalTextComponent
          title="Farm Size"
          description={"200 Acres"}
        />
        <VerticalTextComponent
          title="Farm Description"
          description={"This is information about farm details"}
        />
       
        <VerticalTextComponent title="Farm Location" description={"Kijeketile Ngware"} />
        <VerticalTextComponent title="Farm Coordinates" description={"0004-4444"} />
        
                

      </div>
    </Card>
  );
};

export default FarmInformation;
