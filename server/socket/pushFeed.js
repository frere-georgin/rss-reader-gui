const moment = require("moment");
const fetch = require("node-fetch");

const tools = require('../helpers/tools.js');

let i  = 0;

module.exports = {
  init: function(context) {

    context.io.on('connection', function(socket) {
      console.log("socket connected");
      context.boards.map(function(board, x) {
        board.feeds.map(function(feed, y) {
          setInterval(function () {

            const newDate = new Date();
            const publishDate = moment(newDate).add(-50 * x * y, 'second');
            //socket.emit('listIsUpdated', item);

          }, feed.refreshRate * 1000);
        });
      });
      // socket.on('update', function(msg){
      //   console.log('feed: ' + msg);
      // });
      socket.on('disconnect', function(){
        console.log('socket disconnected');
      });
    });

  }
};
