import {
  Setting,
  COMITIFY_MODULE_NAME,
  COMITIFY_CONFIG_PATHS,
  COMITIFY_ERROR_MESSAGES,
  SettingSchema,
} from "@comitify/shared";
import { cosmiconfig } from "cosmiconfig";

export const readConfig = async (basePath: string): Promise<Setting> => {
  const explorer = cosmiconfig(COMITIFY_MODULE_NAME, {
    searchPlaces: COMITIFY_CONFIG_PATHS,
    stopDir: basePath,
  });

  explorer.clearSearchCache();

  const isConfigExisting = await explorer.search(basePath);

  if (!isConfigExisting)
    throw new Error(
      COMITIFY_ERROR_MESSAGES.NO_CONFIG_FOUND.replace(
        "${folderPath}",
        basePath
      ).replace("${configFiles}", "\n- " + COMITIFY_CONFIG_PATHS.join("\n- "))
    );

  const conf = await explorer.load(isConfigExisting.filepath);

  if (!conf?.config)
    throw new Error(COMITIFY_ERROR_MESSAGES.NO_CONFIG_PROPERTY);

  if (!SettingSchema.validate(conf.config))
    throw new Error(
      COMITIFY_ERROR_MESSAGES.VALIDATION_ERROR.replace(" : ${error}", "")
    );

  return conf.config as Setting;
};
