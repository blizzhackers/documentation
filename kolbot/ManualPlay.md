[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Manual Playing

---

* [Info](#info)
* [D2BotMap](#d2botmap)
* [Multi Loader](#multi-loader)
* [Manual Misc Script](#manualjs)
* [Using Followers](#using-followers)

---

## info

* [d2bs](https://github.com/blizzhackers/kolbot) allows manual playing

## multi loader

* use these parameters in the profile, and no script will be loaded.
```
	-L -w
```

## D2BotMap

1. it's a starter script for manual play.
2. you have to manually login into account and create or join game.
3. it gives you some improvements like:

	* reveals map
	* loads character config
	* shows ping
	* shows game time
	* displays IP
	* shows vectors/area names/shrines/monsters/items
	* with numpad key 0 - goes to next area
	* with numpad key 1 - goes to previous area
	* with numpad key 2 - goes to wp and grab it (if possible)
	* with numpad key 3 - goes to point of interest (if possible)
	* with numpad key 4 - goes to side area (if possible)
	* with numpad key (5 - 8) - goes to point of interest (if possible)
	* with shift < - goes to previous act (if possible)
	* with shift > - goes to next act (if possible)
	* with key 5 - (in town will go to healer)(out of town it will make a portal if possible)
	* with key 6 - (in town will open stash)(out of town it will go to town if possible)
	* with key 7 - disables item filter
	* with key 8 - disables vectors
	* with key 9 - disables vectors
	* with numpad key - (toggle item filter between default and custom)
	* with alt key while hovering over item will - (move item to next location)(stash <-> inventory)(cube <-> inventory)
	(tradescreen <-> inventory)(inventory -> sell to npc in menu)
	* chat commands, to see available commands type .help into chat to display a clickable menu

![D2BotMap](assets/kolbot-manualplayD2BotMapEx1.jpg)

# D2BotMap help menu
![D2BotMap](assets/kolbot-manualplayD2BotMapEx2.jpg)


## Manual.js

1. it's another script written by [@Laz](https://github.com/laztheripper) for manual play, with description in this saved [html file](assets/ManualPlayScriptWithPacketSniffingToolsAndMore.html) or [pdf format](https://github.com/blizzhackers/bhfiles/blob/master/pdf%20saved%20pages/d2bs%20script%20development/Manual%20play%20script%20with%20packet%20sniffing%20tools%20and%20more.pdf). 
2. How to use (from bh topic):
	* copy the script [Manual.js](https://raw.githubusercontent.com/blizzhackers/documentation/master/kolbot/custom-scripts/Manual.js) and save it as ...\libs\bots\Manual.js
	* in your character's config add "Scripts.Manual = true;" (that can be near the line "Scripts.Follower = ...")
	* use D2BotBlank.dbj as starter script(entry point) for the profile.
	* in d2bs.ini (located in ...\kolbot\d2bs) you should set "UseGamePrint=true", otherwise you won't see anything useful in game.

![Manual.js](assets/kolbot-manualplayMiscScript.jpg)

3. if you wanna view maps + monsters while you are pressing < ALT > key you have to search to the line 727 of kolbot\tools\MapThread.js and to remove the 0x0D code. After that line is looking:
```javascript
        hideFlags = [0x09, 0x0C, 0x01, 0x02, 0x0F, 0x18, 0x19, 0x21];
```

## using followers

you can run your leader and to have up to other 7 followers in your game.
check [multibotting - joining games](https://github.com/blizzhackers/documentation/blob/master/kolbot/MultiBotting.md/#joining-games)
