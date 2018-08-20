import * as Express from "express";
import {ChatApiResponse} from "../../../../shared/src/response";
import {ChatService} from "../../service/chat_service";
import {Status} from "../../../../shared/src/response/status";

export class ChatApiController {
  static get(): Promise<ChatApiResponse> {
    return ChatService.list(5).then(chats => {
      return {status: Status.Success, chats}
    });
  }

  static post(req: Express.Request): Promise<ChatApiResponse> {
    console.log(req.query["text"]);
    return ChatService.add({text: req.query["text"]}).then(() => {
      return {status: Status.Created};
    });
  }
}
