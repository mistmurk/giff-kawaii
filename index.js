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
        this.emit(':tell', retString);
    }

};



lookUpAnime = function(inputAnime){
	mal.anime.searchAnime(inputAnime)
		.then(res => return res)
		.catch(err => return null)
}

var alexaString = this.event.request.intent.slots.anime.value;

var objectJ = lookUpAnime(alexaString);

if (objectJ == null) {
	var retString = "I can't find ".concat(alexaString);
} else {
	var retString = objectJ.title;
}
