import * as Express from "express";
import {AuthenticationService} from "../../service/authentication_service";

export class IndexController {
  static get(req: Express.Request, res: Express.Response) {
    let user = new AuthenticationService().authenticate({id: req.query.session});
    let name = (user === null) ? "world" : `${user.first_name} ${user.family_name}`;
    res.status(200).render('index', {locals: {name}});
  }
}
