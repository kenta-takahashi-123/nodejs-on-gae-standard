import { User } from "../entity/user";
import { Status } from "./status";

export type SessionApiResponse = SessionApiResponseSuccess | SessionApiResponseNotFound
export type SessionApiResponseSuccess = {
  status: typeof Status.Success,
  user: User
}
export type SessionApiResponseNotFound = {
  status: typeof Status.NotFound
}
