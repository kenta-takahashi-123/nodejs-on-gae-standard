import { ApiResponse, PageResponse } from "../../../shared/src/response";
import * as Express from "express";

export class Controller {
  static api(r: Express.Response, response: ApiResponse) {
    r.status(response.status).send(response).end();
  }
  static page(r: Express.Response, response: PageResponse) {
    r.status(response.status).render('commons/base', {
      includes: response.templateName, 
      pageTitle: response.title,
      params: response.params 
    })
  }
}
