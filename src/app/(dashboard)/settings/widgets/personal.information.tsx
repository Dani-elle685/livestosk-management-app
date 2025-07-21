"use client";
import { VerticalTextComponent } from "@/components/reusable-components/vertical.text.component";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { PenLine } from "lucide-react";
import React from "react";

const PersonalInformation = () => {
  return (
    <Card className="p-3 gap-2 rounded-md">
      <div className="flex justify-between items-center">
        <Label>Personal Information</Label>
        <Button className="rounded-md cursor-pointer hover:bg-transparent" variant={"outline"}>
          Edit <PenLine />{" "}
        </Button>
      </div>
      <Separator />
      <div className="p-4 grid md:grid-cols-2 ">
        <VerticalTextComponent title="First Name" description={"Daniel"} />
        <VerticalTextComponent title="Last Name" description={"Njoroge"} />
        <VerticalTextComponent
          title="Email Address"
          description={"dannjor2@gmail.com"}
        />
        <VerticalTextComponent
          title="Phone Number"
          description={"07898989898"}
        />
        <VerticalTextComponent
          title="Bio"
          description={"this is information about self"}
        />
      </div>
    </Card>
  );
};

export default PersonalInformation;
