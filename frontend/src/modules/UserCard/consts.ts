import { UserEntity } from "@/models/UserEntity";
import dayjs from "dayjs";

export const initialCardState: UserEntity = {
  id: undefined,
  createDate: dayjs(),
  fio: undefined,
  permissions: [],
};

export const permissionsColumns = [
  {
    title: "№",
    dataIndex: "index",
    width: 200,
  },
  {
    title: "Привилегия",
    dataIndex: "permission",
    width: 200,
  },
];
