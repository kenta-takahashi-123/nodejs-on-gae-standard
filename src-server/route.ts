import {IndexController} from "./controller/page/index_controller";
import {SessionApiController} from "./controller/api/session_api_controller";

const express = require('express');
const renderer = require('express-es6-template-engine');
const app = express();

app.engine('html', renderer);
app.set('views', __dirname + '/template');
app.set('view engine', 'html');

app.route('/').get(IndexController.get);
app.route('/api/v1/sessions/:sessionId').get(SessionApiController.get);

// if modified, also modify app.yaml
app.use('/assets', express.static(__dirname + '/public/assets'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}. Press Ctrl+C to quit.`);
});
