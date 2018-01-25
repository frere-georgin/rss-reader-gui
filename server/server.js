

const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');
const cors = require('cors');

let serverConfig = jsonfile.readFileSync("./server-config.json");

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
let config = jsonfile.readFileSync(serverConfig.configFile);
let boards = jsonfile.readFileSync(serverConfig.boardsFile);

let context = {
  configFile: serverConfig.configFile,
  boardsFile: serverConfig.boardsFile,
  isFakeData: serverConfig.isFakeData,
  config: config,
  boards: boards,
  app: app,
  http: http,
  io: io
};

context.io.set('origins', '*:*');
context.app.use(bodyParser.json());
context.app.set('port', 5001);
context.app.use(cors());

// ===================
// ROUTES
// ===================

const pushFeed = require('./socket/pushFeed.js');
pushFeed.init(context);

const discoveryRoute = require('./routes/discovery.js');
discoveryRoute.init(context);

const configRoute = require('./routes/config.js');
configRoute.init(context);

const boardsRoute = require('./routes/boards.js');
boardsRoute.init(context);

const feedRoute = require('./routes/feed.js');
feedRoute.init(context);

context.http.listen(context.app.get('port'), function() {
  console.log('Node app is running on port', context.app.get('port'));
});
