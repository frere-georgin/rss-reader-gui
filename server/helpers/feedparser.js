const moment = require("moment");
const FeedParser = require('feedparser');
const request = require('request');

const tools = require('./tools.js');


module.exports = function FeedHelper(url) {
  return new Promise((resolve, result) => {
    const feedparser = new FeedParser();

    let feed = [];
    // if (rss && rss.items) {
      // console.log("length", rss.items.length);
    let getRequest = request(url);
    getRequest.on('error', function (error) {
      // handle any getRequestuest errors
    });

    getRequest.on('response', function (res) {
      var stream = this; // `this` is `req`, which is a stream

      if (res.statusCode !== 200) {
        this.emit('error', new Error('Bad status code'));
      }
      else {
        stream.pipe(feedparser);
      }
    });

    feedparser.on('error', function (error) {
      // always handle errors
    });

    feedparser.on('readable', function () {
      console.log("READABLE");
      // This is where the action is!
      var stream = this; // `this` is `feedparser`, which is a stream
      var meta = this.meta; // **NOTE** the "meta" is always available in the context of the feedparser instance

      getFeed (url, function (err, feedItems) {
        if (!err) {
          function pad (num) {
          var s = num.toString (), ctplaces = 3;
            while (s.length < ctplaces) {
              s = "0" + s;
            }
            return (s);
          }
          console.log ("There are " + feedItems.length + " items in the feed.\n");
          for (item of feedItems) {
            feed.push({
              title: item.title,
              content: tools.sanitizeContent(item.description),
              image: tools.firstImageUrl(item.description),
              date: moment(item.created).fromNow(),
              isFreshContent: tools.isFreshContent(item.created),
              link: item.link,
              creator: item.creator,
              status: "success"
            });
          }
          resolve(feed);
        } else {
          reject(new Error("Feed Error."))
        }
      });
    });
  });

}



function getFeed (urlfeed, callback) {
  var req = request (urlfeed);
  var feedparser = new FeedParser ();
  var feedItems = new Array ();
  req.on ("response", function (res) {
    var stream = this;
    if (res.statusCode == 200) {
      stream.pipe (feedparser);
    }
  });
  req.on ("error", function (res) {
    console.log ("getFeed: Error reading feed.");
  });
  feedparser.on ("readable", function () {
    try {
      var item = this.read (), flnew;
      if (item !== null) {
        feedItems.push (item);
      }
    }
    catch (err) {
      console.log ("getFeed: err.message == " + err.message);
    }
  });
  feedparser.on ("end", function () {
    callback (undefined, feedItems);
  });
  feedparser.on ("error", function (err) {
    console.log ("getFeed: Error reading feed.");
    callback (err);
  });
}
