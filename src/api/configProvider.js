/* eslint-disable */

export default {
  getConfig (callback) {
    fetch("http://localhost:5001/config").then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      callback(data);
    }).catch(function(err) {
      console.log("Error -> ", err);
    });
  },
  postConfig (data, callback) {
    fetch(
      "http://localhost:5001/config",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    ).then(function(response) {
      return response.json();
    }).then(function(data) {
      if(callback)
        callback(data);
    }).catch(function(err) {
      console.log("Error -> ", err);
      if(callback)
        callback("error");
    });
  }
}
