//configuration
require("dotenv").config();

// will need fs to read and write files
var fs = require("fs");


//Configurations/global varaibles
var Twitter = require("twitter");

var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");

//Setting up the keys
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);


var runCommand = process.argv[2];
var thing = process.argv[3];

//=================Beginning of Main====================================
//node command line argument - user input

switch(runCommand){
  case 'Twitter':
  console.log('Twitter');
  mytweets(); //This is the function for the twitter call
  break;

  case 'Spotify':
  console.log('Spotify');
  spotifySong()// This is the funtion for the spotify call
  break;

  case 'movie-this':
  console.log('movie-this');
  movieThis(thing) // this is the function for the OMDB call
  break;

  case 'do-what-it-says':
  console.log('do-what-it-says');
  doWhatItSays() // This is the funtion for the random.txt 
  break;

  default:
  console.log ("Please enter one of the following:\nTwitter\nSpotify\nmovie-this\ndo-what-it-says");
}

//========================End of Main===================================



//Function Section

//===========================Beginning of Twitter===================
function mytweets() {
  client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response){
    //If you get an error, print an error message
    if (error) {
      console.log("Sorry, Try Again!");
    }
    //If you get the response, print the 20 tweets
    
    for (let i= 0; i< 20; i++) {
       console.log(tweets[i].text);
    }
  
  });
}
//=========================End of Twitter=============================



//=========================Beginning of Spotify=======================

// Spotify function, uses the Spotify module to call the Spotify api

function spotifySong() {
  console.log("\r\n" + "~ have some music ~" + "\r\n");
  var songTitle = process.argv[3];
  console.log(songTitle);
  if (!songTitle) {
      console.log("No song has been entered?");
      songTitle = "The Sign";
  }
  params = songTitle;
  spotify.search({type: "track", query: params}, function(err, data) {
      if (!err) {
          console.log("no error!  only music!");
          var songInfo = data.tracks.items;
          for (var i = 0; i < 5; i++) {
              if (songInfo[i] != undefined) {
                  var spotifyResults = 
                  "Artist: " + songInfo[i].artists[0].name + "\r\n" +
        "Song: " + songInfo[i].name + "\r\n" +
        "Album: " + songInfo[i].album.name + "\r\n" +
        "Preview Url: " + songInfo[i].preview_url + "\r\n" + 
        "------------------------------ " + i + " ------------------------------" + "\r\n";
        console.log(spotifyResults);
              }
          }
      } else {
          console.log("Error Occurred, Try Again");
          return;
      }
  });
};
//=============================End of Spotify=========================


//========================Beginning of OMDB==========================
//The request npm package will be used to hit the OMDB API
function movieThis(thing){
  if (thing == null){
      thing = 'Mr. Nobody';
  }
  request("http://www.omdbapi.com/?t="+thing+"&y=&plot=short&apikey=40e9cece",
   function(error, response, body){
     if (!error && response.statusCode === 200){
       console.log('---------------------');
       console.log('Movie Title:' + JSON.parse(body).Title);
       console.log('Release Year: ' + JSON.parse(body).Year);
       console.log('IMDb Rating: ' + JSON.parse(body).imdbRating);
       console.log('Country: ' + JSON.parse(body).Country);
       console.log('Plot: ' + JSON.parse(body).Plot);
       console.log('Lead Actors: ' + JSON.parse(body).Actors);
       console.log('Language: ' + JSON.parse(body).Language);
       console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).rottenTomatoesRating);
       console.log('-----------------------');
     } else {
       console.log("Error: " + error);
       return;
     }
   });

}
//=======================End of OMDB===================================


//=======================Beginning of Random.txt file===================
//Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands
  
// It also adds the spotify command
function doWhatItSays() {
  fs.readFile('random.txt', "utf8", function(error, data){
    var txt = data.split(',');

    spotifySong(txt[1]);
  });
}
     
//=========================End of Random.txt file========================


