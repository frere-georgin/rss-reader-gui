const fetch = require("node-fetch");

const tools = require('../helpers/tools.js');

const Feed = require('../helpers/rss-to-json.js');

const FeedHelper = require("../helpers/feedparser.js");
const request = require("request");
const moment = require('moment');
const jsonfile = require('jsonfile');


module.exports = {

  init: function(context) {

    context.app.get('/feed', function(req,res) {

      var url = req.param("url");

      var urls = {
      	"urls":[url]
      };

      fetch(
        "http://localhost:4000/feed",
        {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(urls)
        }
      ).then(function(response) {
        return response.json();
      }).then(function(data) {

        var items = data[0].items;

        console.log(items);

        var feed = [];

        console.log ("There are " + items.length + " items in the feed.\n");
        for (item of items) {
          feed.push({
            title: item.title,
            content: tools.sanitizeContent(item.description),
            image: tools.firstImageUrl(item.description),
            date: moment(item.pubdate).fromNow(),
            isFreshContent: tools.isFreshContent(item.created),
            link: item.link,
            creator: item.creator,
            status: "success"
          });
        }

        res.status(200).send(feed);

      }).catch(function(err) {
        console.log("Error -> ", err);
        res.status(500).send(err.reason);
      });

    });

  }

};
