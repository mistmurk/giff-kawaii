# giff-kawaii

*Welcome to giff-kawaii, a MAL integration skill for Amazon Echo!*
___
**What is MAL?**
MAL, short for My Anime List, is the social networking site for anime/manga fans.  The site is also the largest database, where users can make a list of all the Anime and Manga they have watched/read, hence the name.
___

## Usage

giff-kawaii responds to simple queries for searching MAL for anime titles. Also, the program can add, remove, or update an anime on the users' MAL account.

Alexa will respond with basic information about the anime, including running dates, number of episodes, rating, and synopsis.

This includes a card response in the Alexa app: 

![Example](https://raw.githubusercontent.com/mistmurk/giff-kawaii/master/img/AlexaCard.png)


 - Some samples for looking up anime
 ```
 Alexa, tell anime list lookup Naruto
 Alexa, ask anime list to find Cowboy Bebop
 Alexa, use anime list to search for Death Note   
 ```
    
 - Some samples for adding anime to a personal list
 ```
 Alexa, tell anime list to add Naruto to list
 Alexa, ask anime list to save Cowboy Bepop
 ```
 
 - Some samples for removing anime to a personal list
 ```
 Alexa, tell anime list to remove Death Note 
 Alexa, ask anime list to get rid of Naruto
 Alexa, tell anime list to ravioli ravioli don't loot the Death Note
 ```
 - Some samples for updating an anime score/status/episodes
 
 ```
 Alexa, tell anime list to update Death Note status to Completed
 Alexa, tell anime list to update Death Note score to 10
 Alexa, tell anime list to update Death Note episode to 20
 ```

Users also can perform adding, removing, rate, update anime progress from their own personal lists.  At this time, this is more of a proof of concept and only allows a single account to be logged in.

## Development

giff-kawaii was developed at **Hackital 2017** by Minh Nguyen, MyeongJae *"Tommy"* Chu, Richard Yu, and Luke Vacek in 30 hours.

### Roadblocks

1. Alexa's voice recognition has limitation and not compatible with Japanese titles.
2.  MAL does not use OAuth 2.0, which we considered bypassing by implementing our own validation system.  Due to security concerns, we decided not to.
3.  Alexa development portal has a limited amount of training data you can supply, causing our voice recognition to be somewhat less accurate.
4. Due to Alexa non-strict typing, sometimes voice recognizes numbers instead of words and vice versa.
5. We went through several iterations of "Fuzzy" search, attempting to account for users' mistakes.  However, our solution proved to be counteractive to our goals.
5. Sleepine........*zzzz*


## Future Steps

Implement a log in system to allow users to modify their own anime list.

Alexa will be able to suggest new anime to the user based on what they have been watching/searching for, or based on the input genre, or simply just suggest a random anime.
