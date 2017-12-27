
var converter = require('number-to-words')

stringNumberify = function(stringWithDigits){
    //arrays of index for digit substrings
    var positions = [0, 0]
    //while has digit runs here

    while(hasDigit(stringWithDigits)){
        //whether or not its in a digit

        var inDigit = false
        

        for( i = 0; i < stringWithDigits.length; i++){
            //this should check for end of string digits so it doesnt loop again and mess up
            if(stringWithDigits.charAt(i).match(/\d/) && i === stringWithDigits.length - 1){
                positions[0] = i
                positions[1] = i + 1
                //goes to the converter
                break;
            }
            //checks if it is a digit
            if(stringWithDigits.charAt(i).match(/\d/)){ //indexof instead
                //checks if its in a digit
                if(!inDigit){
                    //if not it sets the first entry
                    positions[0] = i;
                    //sets it to be in a digit
                    inDigit = true;
                }
            }else{ //not a digit,so if it was in a digit add to array
                //it has been in a digit so its the end of the number
                if(inDigit){
                    positions[1] = i;
                    inDigit = false;
                    //goes to the converter
                    break;
                }
            }

        }
        if(positions[1] != 0){

            //have index positions, relpace the lines with numberes
            stringToBeReplaced = stringWithDigits.substring(positions[0], positions[1])
            
            wordDigits = converter.toWords(stringToBeReplaced) //this is the digit in words
            
            //var retstring
            stringWithDigits = stringWithDigits.replace(stringToBeReplaced, wordDigits) //should replace

            //positions[0] = positions[1] = 0; // <<<---THIS BREAKS IT 
        }
    }
    
    return stringWithDigits;

}


//checks if there are digits still in the string
hasDigit = function(string){
    if(string.search(/\d/g) != -1){ //if there is not no match found
        //console.log("true")
        return true;
    }
    //console.log("f")
    return false;

}
//hasDigit("abcasd5adfsd")
stringNumberify("3 adf 245 asgd 4 3")