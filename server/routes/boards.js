const jsonfile = require('jsonfile');

module.exports = {

  init: function(context) {

    context.app.get('/boards', function(req,res) {
        if(context.boards)
          return res.status(200).send(context.boards);
        else
          console.log("No boards file.");
    });

    context.app.post('/boards', function(req,res) {
        if(req.body) {
          context.boards = req.body;
          jsonfile.writeFileSync(context.boardsFile, req.body);
          return res.status(200);
        }
        else
          console.log("The board file is not correct.");
    });

  }

};
