// app/profile-creation/page.tsx
"use client";
import { useState } from "react";
import AccountType from "./create-profile/account-type";
import MultiStepForm from "./create-profile/steps";


export default function ProfileCreation() {
  const [currentView, setCurrentView] = useState<"role-selection" | "form">("role-selection");
  const [selectedRole, setSelectedRole] = useState<"buyer" | "farmer">("buyer");

  const handleRoleSelect = (role: "buyer" | "farmer") => {
    setSelectedRole(role);
    setCurrentView("form");
  };

  const handleBackToRoleSelection = () => {
    setCurrentView("role-selection");
  };

  return (
    <div className="container mx-auto p-4">
      {currentView === "role-selection" ? (
        <AccountType onRoleSelect={handleRoleSelect} />
      ) : (
        <MultiStepForm 
          role={selectedRole} 
          onBackToRoleSelection={handleBackToRoleSelection}
        />
      )}
    </div>
  );
}