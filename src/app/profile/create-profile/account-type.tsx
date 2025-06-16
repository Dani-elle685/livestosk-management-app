"use client";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ArrowRight, IdCard, User } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AccountTypeProps {
  onRoleSelect: (role: "buyer" | "farmer") => void;
}


const AccountType: React.FC<AccountTypeProps> = ({ onRoleSelect }) => {
  const [selectedRole, setSelectedRole] = useState<"buyer" | "farmer">("buyer");

  const handleContinue = () => {
    onRoleSelect(selectedRole);
  };
  
  return (
    <Card className="w-full max-w-lg m-auto md:p-6 rounded-sm">
      <CardHeader>
        <CardTitle className="font-bold text-xl text-center">
          Profile Creation
        </CardTitle>
        <CardDescription className="text-center text-base text-muted-foreground">
          Please select your role. Whether you're a farmer looking to sell
          livestock or a buyer interested in purchasing
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <RadioGroup
          value={selectedRole}
  onValueChange={(value: string) => setSelectedRole(value as "buyer" | "farmer")}
          className="grid gap-4"
        >
          <Label
            htmlFor="buyer"
            className={`relative flex items-start gap-3 rounded-lg border p-4 hover:bg-accent/50 ${
              selectedRole === "buyer"
                ? "border-red-600 bg-red-50 dark:border-red-900 dark:bg-red-950"
                : ""
            }`}
          >
            <RadioGroupItem
              value="buyer"
              id="buyer"
              className="absolute opacity-0"
            />
            <div className="flex justify-between items-center w-full">
            <div className="flex gap-4 items-center w-full">
              <div
                className={`border rounded p-2 ${
                  selectedRole === "buyer"
                    ? "border-red-600 bg-red-100 dark:border-red-700 dark:bg-red-800"
                    : "border-gray-500 dark:border-gray-600"
                }`}
              >
                <IdCard
                  className={
                    selectedRole === "buyer"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-700 dark:text-gray-400"
                  }
                  height={16}
                  width={16}
                />
              </div>
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">Buyer</p>
                <p className="text-muted-foreground text-sm">
                  Looking to purchase high-quality livestock
                </p>
              </div>
            </div>
             <div>
                     <ArrowRight
                className={
                  selectedRole === "buyer"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-400"
                }
                height={16}
                width={16}
              />
              </div>
            </div>
          </Label>

          <Label
            htmlFor="farmer"
            className={`relative flex items-start gap-3 rounded-lg border p-4 hover:bg-accent/50 ${
              selectedRole === "farmer"
                ? "border-red-600 bg-red-50 dark:border-red-900 dark:bg-red-950"
                : ""
            }`}
          >
            <RadioGroupItem
              value="farmer"
              id="farmer"
              className="absolute opacity-0"
            />
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4 items-center w-full">
                <div
                  className={`border rounded p-2 ${
                    selectedRole === "farmer"
                      ? "border-red-600 bg-red-100 dark:border-red-700 dark:bg-red-800"
                      : "border-gray-500 dark:border-gray-600"
                  }`}
                >
                  <User
                    className={
                      selectedRole === "farmer"
                        ? "text-red-600 dark:text-red-400"
                        : "text-gray-700 dark:text-gray-400"
                    }
                    height={16}
                    width={16}
                  />
                </div>
                <div className="grid gap-1.5 font-normal">
                  <p className="text-sm leading-none font-medium">Farmer</p>
                  <p className="text-muted-foreground text-sm">
                    Farmer ready to sell your livestock
                  </p>
                </div>
              </div>
              <div>
                     <ArrowRight
                className={
                  selectedRole === "farmer"
                    ? "text-red-600 dark:text-red-400"
                    : "text-gray-700 dark:text-gray-400"
                }
                height={16}
                width={16}
              />
              </div>
             
            </div>
          </Label>
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex items-center justify-end">
         <Button onClick={handleContinue} className="w-fit bg-red-500 hover:bg-red-500">
        Continue
      </Button>
      </CardFooter> 
    </Card>
  );
};

export default AccountType;
