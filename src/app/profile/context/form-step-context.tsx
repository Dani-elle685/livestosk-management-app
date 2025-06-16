"use client";

import React, { createContext, useContext, useState } from "react";
import {
  PersonalInformationModel,
  FarmInformationModel,
  AddressInformationModel,
} from "@/infrastructure/profile-creation/validators/profile.information.validators";

type FormData = {
  personalInfo: PersonalInformationModel;
  farmInfo: FarmInformationModel;
  addressInfo: AddressInformationModel;
};

type FormContextType = {
  formData: FormData;
  setPersonalInfo: (data: PersonalInformationModel) => void;
  setFarmInfo: (data: FarmInformationModel) => void;
  setAddressInfo: (data: AddressInformationModel) => void;
  resetForm: () => void;
};

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData: FormData = {
  personalInfo: {
    idNumber: "",
    idType: "",
    dateOfBirth: "",
    profileImage: null,
    idFrontPage: null,
    idBackPage: null,
  },
  farmInfo: {
    businessName: "",
    businessType: "",
    farmSize: "",
    farmDescription: "",
  },
  addressInfo: {
    nationality: "",
    regions: "",
    county: "",
    subCounty: "",
    ward: "",
    farmLocation: "",
    coordinates: "",
  },
};

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const setPersonalInfo = (data: PersonalInformationModel) => {
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const setFarmInfo = (data: FarmInformationModel) => {
    setFormData((prev) => ({
      ...prev,
      farmInfo: { ...prev.farmInfo, ...data },
    }));
  };

  const setAddressInfo = (data: AddressInformationModel) => {
    setFormData((prev) => ({
      ...prev,
      addressInfo: { ...prev.addressInfo, ...data },
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <FormContext.Provider
      value={{
        formData,
        setPersonalInfo,
        setFarmInfo,
        setAddressInfo,
        resetForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};