//configuration
require("dotenv").config();

//Configurations/global varaibles
var Twitter = require("twitter");

//var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");

//Setting up the keys
var client = new Twitter(keys.twitter);

//var spotify = new Spotify(keys.Spotify);

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

client.get('statuses/user_timeline', {count: 20}, function(error, tweets, response){
  //If you get an error, print an error message

  //If you get the response, print the 20 tweets

  console.log(tweets);

})






//=========================End of Twitter=============================



//=========================Beginning of Spotify=======================





//=============================End of Spotify=========================


//========================Beginning of OMDB==========================




//=======================End of OMDB===================================





//=======================Beginning of Random.txt file===================




//=========================End of Random.txt file========================