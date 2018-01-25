/* eslint-disable */

export default {
  getBoards (callback) {
    fetch("http://localhost:5001/boards").then(function(response) {
      return response.json();
    }).then(function(data) {
      callback(data);
    }).catch(function(err) {
      console.log("Error -> ", err);
    });
  },
  postBoards (data, callback) {
    fetch(
      "http://localhost:5001/boards",
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
