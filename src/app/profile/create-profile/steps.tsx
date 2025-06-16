// components/multi-step-form.tsx
"use client";
import { useState } from "react";
import PersonalInformation from "./profile-information";
import FarmInformation from "./farming-information";
import AddressInformation from "./address-information";
import { useFormContext } from "../context/form-step-context";

interface MultiStepFormProps {
  role: "buyer" | "farmer";
  onBackToRoleSelection: () => void;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({ role,onBackToRoleSelection }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const { formData, setPersonalInfo, setFarmInfo, setAddressInfo } = useFormContext();

//   const nextStep = () => setCurrentStep((prev) => prev + 1);
//   const prevStep = () => setCurrentStep((prev) => prev - 1);

const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => {
    if (currentStep === 1) {
      onBackToRoleSelection(); // Go back to role selection on first step
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  // For buyers, only show personal info with submit capability
  if (role === "buyer") {
    return (
      <PersonalInformation
        initialData={formData.personalInfo}
        onSubmit={setPersonalInfo}
        role={role}
        onBack={onBackToRoleSelection} 
      />
    );
  }

  // For farmers, show the multi-step process
  return (
    <div className="w-full">
      {currentStep === 1 && (
        <PersonalInformation
          initialData={formData.personalInfo}
          onSubmit={setPersonalInfo}
          onNext={nextStep}
          role={role}
          onBack={onBackToRoleSelection} 
        />
      )}
      
      {currentStep === 2 && (
        <FarmInformation
          initialData={formData.farmInfo}
          onSubmit={setFarmInfo}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      
      {currentStep === 3 && (
        <AddressInformation
          initialData={formData.addressInfo}
          onSubmit={setAddressInfo}
          onBack={prevStep}
        />
      )}
    </div>
  );
};

export default MultiStepForm;