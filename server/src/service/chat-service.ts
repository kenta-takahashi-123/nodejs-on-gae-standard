import {DatastoreAccessor} from "./datastore/datastore";
import {Chat} from "../../../shared/src/entity";
import {DatastoreKey} from "@google-cloud/datastore/entity";

export class ChatService {
  private static entityName = 'Chat';
  private static store = DatastoreAccessor.datastore;

  static list(limit: number = 5): Promise<Chat[]> {
    return this.store.runQuery(this.store.createQuery(this.entityName).limit(limit)).then((results: any) => {
      return results[0].map((x: any) => x as Chat);
    });
  }

  static add(comment: Chat): Promise<DatastoreKey> {
    let newChatKey = this.store.key([ChatService.entityName]);
    return this.store.save({
      key: newChatKey,
      data: comment,
    }).then(() => newChatKey);
  }
}
