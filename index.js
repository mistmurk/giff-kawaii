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
				this.response.speak("This is a program that gives you information about your favorite anime. Simply ask anime list look up any anime, and I will respond to you. I will provide the basic information that you need to judge whether or not to watch your anime. I will tell you the rating, number of episodes, the type of anime, as well as a synopsis if you so choose.");
				this.emit(':responseReady');
				// this.emit(':tell', "This is a program that gives you information about your favorite anime. Simply ask anime list look up any anime, and I will respond to you. I will provide the basic information that you need to judge whether or not to watch your anime. I will tell you the rating, number of episodes, the type of anime, as well as a synopsis if you so choose.");
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Sayonara!");
    },'SearchIntent': function () {
      	var alexaString = this.event.request.intent.slots.anime.value;

      	lookUpAnime(alexaString, (result) => {
      	var retString = ""
      	if (result == null) {
        	retString = "Sorry! I couldn't find ".concat(alexaString, ". Please repeat that?");
					this.emit(':tell',retString)
      	} else {
					if(result instanceof Array) {
						result = result[0];
					}
					retString = result.title.concat(" is a ", result.type, " anime with ", result.episodes, " episodes, scoring ratings of ", result.score, " out of 10.");
					retString = retString.concat(" Here is a brief synopsis. ", cleanupSynopsis(result.synopsis));

					var cardImage = {
						smallImageUrl:result.image,
						largeImageUrl:result.image
					}

					var cardContent = "Type: " + result.type + "\nEpisodes: " + result.episodes + "\nRating: " + result.score + "/10";
					this.response.cardRenderer(result.title,cardContent,cardImage);
					this.response.speak(retString);
					this.emit(':responseReady');
	      	// this.emit(':tellWithCard', retString, result.title, cardContent, cardImage);
      	}
      });
    },'DeleteIntent': function () {
			var alexaString = this.event.request.intent.slots.anime.value;
			lookUpAnime(alexaString, (result) => {
				if (result == null) {
      		var retString = "Sorry! I couldn't find ".concat(alexaString, ". Please repeat that?");
					this.emit(':tell',retString)
    		} else {
					if(result instanceof Array) {
						result = result[0];
					}

					mal.anime.deleteAnime(result.id)
						.then(res => this.emit(':tell', "Removed anime from list"))
						.catch(err => this.emit(':tell', "Failed to remove anime from list"))
				}
			});
		},'AddIntent': function () {
			var alexaString = this.event.request.intent.slots.anime.value;
			lookUpAnime(alexaString, (result) => {
				if (result == null) {
        	var retString = "Sorry! I couldn't find ".concat(alexaString, ". Please repeat that?");
					this.emit(':tell',retString)
      	} else {
					if(result instanceof Array) {
						result = result[0];
					}

					mal.anime.addAnime(result.id, {
						status: 6
					}).then(res => this.emit(':tell', "Added " + result.title + " to your list!"))
					  .catch(err => this.emit(':tell', "Failed to add " + result.title + " to your list"));

				}
			});
		},'UpdateIntent': function() {

			this.emit(':responseReady');
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
		.catch(err => callback(null));
}

/*
mal.anime.addAnime(1535, {
  score: 5
}).then(res => console.log(res))
  .catch(err => console.error(err))

  mal.anime.updateAnime(1535,{
      score: 6,
      episode: 2,
      status: 2
  }).then(res => console.log(res))
  .catch(err => console.error(err))

  mal.anime.deleteAnime(1535,{
  })
*/
