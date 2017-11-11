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
        const speechOutput = "MonikaMonikaMonikaMonikaMonikaMonika";
        
        this.emit(':tell', speechOutput);
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

