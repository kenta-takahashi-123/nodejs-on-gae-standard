import * as Express from "express";
import {IndexController} from "./controller/page/index_controller";
import {SessionApiController} from "./controller/api/session_api_controller";
import {ApiController} from "./controller/api_controller";

const express = require('express');
const renderer = require('express-es6-template-engine');
const app = express();

app.engine('html', renderer);
app.set('views', __dirname + '/template');
app.set('view engine', 'html');

app.route('/').get(IndexController.get);
app.route('/api/v1/sessions/:sessionId').get(
  (a: Express.Request, b: Express.Response) => ApiController.handle(SessionApiController.get(a), b));

// if modified, also modify app.yaml
app.use('/assets', express.static(__dirname + '/public/assets'));

// error handling
app.use((_err: any, req: Express.Request, res: Express.Response, _next: any) => {
  //TODO logging
  if (req.path.startsWith("/api")) {
    res.status(500).json({status: 500})
  } else {
    res.status(500).render('error', {locals: {name: "World"}});
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}. Press Ctrl+C to quit.`);
});
