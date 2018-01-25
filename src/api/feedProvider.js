/* eslint-disable */

export default {
  getFeed (params, callback) {
    fetch("http://localhost:5001/feed?" + params).then(function(response) {
      return response.json();
    }).then(function(data) {
      callback(data);
    }).catch(function(err) {
      console.log("Error -> ", err);
      callback("error");
    });
  }
}
