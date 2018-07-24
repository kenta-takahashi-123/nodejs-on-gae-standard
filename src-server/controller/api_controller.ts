import { ApiResponse } from "../../src-shared/api/api_response";
import * as Express from "express";

export class ApiController {
  static handle(response: ApiResponse, r: Express.Response) {
    r.status(response.status).send(response).end();
  }
}
