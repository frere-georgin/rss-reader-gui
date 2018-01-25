const moment = require("moment");
const sentencer = require("sentencer");
const generateName = require('node-random-name');

const tools = require('./tools.js');

module.exports = {
  generateBoard: function(boards) {
    return boards[tools.randomIntFromInterval(0, boards.length - 1)].title;
  },
  generateFeedName: function(boards, boardName) {
    for(var i = 0; i < boards.length; i++) {
      if (boards[i].title == boardName && boards[i].feeds && boards[i].feeds.length > 0) {
        return boards[i].feeds[tools.randomIntFromInterval(0, boards[i].feeds.length - 1)].title;
      }
    }
  },
  generateTitle: function() {
    const titles = [
      sentencer.make("This title has {{ a_noun }} and {{ an_adjective }} {{ noun }} in it."),
      sentencer.make("Drunk, this guy has {{ a_noun }} with {{ an_adjective }} {{ noun }}."),
      sentencer.make("Someone who's got {{ a_noun }} with a {{ an_adjective }} {{ noun }}."),
      sentencer.make("Another one, he's {{ an_adjective }}."),
      sentencer.make("A guy, he's {{ an_adjective }}."),
      sentencer.make("I'm out of {{ an_adjective }} {{ noun }}, please help me."),
      sentencer.make("These {{ noun }}s are the {{ an_adjective }} {{ noun }}.")
    ];
    return titles[tools.randomIntFromInterval(0,titles.length - 1)];
  },
  generateItem: function(boards, publishDate) {
    const board = this.generateBoard(boards);
    return {
      title: this.generateTitle(),
      content: this.generateTitle(),
      image: "http://blog.mondediplo.net/local/cache-vignettes/L890xH594/alphabet-morozov-8f255.jpg",
      date: moment(publishDate).fromNow(),
      isFreshContent: tools.isFreshContent(publishDate),
      link: "#",
      creator: generateName(),
      board: board,
      feedName: this.generateFeedName(boards, board),
      status: "success"
    };
  },
  generateFeed: function(boards) {
    let feed = [];
    const numberOfItems = tools.randomIntFromInterval(5, 15);

    for(var i = 0; i <= numberOfItems; i++) {
      const newDate = new Date();
      const publishDate = moment(newDate).add(-i * 2, 'day');
      feed.push(this.generateItem(boards, publishDate));
    }
    return feed;
  },
  generateFeeds: function(boards, numberOfFeeds) {
    let feeds = [];

    for(var i = 0; i <= numberOfFeeds; i++)
      feeds.push(this.generateFeed(boards));

    return feeds;
  }
}
