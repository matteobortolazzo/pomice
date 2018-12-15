import {CtfAppService} from "../contentful/cft-app.service";

export interface AppServiceInterface {
  getAppVersion(): Promise<string>;
}

export const AppService: AppServiceInterface = CtfAppService;
