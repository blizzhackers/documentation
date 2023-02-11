[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Multi Botting

---

* [Info](#info)
* [Game Creator](#game-creator)
	* [create/edit the profile](#createedit-the-profile)
	* [randomize the timers](#randomize-the-timers)
* [Joining Games](#joining-games)
	* [D2BotFollow](#d2botfollow)
		* [the joiners profiles](#the-joiners-profiles)
		* [randomize the timers](#randomize-the-timers-1)
		* [edit the joining info](#edit-the-joining-info)		
	* [D2BotChannel](#d2botchannel)
* [Team Games](#team-games)
	* [using MFTeam](#using-mfteam)
		* [MFLeader](#mfleader)
		* [MFHelper](#mfhelper)
		* [silenced MFTeam](#silenced-mfteam)
	* [using Followers](#using-followers)
	* [followers exit delays](#followers-exit-delays)
	* [dia-baal teams](#dia-baal-teams)

---

### info
[d2bs](https://github.com/blizzhackers/kolbot) allows multi-botting.


## game creator
* D2BotLead is the starter script that you will use to create games. It can announce games in channels when used for public runs. You have to set D2BotLead for your profile as a entry script. Now edit starter with your IDE of choice. First part of starter is self-explanatory. 
* the creator of the game doesn't necessarily to be set as the leader in game.

#### create/edit the profile
* you can also use the [D2BotLeadStagger](https://github.com/blizzhackers/documentation/blob/master/kolbot/MiscellaneousOptions.md/#staggered-delays-for-creating-games)- a staggered version of D2BotLead

![CreatorProfile](assets/kolbot-multibotCreatorProfile.png)

#### randomize the timers
```javascript
var StarterConfig = {
    MinGameTime: rand(150, 180), // Minimum game length in seconds. If a game is ended too soon, the rest of the time is waited in the lobby
    PingQuitDelay: rand(30, 40), // Time in seconds to wait in lobby after quitting due to high ping
    CreateGameDelay: rand(5, 15), // Seconds to wait before creating a new game
    ResetCount: 999, // Reset game count back to 1 every X games.
    CharacterDifference: 99, // Character level difference. Set to false to disable character difference.
    ChatActionsDelay: rand(2, 5), // Seconds to wait in lobby before entering a channel

    // ChannelConfig can override these options for individual profiles.
    JoinChannel: "", // Default channel. Can be an array of channels - ["channel 1", "channel 2"]
    FirstJoinMessage: "", // Default join message. Can be an array of messages
    AnnounceGames: false, // Default value
    AfterGameMessage: "", // Default message after a finished game. Can be an array of messages

    SwitchKeyDelay: rand(5, 15), // Seconds to wait before switching a used/banned key or after realm down
    CrashDelay: rand(60, 120), // Seconds to wait after a d2 window crash
    FTJDelay: rand(20, 30), // Seconds to wait after failing to create a game
    RealmDownDelay: rand(3, 7), // Minutes to wait after getting Realm Down message
    UnableToConnectDelay: rand(5, 10), // Minutes to wait after Unable To Connect message
    CDKeyInUseDelay: rand(5, 10), // Minutes to wait before connecting again if CD-Key is in use.
    ConnectingTimeout: rand(20, 30), // Seconds to wait before cancelling the 'Connecting...' screen
    PleaseWaitTimeout: rand(10, 20), // Seconds to wait before cancelling the 'Please Wait...' screen
    WaitInLineTimeout: rand(60, 90), // Seconds to wait before cancelling the 'Waiting in Line...' screen
    GameDoesNotExistTimeout: rand(30, 40) // Seconds to wait before cancelling the 'Game does not exist.' screen
};
```
* if you don't wanna join a chat channel, you don't have to edit anything more.
* the game creator can be also a manual played char, see [d2bs manual play](https://github.com/documentation/kolbot/ManualPlay.md/#manual-playing) page.


## joining games
There are different starter scripts for joining games:

* D2BotFollow.dbj - based on locally shared info between different profiles of the same d2bs manager

* D2BotChannel.dbj - based on info shared on chat channels

* D2BotPubJoin.dbj

### D2BotFollow
* joining chat channel isn't needed.
* the game name & password are shared locally through d2bs.

##### the joiners profiles

![follower1](https://github.com/blizzhackers/documentation/blob/master/kolbot/assets/kolbot-multibotFollower1Profile.png)
![follower2](https://github.com/blizzhackers/documentation/blob/master/kolbot/assets/kolbot-multibotFollower2Profile.png)

##### randomize the timers
replace the default lines 1-17 of [D2BotFollow.dbj](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/D2BotFollow.dbj) with these:
```javascript
var StarterConfig = {
    JoinChannel: "", // Name of the channel to join
    FirstJoinMessage: "", // Message to say when first joining a channel, usually ".login"
    ChatActionsDelay: rand(2, 7), // Seconds to wait in lobby before entering a channel

    JoinRetryDelay: rand(5, 15), // Time in seconds to wait before next join attempt
    SwitchKeyDelay: rand(5, 15), // Seconds to wait before switching a used/banned key or after realm down

    CrashDelay: rand(60, 120), // Seconds to wait after a d2 window crash
    RealmDownDelay: rand(3, 5), // Minutes to wait after getting Realm Down message
    UnableToConnectDelay: rand(2, 7), // Minutes to wait after Unable To Connect message
    CDKeyInUseDelay: rand(2, 7), // Minutes to wait before connecting again if CD-Key is in use. SwitchKeys overrides this!
    ConnectingTimeout: rand(20, 30), // Seconds to wait before cancelling the 'Connecting...' screen
    PleaseWaitTimeout: rand(30, 40), // Seconds to wait before cancelling the 'Please Wait...' screen
    WaitInLineTimeout: rand(60, 120), // Seconds to wait before cancelling the 'Waiting in Line...' screen
    GameDoesNotExistTimeout: rand(30, 60) // Seconds to wait before cancelling the 'Game does not exist.' screen
};
```

###### edit the joining info
use np++ to edit D2BotFollow.js and complete the JoinSettings and AdvancedConfig info

![D2BotFollow](https://github.com/blizzhackers/documentation/blob/master/kolbot/assets/kolbot-multibotD2BotFollow.png)


### D2BotChannel
* D2BotChannel, is used to join games from both channel announcements and friend list announcements. That means that you can use this starter when want to join games that are runned on other computer. 
* edit [D2BotChannel.dbj](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/D2BotChannel.dbj) with the required settings

* in this example we will join channel "MyChannel" and our first message will be "I'm from other dimension", in lines 2, 3 :
```javascript
	JoinChannel: "MyChannel", // Name of the channel to join
	FirstJoinMessage: "I'm from other dimension", // Message to say when first joining a channel, usually ".login"
```
* in lines 7, 8 we have to set what games we are seeking, in this example "FASTBAAL-", "csRun-", "Kolbot-Runs". If games have password we need to supply it, if not please leave it blank.
```javascript
	Games: ["FASTBAAL-", "csRun-", "Kolbot-Runs"], // List of games to look for. Example: Games: ["some baal-", "chaos run-"],
	Passwords: ["", "password", "otherpassword"], // List of game passwords. Each array in Games array should have a matching element in Passwords. Use "" for blank pw.
```
* to use friend list you need to set a delay between retries in seconds, to disable it set to "0".

* from line 26 to 53 we have an example of advanced settings

## team games
Note: the game creator isn't necessarily to be set as the leader in game.

you have to complete these fields for your leechers/helpers/followers
```
	Config.Leader = "xXxX"; // Leader's ingame character name.
	Config.QuitList = ["xXxX"]; // List of character names to quit with.
```


### using MFTeam

* script allows multiple characters to do the same boss/area runs in sync.
* the leader will open a town portal and give commands to the helpers. Because it uses town portals, it's possible for walking characters to run the same bosses as teleporting characters.
* in case of clearing, MFHelper will do the area clearing on his own, independent from leader.
* unfortunately the commands are based on d2 server chat, so the leader key can be muted. To avoid these, check the [local chat](https://github.com/blizzhackers/documentation/kolbot/CharacterConfig.md/#local-chat) section. Choose mode 1, or 2 if you are playing also manually.
```javascript
		Config.LocalChat.Enabled = true; // enable the LocalChat system
		Config.LocalChat.Mode = 1; // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
```

#### MFLeader
* in the leader config you have to set
```javascript
    // Team MF system
    Config.MFLeader = true; // Set to true if you have one or more MFHelpers. Opens TP and gives commands when doing normal MF runs.
```
and to enable the scripts you wanna run.

#### MFHelper
* the helper needs to have as the only running script
```javascript
    Scripts.MFHelper = true; // Run the same MF run as the MFLeader.
```
* the MFHelper script will end if the leader enters in Chaos Sanctuary or Throne of Destruction, because it's better to run the related DiabloHelper or BaalHelper after the MFHelper script.

### using Followers
* the leader can be played manually with Manual.js(the whole config should be loaded and also the LocalChat - see [manual play](https://github.com/blizzhackers-d2/documentation/blob/master/kolbot/ManualPlay.md/#manualjs)
* you should use the [local chat](https://github.com/blizzhackers/documentation/blob/master/kolbot/CharacterConfig.md/#local-chat) with the settings
```javascript
		Config.LocalChat.Enabled = true; // enable the LocalChat system
		Config.LocalChat.Mode = 2; // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
```
* the follower characters need only this line to be activated:
```javascript
    Scripts.Follower = true; // Script that follows a manually played leader around like a merc. For a list of commands, see Follower.js
```
* the leeching section should be completed
```
	Config.Leader = "MyLeader"; // Leader's ingame character name. Leave blank to try auto-detection (works in AutoBaal, Wakka, MFHelper)
	Config.QuitList = ["MyLeader"]; // List of character names to quit with. Example: Config.QuitList = ["MySorc", "MyDin"];
	Config.QuitListMode = 0; // 0 = use character names; 1 = use profile names (all profiles must run on the same computer).
	Config.QuitListDelay = [x, y]; // Quit the game with random delay in case of using Config.QuitList. Example: Config.QuitListDelay = [1, 10]; will exit with random delay between 1 and 10 seconds.
```
* Follower.js is using chat commands like: 1, 2, wp, bo, ... and you can find the full list on [3rd-46th lines of Follower.js](https://github.com/blizzhackers-d2/d2bot-with-kolbot/blob/master/d2bs/kolbot/libs/bots/Follower.js#L3-L46)
* the alternative is a semi-automated [silenced Follower](https://github.com/blizzhackers-d2/documentation/blob/master/kolbot/MiscellaneousOptions.md/#silenced-follower) which have nice addons.

### followers exit delays

To avoid issues like "Please Wait" when you quit the game with all chars at the same time, you should set diferent delays for followers to exit game

This was already merged in the main [d2bot-with-kolbot repository](https://github.com/blizzhackers/kolbot/commit/900eb9aeeeabff9a9d270cac4aa3692df2779350) and you should check the related char config section and to add the required time intervals for each follower.
```javascript
	Config.QuitListDelay = []; // Quit the game with random delay in case of using Config.QuitList. Example: Config.QuitListDelay = [1, 10]; will exit with random delay between 1 and 10 seconds.
```
So for different followers you can set different values:
```javascript
Config.QuitListDelay = [3, 5];

Config.QuitListDelay = [5, 7];

Config.QuitListDelay = [7, 9];
```

### dia-baal teams
* leader and leechers can have other scripts activated before Diablo, or Baal, in the same areas using MFTeam, or separated areas on their own.
* order for the scripts is top to bottom in character configuration file. To facilitate the meeting on the same time you can cut and paste the scripts, mixing the default order to get that scope.
* leader will run the main scripts Diablo.js and Baal.js
* leecher will have DiabloHelper and BaalHelper activated (true).