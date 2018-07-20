import * as Express from "express";
import {AuthenticationService} from "../../service/authentication_service";

export class SessionApiController {
  static get(req: Express.Request, res: Express.Response) {
    let user = new AuthenticationService().authenticate({id: req.params.sessionId});
    if (user !== null) {
      res.status(200).send(user).end();
    } else {
      res.status(404).send(user).end();
    }
  }
}
