'use strict';
var TwitterApi = require('twit');
var async = require('async');
// doc : https://github.com/ttezel/twit

const addOne = function(data, callback) {

}

module.exports = {
  getTwit: function(serverConfig, search, callback) {

    // Singleton
    if (!Twit) {
      var Twit = new TwitterApi({
        consumer_key:         serverConfig.consumer_key,
        consumer_secret:      serverConfig.consumer_secret,
        access_token:         serverConfig.access_token,
        access_token_secret:  serverConfig.access_token_secret,
        timeout_ms:           60 * 1000,  // optional HTTP request timeout to apply to all requests.
      })
    }

    Twit.get('search/tweets', { q: 'banana since:2017-01-01', count: 100 }, function(err, data, response) {
      // async.map(data.statuses, addOne, finished)
      let twits = [];
      data.statuses.map(function(twit) {
        twits.push({"name": twit.user.name, "content": twit.text});
        // console.log(twit.text);
        // console.log(twit.user.name);
      });
      callback(twits);
    });
  }
}
