var Alexa = require("alexa-sdk");

const Mal = require('../main.js');
const auth = require('./auth.json');

let mal = new Mal(auth);

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
};

var handlers = {

    'SearchIntent': function () {
        this.emit(':tell', 'Hello World!');
    }

};


mal.verifyCredentials()
	.then(user => console.log(user.username + 'verified'))
	.catch(err => console.error(err));

animeSearch = function(inputString){
	mal.searchEntry('anime', inputString)
		.then(animes => {
			for(let anime of animes){
				console.log(anime.title);
			}
		})
		.catch(err => console.error(error));
}