export enum CardMode {
  EDIT = "edit",
  ADD = "add",
  VIEW = "view",
}

export enum CardStatus {
  NEW = "Новая",
  IN_WORK = "В работе",
  CREDIT_PROCESS = "В процессе выдачи кредита",
  CREATE_PROCESS = "В процессе создания",
}
export const cardOptionsMap: Record<string, any> = {
  [CardMode.ADD]: { header: "Добавление карточки", disabled: false },
  [CardMode.EDIT]: {
    header: "Редактирование карточки",
    disabled: false,
  },
  [CardMode.VIEW]: { header: "Просмотр карточки", disabled: true },
};
