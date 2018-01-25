const discover = require('../helpers/rss-discovery.js');

module.exports = {

  init: function(context) {

    context.app.get('/discover', function(req,res) {
      const url = req.param("url");
      discover(url, function (err, results) {
        if (results && results.links[0] && results.links[0].href)
          res.status(200).send(results.links[0].href);
        else
          res.status(500).send("Internal server error.");
      });
    });

  }

}
