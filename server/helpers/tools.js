const htmlToText = require('html-to-text');
const moment = require('moment');

module.exports = {
  applyFilters: function(feed) {
    return newFeed;
  },
  firstImageUrl: function(content) {
    const regex = /< *img[^>]*src *= *["\']?(http[^"\']*)/i;
    let match;
    if ((match = regex.exec(content)) !== null)
      return match[1];
    else
      return null;
  },
  hashFromString: function(string) {
    var hash = 0, i, chr;
    if (string.length === 0) return hash;
    for (i = 0; i < string.length; i++) {
      chr   = string.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    if (hash < 0) {
      hash *= -1;
    }
    return hash % 10;
  },
  isFreshContent: function(date) {
    const today = moment(new Date());
    const publishDate = moment(date).add(7, 'day');
    if (today < publishDate)
      return true;
    else
      return false;
  },
  randomIntFromInterval: function(min,max) { return Math.floor(Math.random(23)*(max-min+1)+min); },
  sanitizeContent: function(content) {
    if (content) {
      let newContent = htmlToText.fromString(content, {
        wordwrap: 30
      });
      const regex = /(?:https?|ftp):\/\/[\n\S]+/g;
      newContent = content.replace(regex, '');
      return newContent;
    } else {
      return '';
    }
  }
};
