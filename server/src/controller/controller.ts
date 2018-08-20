import { ApiResponse, PageResponse } from "../../../shared/src/response";
import * as Express from "express";

export class Controller {
  static api(r: Express.Response, response: Promise<ApiResponse>, next: any) {
    response.then(resp => r.status(resp.status).send(resp).end()).catch(next);
  }

  static page(r: Express.Response, response: Promise<PageResponse>, next: any) {
    response.then(resp => r.status(resp.status).render('commons/base', {
      includes: resp.templateName,
      pageTitle: resp.title,
      params: resp.params
    })).catch(next);
  }
}
