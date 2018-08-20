import {Chat} from "../entity/chat";
import {Status} from "./status";

export type ChatApiResponse = ChatApiResponseSuccess | ChatApiResponseCreated | ChatApiResponseNotFound
export type ChatApiResponseSuccess = {
  status: typeof Status.Success,
  chats: Chat[]
}
export type ChatApiResponseCreated = {
  status: typeof Status.Created
}
export type ChatApiResponseNotFound = {
  status: typeof Status.NotFound
}
