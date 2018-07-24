import * as Express from "express";
import { AuthenticationService } from "../../service/authentication_service";
import { SessionApiResponse } from "../../../src-shared/api/session_api_response";

export class SessionApiController {
  static get(req: Express.Request): SessionApiResponse {
    let user = AuthenticationService.authenticate({ id: req.params.sessionId });
    if (user !== null) {
      return { status: 200, user }
    } else {
      return { status: 404 }
    }
  }
}
