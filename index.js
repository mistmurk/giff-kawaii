var Alexa = require("alexa-sdk");
const Mal = require('mal-api')

const password = "konohanakitananimeoftheseason";
const username = "beforged";

const mal = new Mal({
	username,
	password,
})


exports.handler = function(event, context, callback){
    let alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

const handlers = {

    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Sayonara!");
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':tell', "MonikaMonikaMonikaMonikaMonikaMonika");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Sayonara!");
    },'SearchIntent': function () {
      var alexaString = this.event.request.intent.slots.anime.value;

      var objectJ = lookUpAnime(alexaString, (result) => {
				if(result instanceof Array) {
					result = result[0];
				}
      	var retString = ""
      	if (result == null) {
        	retString = "I can't find ".concat(alexaString);
      	} else {
        	retString = decodeURI(unescape(result.synopsis));
      	}

      	this.emit(':tell', retString);
      });

    }

};



lookUpAnime = function(inputAnime, callback){
	mal.anime.searchAnime(inputAnime)
		.then(res => callback(res))
		.catch(err => console.err("err"))
}
