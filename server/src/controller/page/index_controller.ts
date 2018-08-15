import * as Express from "express";
import { AuthenticationService } from "../../service/authentication_service";
import { Status, PageResponse } from "shared/response";

export class IndexController {
  static get(req: Express.Request): PageResponse {
    let user = AuthenticationService.authenticate({ id: req.query.session });
    let name = (user === null) ? "world" : `${user.first_name} ${user.family_name}`;
    return {
      status: Status.Success, 
      templateName: "index", 
      title: `Hello, ${name}!`,
      params: {name}
    };
  }
}
