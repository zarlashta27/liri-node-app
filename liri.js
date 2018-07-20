//configuration
require("dotenv").config();

//Configurations/global varaibles
var Twitter = require("twitter");

var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");

//Setting up the keys
var client = new Twitter(keys.twitter);

var spotify = new Spotify(keys.spotify);

//Reference Codes for Twitter
// var params = {screen_name: 'zaro14918904'};
// client.get('statuses/user_timeline', params, function(error, tweets, response) {
//   if (!error) {
//     console.log(tweets);
//     console.log(response);
//   }

  
// });


// //Reference code for Spotdify
// spotify.search({ type: 'track', query: 'Hit me baby one more' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(JSON.stringify(data,null, 2)); 
// });


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
  
  })
}

//=========================End of Twitter=============================



//=========================Beginning of Spotify=======================
spotify.search({ type: 'track', query: 'Hit me baby one more' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  //Need to list the name of the artist
  console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name,null, 2)); 
  //list the  The song's name

  //List the preview link of the song from Spotify

  //List the album that the song is from
  });
  




//=============================End of Spotify=========================


//========================Beginning of OMDB==========================




//=======================End of OMDB===================================





//=======================Beginning of Random.txt file===================




//=========================End of Random.txt file========================