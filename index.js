var Alexa = require("alexa-sdk");

const Mal = require('mal-api')
const mal = new MalApi({
	username,beforged
	password,konohanakitananimeoftheseason
})


exports.handler = function(event, context, callback){
    let alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};
const handlers = {

    'SearchIntent': function () {
        this.emit(':tell', retString);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Sayonara!");
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':tell', "MonikaMonikaMonikaMonikaMonikaMonika");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Sayonara!");
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
