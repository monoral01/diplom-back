export const GRID_BASE_SPACING = [36, 20];
export const GRID_SMALL_SPACING = [24, 10];
export const GRID_BIG_SPACING = [36, 30];
export const DEFAULT_PAGE_SIZE = 5;
export const DEFAULT_SORTER = "-id";
export const FIRST_PAGE = 1;
export enum CellConst {
  OPEN_PHOTO = "openPhoto",
  REMOVE_RECORD = "removeRecord",
  EDIT_RECORD = "editRecord",
  WATCH = "watch",
  PRINT = "print",
  CHECKBOX = "checkbox",
  LINK = "link",
  DATE = "date",
  RANGE = "range",
  BOOL = "bool",
  SELECTPICKER = "selectpicker",
  DATEPICKER = "datepicker",
  INPUT = "input",
  DOWNLOAD_FILE = "downloadFile",
}

export enum SystemPermissions {
  PersonCardCreate = "PersonCard_Create",
  PersonCardEdit = "PersonCard_Edit",
  PersonCardView = "PersonCard_View",
  PersonCardDelete = "PersonCard_Delete",
  CompanyCardCreate = "CompanyCard_Create",
  CompanyCardEdit = "CompanyCard_Edit",
  CompanyCardView = "CompanyCard_View",
  CompanyCardDelete = "CompanyCard_Delete",
  PersonRegistry = "PersonRegistry",
  CompanyRegistry = "CompanyRegistry",
}
