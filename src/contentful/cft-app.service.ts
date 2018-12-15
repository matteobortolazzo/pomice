import {get} from "./helpers/ctf-http.helper";
import {AppServiceInterface} from "../services/app.service";

export const CtfAppService: AppServiceInterface = {
  async getAppVersion(): Promise<string> {
    const collection = await get<CtfCollection<{ version: string }>>(`entries?content_type=appInfo&select=fields.version`);
    return collection.items[0].fields.version;
  }
};
