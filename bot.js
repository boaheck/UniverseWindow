console.log("Bot running");


var Twit = require('twit');
var config = require('./secrets');
var exec = require('child_process').exec;
var fs = require('fs');

var T = new Twit(config);
var cmd = 'processing-3.3\\processing-java --sketch="%cd%\\sketch" --run';

var nameSylables = ["ing", "tle", "li", "er", "sion", "day", "lo", "e", "ea", "i", "ny", "gen", "ly", "er", "el", "en", "min", "ie", "sed", "est", "re", "mon", "eti", "ro", "la", "ti", "e", "ite", "o", "le", "es", "lar", "ar", "ob", "out", "d", "mar", "tion", "ture", "mos", "ro", "ers", "an", "tain", "sen", "mye", "ment", "is", "aus", "den", "nal", "on", "mer", "ings", "tal", "essy", "ons", "se", "mag", "ning", "ter", "le", "ra", "ten", "ents", "ties", "te", "so", "tor", "set", "ard", "nual", "ma", "ta", "some", "age", "ode", "as", "ber", "sub", "ba", "res", "si", "ol", "ian", "sur", "but", "su", "un", "dy", "ters", "it", "te", "di", "et", "tu", "eden", "get", "it", "tem", "ca", "lo", "mu", "au", "inty", "cal", "ni", "no", "daqu", "iry", "man", "son", "im"]
var places = ["in the stool of the ", "on the surface of the planet ", "in a fibrous growth on planet ", "in the waters of planet ", "on the roofs of ancient structures on planet ", "on the hide of the wild ", "in the saliva of the ", "in a dirt sample from ", "in the various bodily fluids of the ", "in the atmosphere of planet ", "at the north pole of planet ", "living off an organic compound found in the crust of the planet "]
var beginnings = ["Micro organism sample found ", "Microbes discovered ", "Bacilli observed ", "Bacteria ", "Lethal virus that grows best while "]

/*for(var i = 0;i < 10;i++){
  console.log(randItem(beginnings) + randItem(places) + randomName(nameSylables,2,5));
}*/

tweetIt();

function processing(){
  console.log("finished");
}

function tweetIt(){
  exec(cmd, processing);
  var fileName = "sketch\\output.png"
  var params = {
    encoding: 'base64'
  };
  var b64Content = fs.readFileSync(fileName, params);
  T.post('media/upload', {media_data: b64Content}, uploaded);
}

function uploaded(err, data, response){
  var tweet = {
    status: (randItem(beginnings) + randItem(places) + randomName(nameSylables,2,5)),
    media_ids: [data.media_id_string]
  };
  T.post('statuses/update', tweet, tweeted);
}

function tweeted(err, data, response) {
  console.log("tweeted: " + data.text);
};

function randomName(sylables,minLength,maxLength){
  var len = randomRange(minLength,maxLength);
  var name = "";
  for(var i = 0;i < len;i++){
    var sylable = Math.floor(Math.random()*sylables.length);
    name += sylables[sylable];
  }
  return name;
}

function randomRange(min,max) {
  return min+Math.round(Math.random()*(max-min));
}

function randItem(list){
  return list[Math.floor(Math.random()*list.length)]
}
