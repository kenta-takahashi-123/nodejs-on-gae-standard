import * as Ex from "express";
import { IndexController } from "./controller/page/index_controller";
import { SessionApiController } from "./controller/api/session_api_controller";
import { Controller } from "./controller/controller";
import { Env } from "shared/env";

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
app.route('/').get((req: Ex.Request, res: Ex.Response) =>
  Controller.page(res, IndexController.get(req)));
// - api
app.route('/api/v1/sessions/:sessionId').get((req: Ex.Request, res: Ex.Response) =>
  Controller.api(res, SessionApiController.get(req)));

// static files
// - if modified, also modify app.yaml
app.use('/assets', express.static(__dirname + '/../public/assets'));

// error handling
app.use((err: Error, req: Ex.Request, res: Ex.Response, _next: any) => {
  console.error(err.message); // TODO logging
  if (req.path.startsWith("/api")) {
    Controller.api(res, {
      status: 500
    });
  } else {
    Controller.page(res, {
      status: 500,
      title: 'Error',
      templateName: 'error'
    });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}. Press Ctrl+C to quit.`);
});
