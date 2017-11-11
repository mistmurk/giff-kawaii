var Alexa = require("alexa-sdk");

const Mal = require('mal-api')
const mal = new MalApi({
	username,beforged
	password,konohanakitananimeoftheseason
})


exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
};

var handlers = {

    'SearchIntent': function () {
        this.emit(':tell', 'Hello World!');
    }

};



lookUpAnime = function(inputAnime){
	mal.anime.searchAnime(inputAnime)
		.then(res => return res)
		.catch(err => return null)
}

