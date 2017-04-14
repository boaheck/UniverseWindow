console.log("Bot running");


let Twit = require('twit');
let config = require('./secrets');
let T = new Twit(config);

let tweet = {
  status: 'I am an entity that has the ability to transport visual information between universes.'
};

T.post('statuses/update', tweet, tweeted);

function tweeted(err, data, response) {
  console.log("tweeted: " + data.text);
};
