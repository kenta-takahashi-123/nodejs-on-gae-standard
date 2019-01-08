import {ServerConfig} from "../../server-config";
import Datastore = require("@google-cloud/datastore");

export class DatastoreAccessor {
  static datastore = new Datastore({
    credentials: ServerConfig.PRODUCTION
  });
}
