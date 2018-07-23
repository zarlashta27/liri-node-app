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

var thing = process.argv[3];




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
function MySpotify(){
spotify.search({ type: 'track', query: 'Hit me baby one more' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

  //If there is no error, return data

  console.log('---------------------');
  //Need to list the name of the artist
  console.log("Artist:" + JSON.stringify(data.tracks.items[0].album.artists[0].name,null, 2)); 

  //list the  The song's name
  console.log("Song:" + JSON.stringify(data.tracks.items[0].name,null, 2));

  //List the preview link of the song from Spotify
  console.log("Preview Link:" + JSON.stringify(data.tracks.items[0].preview_url,null, 2));

  //List the album that the song is from
  console.log("Album:" + JSON.stringify(data.tracks.items[0].album.album_type,null, 2));

  //If no song is provided then your program will default to "The Sign" by Ace of Base.
  console.log('---------------------');

  });
 if (thing == null){
     thing = 'The Sign';
  }

}


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
     }
   });

}
//=======================End of OMDB===================================





//=======================Beginning of Random.txt file===================




//=========================End of Random.txt file========================


//=================Beginning of Main====================================
//action statement, switch statement to declare what action to execute.

// if (process.argv.length < 3) {
//   console.log("You didn't type enough arguments")
// }

//node command line argument - user input
var runCommand = process.argv[2];
// console.log("What is this?");
// console.log(process.argv);
// console.log("Hello");
switch(runCommand){
  case 'Twitter':
  console.log('Twitter');
  mytweets(); //This is the function for the twitter call
  break;

  case 'Spotify':
  console.log('Spotify');
  MySpotify();// This is the funtion for the spotify call
  break;

  case 'movie-this':
  console.log('movie-this');
  movieThis(thing) // this is the function for the OMDB call
  break;

  // case 'random.txt':

  //Statements executed when none of
  //the values match the value of the expression
  default:
  // console.log('Wrong choice, try again'+ runCommand + '.');


}

//========================End of Main===================================