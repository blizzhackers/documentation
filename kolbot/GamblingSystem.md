[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Gambling System

---

### Notes:

* Allows lower level characters to get a steady income of gold to gamble LLD/VLLD items

* Not recommended for rings/amulets because of their high price (unless you want 3 gold finders to supply one gambler).

* It's possible to have multiple teams of gamblers/gold finders. Individual entries are separated by commas.

### Steps:

1. Open and configure .../kolbot/libs/systems/gambling/TeamsConfig.js
	```js
		module.exports = {
			/**
				Setting up:

				"Gamble Team 1": { // Put a unique team name here.

					goldFinders: ["GF Profile 1", "GF Profile 2"], // List of gold finder PROFILE names. They will join gamble games to drop gold

					gamblers: ["Gambler 1", "Gambler 2"], // List of gambler PROFILE names. They will keep gambling and picking up gold from gold finders.

					gambleGames: ["Gambling-", "HeyIGamble-"], // Games that gold finders will join, don't use numbers.

					goldTrigger: 2500000, // Minimum amount of gold before giving it to gamblers.

					goldReserve: 200000 // Amount of gold to keep after dropping.
				}

				Once set up properly, the gold finders will run their own games and join gamblers' games when they're out of gold.
			*/
			"Gamble Team 1": {
				goldFinders: ["gf1","gf2","gf3","gf4","gf5","gf6"],
				gamblers: ["gambler1", "gambler2"],
				gambleGames: ["Mygamblegame"],

				goldTrigger: 2000000,
				goldReserve: 100000
			},
		};
	```
	
	* "Gamble Team 1" - Put your disired name here in our example.

	* goldFinders = PROFILE NAMES that will enter games and drop gold (profile names match window titles) in our example: goldFinders: ["gf1","gf2","gf3","gf4","gf5","gf6"],

	* gamblers = PROFILE NAMES that gamble and pick up gold dropped by gold finders in our example: gamblers: ["gambler1", "gambler2"],

	* gambleGames = games that gold finders will join, don't use numbers. NOTE: d2 always makes first letter of game name uppercase in our example: gambleGames: ["Mygamblegame"],

	* goldTrigger: 2000000, // Minimum amount of gold before giving it to gamblers.

	* goldReserve: 100000 // Amount of gold to keep after dropping.

Once you set those properly, the gold finders will run their own games and they will join gambler games when they're out of gold.
Save the changes.

2. Open D2Bot# and [create a new profile](https://github.com/blizzhackers/documentation/blob/master/d2bot/ManagerSetup.md/#create-a-profile) for  gamblers
3. Open your gambler character config and set what you want to gamble.

