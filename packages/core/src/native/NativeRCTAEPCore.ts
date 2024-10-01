import { TurboModule, TurboModuleRegistry } from "react-native";

export interface Spec extends TurboModule {
  extensionVersion(): Promise<string>;
  configureWithAppId: (appId?: string) => void;
  updateConfiguration: (configMap?: Object) => void;
  setLogLevel: (mode: string) => void;
  getLogLevel: () => Promise<string>;
  setPrivacyStatus: (privacyStatus: string) => void;
  getPrivacyStatus: () => Promise<string>;
  getSdkIdentities: () => Promise<string>;
  dispatchEvent: (event: Object) => Promise<boolean>;
  dispatchEventWithResponseCallback: (event: Object, timeoutMS:number) => Promise<Object>;
  trackAction: (action?: string, contextData?: Object) => void;
  trackState: (state?: string, contextData?: Object) => void;
  setAdvertisingIdentifier: (advertisingIdentifier?: string) => void;
  setPushIdentifier: (pushIdentifier?: string) => void;
  collectPii: (data: Object) => void;
  setSmallIconResourceID: (resourceID: number) => void;
  setLargeIconResourceID: (resourceID: number) => void;
  setAppGroup: (appGroup?: string) => void;
  resetIdentities: () => void;
  clearUpdatedConfiguration: () => void;
}

export default TurboModuleRegistry.get<Spec>("RCTAEPCore");
