"use client";
import React, { useState } from "react";
import SettingsContent from "./SettingContent";

const SettingsHome = () => {
  const [activeSettingsSection, setActiveSettingsSection] = useState("account");

  return (
    <SettingsContent
      activeSettingsSection={activeSettingsSection}
      onSettingsSectionChange={setActiveSettingsSection}
    />
  );
}

export default SettingsHome;