var express = require("express");
var app = express();
var port = process.env.PORT || 5000;

app.get("/", function(req, res) {
   res.sendfile('dist/index.html')
});

app.get(/^(.+)$/, function(req, res) {
    console.log('static file request : ' + req.params);
    res.sendfile( __dirname + req.params[0]);
});

app.listen(port, function() {
  console.log("rss-reader-gui launched on http://localhost:" + port);
});
