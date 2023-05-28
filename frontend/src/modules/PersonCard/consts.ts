import { PersonCardState } from "@/models/PersonEntity";
import { AdditionalInfoState } from "@/models/AdditionalInfoEntity";
export const initialAddInfoState: AdditionalInfoState = {
  operationsDetailed: true,
  operationHistory: [],
  accounts: [],
};
export const initialCardState: PersonCardState = {
  id: undefined,
  personStatus: undefined,
  firstName: undefined,
  lastName: undefined,
  patrName: undefined,
  reasonCredit: undefined,
  companyName: undefined,
  companyNumber: undefined,
  companyInn: undefined,
  companyDirectorName: undefined,
  companyRegistrationDate: undefined,
  passportSerialNumber: undefined,
  passportNumber: undefined,
  issuedBy: undefined,
  factAddress: undefined,
  addressOfResidence: undefined,
  history: [],
  accounts: [],
  operations: [],
};
