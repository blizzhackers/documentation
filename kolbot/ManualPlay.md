[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Manual Playing

---

* [Info](#info)
* [D2BotMap](#d2botmap)
* [Manual Misc Script](#manualjs)
* [Using Followers](#using-followers)

---

## info

* [d2bs](https://github.com/kolton/d2bot-with-kolbot) allows manual playing

## multi loader

* use these parameters in the profile, and no script will be loaded.
```
	-L -w
```

## D2BotMap

1. it's a starter script for manual play.
1. you have to manually login into account and create or join game.
1. it gives you some improvements like:

* reveals map
* loads chicken/potion/fastmod from character config
* shows ping
* shows game time
* shows vectors
* displays IP
* with numpad key 0 - goes to next area
* with numpad key 1 - goes to previous area
* with numpad key 2 - goes to wp and grab it (if possible)
* with numpad key 3 - goes to boss from quest (if possible)
* with numpad key 7 - disables monsters
* with numpad key 8 - disables vectors

1. to see all details properly, change the resolution to 800x600 in game settings!

![D2BotMap](assets/kolbot-manualplayD2BotMap.jpg)

1. if you wanna view maps + monsters while you are pressing < ALT > key you have to search to the line 727 of kolbot\tools\MapThread.js and to remove the 0x0D code. After that line is looking:
```javascript
        hideFlags = [0x09, 0x0C, 0x01, 0x02, 0x0F, 0x18, 0x19, 0x21];
```

## Manual.js

1. it's another script for manual play with description in this saved [html file](assets/ManualPlayScriptWithPacketSniffingToolsAndMore.html). 
1. How to use (from bh topic):
* copy the code from [@Laz](https://github.com/laztheripper) - [pull-request](https://github.com/kolton/d2bot-with-kolbot/pull/370) or from  [here](https://github.com/laztheripper/d2bot-with-kolbot/blob/03173c86829f22a17ccef8a481f1a6a0e429f081/d2bs/kolbot/libs/bots/Manual.js), and save it in a new file named "Manual.js" in "libs/bots" folder
* in your character's config add "Scripts.Manual = true;"
* use d2botblank as starter/entry point/.dbj for the profile.
* in d2bs.ini (located in kolbot/d2bs) set "UseGamePrint=true", otherwise you won't see anything useful ingame.

![Manual.js](assets/kolbot-manualplayMiscScript.jpg)

1. if you wanna view maps + monsters while you are pressing < ALT > key you have to search to the line 727 of kolbot\tools\MapThread.js and to remove the 0x0D code. After that line is looking:
```javascript
        hideFlags = [0x09, 0x0C, 0x01, 0x02, 0x0F, 0x18, 0x19, 0x21];
```

## using followers

you can run your leader and to have up to other 7 followers in your game.
check [multi-botting](https://github.com/blizzhackers/documentation/blob/master/kolbot/MultiBotting.md/#multi-botting)
