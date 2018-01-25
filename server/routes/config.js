const jsonfile = require('jsonfile');

module.exports = {

  init: function(context) {

    context.app.get('/config', function(req,res) {
        if(context.config)
          return res.status(200).send(context.config);
        else
          console.log("No config file.");
    });

    context.app.post('/config', function(req,res) {
        if(req.body) {
          context.config = req.body;
          jsonfile.writeFileSync(context.configFile, req.body);
          return res.status(200);
        }
        else
          console.log("The config file is not correct.");
    });

  }

};
