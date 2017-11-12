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
        	retString = cleanupSynopsis(result.synopsis);
      	}

      	this.emit(':tell', retString);
      });

    }

};

cleanupSynopsis = function(str) {
	str = str.replace(/&.*;/g," ");
	str = str.replace(/\\./g," ");
	str = str.replace(/<.*>/g,"");
	str = str.replace("[Written by MAL Rewrite]","");
	return str;
}

lookUpAnime = function(inputAnime, callback){
	mal.anime.searchAnime(inputAnime)
		.then(res => callback(res))
		.catch(err => console.err("err"))
}
