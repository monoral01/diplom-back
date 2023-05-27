export enum OperationType {
  TRANSFER_BY_PHONE = "Перевод по номеру телефона",
  TRANSFER_BY_SBP = "Перевод по СБП",
  TRANSFER_TO_YOURSELF = "Перевод себе на другой счёт в этом банке",
  TRANSFER_TO_YOURSELF_OTHER = "Перевод себе в другой банк",
  BUYING_SHARES = "Покупка акций",
  BUYING_BONDS = "Покупка облигаций",
  SHOP = "Покупка в магазине",
  ONLINE_SHOP = "Покупка в интернет-магазине",
  CREDIT = "Оплата кредита",
  CREDIT_OTHER = "Оплата кредита  в другом банке",
  TAXES_PAYMENT = "Уплата налогов",
  UTILITIES = "Оплата коммунальных услуг",
  GIBDD_FINE = "Оплата штрафов ГИБДД",
  OTHER = "Другое",
}
export enum OperationStatus {
  SUCCESS = "Успешно",
  ERROR = "Ошибка",
  IN_PROCESS = "В процессе",
}
export enum AccountType {
  DEPOSITE = "Депозитный",
  CREDIT = "Кредитный",
  BUDGET = "Бюджетный",
  CHECKING = "Расчётный",
}
export enum AccountStatus {
  ACTIVE = "Активный",
  BLOCKED = "Заблокирован",
  IN_PROCESS_DELETE = "В процессе удаления",
}
export enum Currency {
  USD = "$",
  RUB = "₽",
  GBP = "£",
  KZT = "₸",
  EUR = "€",
  CNY = "¥",
}
export type OperationState = {
  time: string;
  operationStatus: OperationStatus;
  message?: string;
  description: string;
  type: OperationType;
  sender: string;
  senderBank: string;
  senderPhoneNumber: string;
  senderAccountNumber: string;
  recipient: string;
  recipientBank: string;
  recipientPhoneNumber: string;
  recipientAccountNumber: string;
  sum: number;
  transferFee: number;
  currency: Currency;
};
