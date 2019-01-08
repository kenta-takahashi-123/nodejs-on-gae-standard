import * as Ex from "express";
import { IndexController } from "./controller/page/index-controller";
import { SessionApiController } from "./controller/api/session-api-controller";
import { Controller } from "./controller/controller";
import { Env } from "../../shared/src/env";
import {ChatApiController} from "./controller/api/chat-api-controller";

const express = require('express');
const renderer = require('ejs');
const morgan = require('morgan');
const app = express();
const env = app.get('env') === Env.Production ? Env.Production : Env.Development;

// logger
if (env === Env.Development) {
  app.use(morgan('dev', { immediate: true }));
  // TODO production logging
}

// html renderer
app.engine('html', renderer.render);
app.set('views', __dirname + '/../template');
app.set('view engine', 'ejs');

// applications
// - page
app.route('/').get((req: Ex.Request, res: Ex.Response, next: any) =>
    Controller.page(res, IndexController.get(req), next));
// - api
app.route('/api/v1/sessions/:sessionId').get((req: Ex.Request, res: Ex.Response, next: any) =>
    Controller.api(res, SessionApiController.get(req), next));
app.route('/api/v1/chats').get((_req: Ex.Request, res: Ex.Response, next: any) =>
    Controller.api(res, ChatApiController.get(), next));
app.route('/api/v1/chats').post((req: Ex.Request, res: Ex.Response, next: any) =>
    Controller.api(res, ChatApiController.post(req), next));

// static files
// - if modified, also modify app.yaml
app.use('/assets', express.static(__dirname + '/../public/assets'));
app.use('/loaderio-e361c7eaca7bf514d3b83b1064fd9380.txt', express.static(__dirname + '/../public/loaderio-e361c7eaca7bf514d3b83b1064fd9380.txt'));

// error handling
app.use((err: Error, req: Ex.Request, res: Ex.Response, next: any) => {
  console.error(err.message); // TODO logging
  if (req.path.startsWith("/api")) {
    Controller.api(res, new Promise(() => {
      return {status: 500}
    }), next);
  } else {
    Controller.page(res, new Promise(() => {
      return {
        status: 500,
        title: 'Error',
        templateName: 'error'
      }
    }), next);
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}. Press Ctrl+C to quit.`);
});
