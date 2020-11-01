import * as Express from "express";
import { AuthenticationService } from "../../service/authentication-service";
import { Status, PageResponse } from "../../../../shared/src/response";

export class IndexController {
  static get(req: Express.Request): Promise<PageResponse> {
    let user = AuthenticationService.authenticate({ id: req.query.session as string });
    let name = (user === null || user === "error") ? "world" : `${user.first_name} ${user.family_name}`;
    return new Promise<PageResponse>((res) => {
      res({
        status: Status.Success,
        templateName: "index",
        title: `Hello, ${name}!`,
        params: {name}
      });
    });
  }
}
