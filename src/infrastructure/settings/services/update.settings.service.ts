"use server";

import { UpdateAccountSettingData } from "../validators/update.account.setting.validator";

export const updateAccountSettingsService = async (data: UpdateAccountSettingData) => {
  console.log("Updating account settings with data:", data);
}