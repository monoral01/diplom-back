import { notification } from "ant-design-vue";

export const infoNotification = (message: string, title = "Сохранение") => {
  notification.open({
    message: title,
    duration: 10,
    description: message,
    class: "info-notification",
  });
};

export const errorNotification = (message = "Заполните обязательные поля") => {
  notification.open({
    message: "Ошибка",
    duration: 10,
    description: message,
    class: "error-notification",
  });
};

export const destroyNotification = () => {
  notification.destroy();
};
