
var converter = require('number-to-words')

stringNumberify = function(stringWithDigits){
    //arrays of index for digit substrings
    var positions = [0, 0]
    //while has digit runs here

    while(hasDigit(stringWithDigits)){
        //whether or not its in a digit

        var inDigit = false
        

        for( i = 0; i < stringWithDigits.length; i++){
            console.log(stringWithDigits.charAt(i))
            //this should check for 
            if(stringWithDigits.charAt(i).match(/\d/)){ //indexof instead
                //checks if its in a digit
                if(!inDigit){
                    positions[0] = i;
                    inDigit = true;
                }
            }else{ //not a digit,so if it was in a digit add to array
                
                if(inDigit){
                    positions[1] = i;
                    inDigit = false;
                    break;
                }
            }

        }
        if(positions[1] != 0){
            console.log("i got here")
            //have index positions, relpace the lines with numberes
            stringToBeReplaced = stringWithDigits.substring(positions[0], positions[1])
            console.log(positions[0] + " " + positions[1] + " " + stringToBeReplaced)
            wordDigits = converter.toWords(stringToBeReplaced) //this is the digit in words
            
            //var retstring
            stringWithDigits = stringWithDigits.replace(stringToBeReplaced, wordDigits) //should replace

            positions[0] = positions[1] = 0; // <<<---THIS BREAKS IT 
        }
    }
    console.log(stringWithDigits)
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
stringNumberify("adf 245 asgd 4 3")