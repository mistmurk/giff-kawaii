var Alexa = require("alexa-sdk");
const Mal = require('mal-api')
var converter = require('number-to-words')

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
        //this is an attempt to get rid of 1 or 2 in favor of one and two
        //get substring that has digits regex, and then replace with swap use number-to-words
        

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
            var alexaAnime = this.event.request.intent.slots.anime.value;
            if(this.event.request.intent.slots.episodes.hasOwnProperty('value')) {
                var alexaVar = this.event.request.intent.slots.episodes.value;
                lookUpAnime(alexaAnime, (result) => {
                    if (result == null) {
                var retString = "Sorry! I couldn't find ".concat(alexaString, ". Please repeat that?");
                        this.emit(':tell',retString)
            } else {
                        if(result instanceof Array) {
                            result = result[0];
                        }
                        mal.anime.updateAnime(result.id, {
                            episode: alexaVar
                        }).then(res => this.emit(':tell', "Updated " + result.title + " episode to " + alexaVar))
                            .catch(err => this.emit(':tell',"Failed to update episode for " + result.title));
                    }
                });
            }
            else if (this.event.request.intent.slots.score.hasOwnProperty('value')) {
                var alexaVar = this.event.request.intent.slots.score.value;
                lookUpAnime(alexaAnime, (result) => {
                    if (result == null) {
                var retString = "Sorry! I couldn't find ".concat(alexaString, ". Please repeat that?");
                        this.emit(':tell',retString)
            } else {
                        if(result instanceof Array) {
                            result = result[0];
                        }
                        mal.anime.updateAnime(result.id, {
                            score: alexaVar
                        }).then(res => this.emit(':tell', "Updated " + result.title + " score to " + alexaVar))
                            .catch(err => this.emit(':tell', "Failed to update score for " + result.title));
                    }
                });
            }
            /*else if(this.event.request.intent.slots.status.hasOwnProperty('value')) {
                var alexaVar = this.event.request.intent.slots.status.value;
                lookUpAnime(alexaAnime, (result) => {
                    if (result == null) {
                var retString = "Sorry! I couldn't find ".concat(alexaString, ". Please repeat that?");
                        this.emit(':tell',retString)
            } else {
                        if(result instanceof Array) {
                            result = result[0];
                        }
                        mal.anime.updateAnime(result.id, {
                            status: convertStatus(alexaVar);
                        }).then(res => this.emit(':tell', "Updated " + result.title + " status to " + alexaVar))
                            .catch(err=> this.emit(':tell', "Failed to update status for " + result.title));
                    }
                });

            } */ else {
                this.emit(':tell', "Failed to update status.");
            }
        }

};

convertStatus = function(str) {
    if (str.lowercase() === "plan to watch") {
        return 6;
    }
    else if (str.lowercase() === "watching") {
        return 1;
    }
    else if (str.lowercase() === "completed") {
        return 2;
    }
    else if (str.lowercase() === "on hold") {
        return 3;
    }
    else if (str.lowercase() === "dropped") {
        return 4;
    }
}

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

//this finds the substring with digits, uns it through number-to-wrords
//and then returns the resulting string with the correct words instead of
//digits
//TODO missing case where
stringNumberify = function(stringWithDigits){
    //arrays of index for digit substrings
    var positions = [0, 0]
    //while has digit runs here
    while(hasDigit(stringWithDigits)){
        //whether or not its in a digit
        var inDigit = false
        for(int i = 0; i < stringWithDigits.length; i++){
            //this should check for 
            if(stringWithDigits.charAt(pos: i) == /d/g){ //indexof instead
                //checks if its in a digit
                if(!inDigit){
                    positions[0] = i;
                }
            }else{ //not a digit,so if it was in a digit add to array
                if(inDigit){
                    positions[1] = i - 1;
                    break;
                }
            }

        }

        //have index positions, relpace the lines with numberes
        if(postions[1] != 0){}
            stringToBeReplaced = stringWithDigits.substring(positions[0], positions[1])
            wordDigits = converter.toWords(stringToBeReplaced) //this is the digit in words
            stringWithDigits.replace(stringToBeReplaced, wordDigits) //should replace
        }
    }

}


//checks if there are digits still in the string
hasDigit = function(string){

    return false;
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
