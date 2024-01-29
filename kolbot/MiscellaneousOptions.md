[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Miscellaneous Options

---

* [local chat](#local-chat)
* [updated Autosmurf](#updated-Autosmurf)
* [Autochaos](#Autochaos)
* [modded BattleOrders.js](#modded-BattleOrdersjs)
* [how to define your own party and permit hardcore loot corpses](#how-to-define-your-own-party-and-permit-hardcore-loot-corpses)
* [Baal.js with adds for hdin on wave 2](#Baaljs-with-adds-for-hdin-on-wave-2)
* [staggered delays for creating games](#staggered-delays-for-creating-games)
* [picking and selling junk items](#picking-and-selling-junk-items)
* [picking and selling valuable items](#picking-and-selling-valuable-items)
* [opening all chests](#opening-all-chests)
* [open chests only from specific areas](#open-chests-only-from-specific-areas)
* [silenced Follower](#silenced-Follower)
* [LifeChicken restart profile](#lifechicken-restart-profile)
* [use Cain and sell items](#use-Cain-and-sell-items)
* [sell cubing items](#sell-cubing-items)
* [inventory full](#inventory-full)
* [cubing all kind of gems](#cubing-all-kind-of-gems)
* [Taiwan disclaimer](#taiwan-disclaimer)
* [Diabase & D2BS](#Diabase--D2BS)
* [silencing the scripts](#silencing-the-scripts)

---

## local chat

* [@noah-](https://github.com/noah-) added in the char configuration files the options:
	```javascript
		// Public game options

		// If LocalChat is enabled, chat can be sent via 'sendCopyData' instead of BNET
		// To allow 'say' to use BNET, use 'say("msg", true)', the 2nd parameter will force BNET
		// LocalChat messages will only be visible on clients running on the same PC
		Config.LocalChat.Enabled = true; // enable the LocalChat system
		Config.LocalChat.Toggle = false; // optional, set to KEY value to toggle through modes 0, 1, 2
		Config.LocalChat.Mode = 2; // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
	```
* MFTeam is ok with LocalChat in mode 1
* [Manual played leader and Follower.js](https://github.com/blizzhackers/documentation/blob/master/kolbot/MultiBotting.md/#using-followers) - LocalChat in mode 2

## updated Autosmurf
* **!!! Autosmurf is outdated and no longer maintained - Feel free to fork and update it otherwise check out [Horde](https://github.com/Adpist/horde) (not a blizzhackers project)**
* [@Dark-f](https://github.com/Dark-f/) updated the [JeanMax/AutoSmurf](https://github.com/JeanMax/AutoSmurf)
	- the files can be found on https://github.com/blizzhackers/autosmurf repository
	- check this @Dark-f video https://www.youtube.com/watch?v=rTXM9szlIdw

## sonic
* Autoleveling sorceress script <https://github.com/blizzhackers/kolbot-sonic/>
	- the description can be found on https://github.com/blizzhackers/kolbot-sonic/blob/master/SetupSonic.md/#sonic-setup
	- it is a modified version of d2bs for sorceress chars, so check D2BotSonic.dbj starter script, config files ...\libs\config\Sorceress.js and ...\libs\config\Builds\Sorceress.Sonic.js 
	- it have its modified files in ...\kolbot\libs\sonic\

## Autochaos
* by [@noah-](https://github.com/noah-), without explicit communication in game.
* https://gist.github.com/noah-/2685fbeccc72fd595bbe89116aea272e
* check also the comments there
* you can post the results on discord [#testing channel](https://discordapp.com/channels/430522386253611018/430534815549358080)

## modded BattleOrders.js
* if you want to use this feature, copy the required character configuration lines from [18-20 of .../libs/config/_BaseConfigFile.js](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/config/_BaseConfigFile.js#L18-L20), which could become a place to have all additional options, in order to simplify the character Class.js files.

* barbarian will go to the waypoint of your choosing and bo anyone that is nearby, no matter if they have bo state or not. It will go back to town if monsters come close to the boer. It will go back to town and visit a healer NPC if it's mana gets below a set percentage then return to continue giving bo.

* barbarian config file:
	```javascript
 	Scripts.BoBarbHelper = true; // specific HC script with BoBarb on the Bo area during whole game
		Config.BoBarbHelper.Mode = 0; // 0 = give BO, -1  = disabled
		Config.BoBarbHelper.Wp = 35; // 35 = Catacombs level 2
	```
	* in barbarian config Config.QuitList = ["..."]; should be completed.
* other chars who need getting bo, should be moved in BO area by adding in the running area scripts, depending of the lower value between BC-BO-Shout skill duration of the barbarian helper:
	```javascript
			Pather.useWaypoint(35, true); // go to BO area
			Pather.moveTo(me.x + 5, me.y + 5, 5, true);
			delay(3000);
	```

## how to define your own party and permit hardcore loot corpses
* It is a public mode when your players invite and accept other players invites, only if their names are in your previously configured MyOwnParty list

* in char config file, look to the // Public game options section and you have to add (line Config.PublicMode is already there, so add only options 4 and 5 (use 4 only for char who's opening the game, and 5 for the others)
	```javascript
		Config.PublicMode = 4; // 1 = invite and accept, 2 = accept only, 3 = invite only, 4 = MyOwnParty invite, 5 = MyOwnParty accept, 0 = disable
		Config.MyOwnParty = []; // ["MyPlayer1", "MyPlayer2", "MyPlayer3"]
	```

* in ... libs\common\Config.js before line 161 DeathMessages add
	```javascript
		MyOwnParty: [],
	```
* and complete the same list on every char config that you will add in your team game, including all charnames.
    Config.MyOwnParty = ["MyPlayer1", "MyPlayer2", "MyPlayer3", "MyPlayer4"];

* check the changes in [modded Party.js](https://raw.githubusercontent.com/blizzhackers/documentation/master/kolbot/custom-scripts/Party.js) and replace the content of default Party.js, or make the following changes:
	* in ... \threads\Party.js add after [default SVN line 143](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/tools/Party.js#L143) the cases 4 and 5
```javascript
case 4: // MyOwnParty invite
	if (Config.MyOwnParty.indexOf(player.name) === -1) {
		break;
	}

	if (Config.MyOwnParty.length > 0) {
		var i;

		for (i = 0; i < Config.MyOwnParty.length; i += 1) {
			if (player.name == Config.MyOwnParty[i] && player.name !== me.name) {
				if (player.partyflag !== 4 && player.partyflag !== 2 && player.partyid === 65535) {
					clickParty(player, 2);

					if (me.playertype == 1) { // hardcore permit loot of leader to other char who is invited in the party
						clickParty(player, 0);
					}

					delay(500);
				}
			}
		}

	} else if (Config.MyOwnParty.length === 0 || Config.MyOwnParty.length === undefined) {
		Config.PublicMode = 1;
	}

	break;
case 5: // MyOwnParty accept
	if (Config.MyOwnParty.indexOf(player.name) === -1) {
		break;
	}

	if (Config.MyOwnParty.length > 0) {
		var i;								

		for (i = 0; i < Config.MyOwnParty.length; i += 1) {
			if (player.name == Config.MyOwnParty[i] && player.name !== me.name) {
				if (player.partyflag === 2) {
					clickParty(player, 2);

					if (me.playertype == 1) { // hardcore permit loot to leader
						clickParty(player, 0);
						loot.push(player.name);
					}

					delay(500);
				}

				if (loot.indexOf(player.name) === -1 && me.playertype == 1) { // hardcore permit loot to other chars
					clickParty(player, 0);
					loot.push(player.name);
					delay(500);
				}
			}
		}

	} else if (Config.MyOwnParty.length === 0 || Config.MyOwnParty.length === "undefined") {
		Config.PublicMode = 2;
	}

	break;
```
* in ... \threads\Party.js change [default line 122](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/threads/Party.js#L122C3-L122C14) with:
```javascript
if (Config.PublicMode === 4 || Config.PublicMode === 5) {
  console.log("ÿc2Party thread loaded. ÿc0Mode: ÿc2MyOwnParty - " + ((Config.PublicMode === 5) ? "Accept" : "Invite"));
} else {
  console.log("ÿc2Party thread loaded. ÿc0Mode: ÿc2" + (Config.PublicMode === 2 ? "Accept" : "Invite"));
}
```
* in ... \threads\Party.js add after [the default line 56](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/tools/Party.js#L56) with:
```javascript
case 0x00: // "%Name1(%Name2) dropped due to time out."
case 0x01: // "%Name1(%Name2) dropped due to errors."
case 0x03: // "%Name1(%Name2) left our world. Diablo's minions weaken."
	if (me.playertype == 1 && loot.indexOf(name1) > -1) { // hardcore leaving char is removed from loot 
		loot.splice(loot.indexOf(name1), 1);
	}

	break;
```
* in ... \threads\Party.js change [the default line 22](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/tools/Party.js#L22) with:
```javascript
	partyTick = getTickCount(),
	loot = [];
```

* there should be added infinite loops to stop dead HC player from other actions which will end the game because of errors, like in the case of Follower.js
```javascript
if (me.playertype == 1 && me.mode === 17) { // stop the HC screen to allow the loot of dead player
		while(true) {
				delay(6e5);
		}
}
```
* Notes:
	* on reload Chat/console in-game command, the permit loot become off for all other players because loot list is lost, but 2nd reload will swith the permit loot to on.
	* the players, which are permitted to loot a hardcore player corpse, can get the equipped items back, but the mercenary stuff is lost, and also lost are the items located in inventory and stash.
	* to implement the recovery of loot stuff on automatic bot characters there should be added more changes in the libs scripts. With low hp chicken values on high ping games maybe there will be errors to get the death when game is left, so the recovery can't be done.

## Baal.js with adds for hdin on wave 2

* https://pastebin.com/mnqySRqF copy and paste the text, replacing the content of ...\libs\bots\Baal.js file.
* the adds for pala hdin consist in an extra function for wave 2 (without having the Nature's Peace ring, which is making this unnecessary). You have to set in hdin config file for wave 2

```javascript
	Config.AttackSkill[5] = 97; // Secondary skill if monster is immune to primary.
	Config.AttackSkill[6] = 113; // Secondary aura.
```

* try to have Holy Shield at max points, and hdin Smite dmg will be around 1.8-2 k physical dmg with concentration aura, which will increase also the mercenary's dmg.

## staggered delays for creating games
* For running more solo bots(game creators) you should bypass the 2 min d2 server restriction for consecutive creation of games/same IP.

* Note: apply it only if you run more game creator bots, and test first without it, someone on discord is saying that it isn't required the staggering like in the previous ladder season.

* a staggered version of ...\d2bs\kolbot\D2BotLead.dbj  https://pastebin.com/u02RH1C2 or [D2BotLeadStagger.dbj on github](https://raw.githubusercontent.com/blizzhackers/documentation/master/kolbot/custom-scripts/D2BotLeadStagger.dbj)
* copy and paste the text, and save it ...\kolbot\D2BotLeadStagger.dbj

* this will create ...\logs\gameStagger.txt file and you'll see a message in status "Lobby - stagger time: (...s)" if the stagger delay wasn't reached.
* in case of errors or too high values shown on d2bs status line, delete the gameStagger.txt and it will be written again.

* staggerDelay was set to random value 120 - 130 sec (line 360), and CreateGameDelay to random value 10-15 sec (line 8)

## picking and selling junk items

* if your low bot need gold, you should activate the picking of junk items.
* if total gold is less than Config.LowGold value pick up anything worth 10 gold per square to sell in town.

* you should add in the char configuration file:
	```javascript
	Config.LowGold = 200000 // any low item with 10 gold per square will be picked and sold to NPC until me.gold < Config.LowGold
	```
that variable is already defined in Config.js (line 138, where it is set to 0), and it is used in [Pickit.js line 64](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/common/Pickit.js#L64) and [Town.js line 526](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/common/Town.js#L526)

you could comment the [line 58 from Town.js](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/common/Town.js#L58) , in order to pick the [throwing potions](http://classic.battle.net/diablo2exp/items/potions.shtml)
```javascript
	//38, // Missile Potion
```
* if you don't wanna pick arrows/bolts you should increase the value **10** from [line 73 of Pickit.js](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/common/Pickit.js#L73) to any other value like 15 or 20.

## picking and selling valuable items

* if your bot need gold, to gamble more often, you should set the picking of valuable items including white ones, which worth more than 2k gold (customizable) / square.
* add in the character configuration file:
	```javascript
	Config.PickValuableItems = true; // pick everything worth > 2k gold/square
	```
* add after [ line 165 (LowGold) in ... libs\core\Config.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Config.js#L165):
	```javascript
	LowGold: 0,
	PickValuableItems: false, // <--- add this
	```
* replace lines 306-324 [lines 306-324 in Pickit.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Pickit.js#L306-L324):
	```javascript
	// pick valuable items which worth more than 2k gold/square to sell in town, if Config.PickValuableItems = true.
	const dontSell = [
		557, 558, 559, 560, 561, 562, 563, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573, 574, 575, 576, 577,
		578,579, 580, 581, 582, 583, 584, 585, 586, 597, 598, 599, 600, 601, // gems
		610, 611, 612, 613, 614, 615, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625, 626, 627, 628, 629, 630,
		631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642 // runes
	];

	if (rval.result === Pickit.Result.UNWANTED
		&& !Town.ignoreType(unit.itemType)
		&& !unit.questItem
		&& (
			(unit.isInInventory && (me.inTown || !Config.FieldID.Enabled))
			|| (
				Config.PickValuableItems
				&& dontSell.indexOf(unit.classid) === -1
				&& unit.getItemCost(sdk.items.cost.ToSell) / (unit.sizex * unit.sizey) >= 2000
			)
			|| me.gold < Config.LowGold
			|| (me.gold < 500000 && Config.PickitFiles.length === 0)
			)
		)) {
			// Gold doesn't take up room, just pick it up
			if (unit.classid === sdk.items.Gold) return resultObj(Pickit.Result.TRASH);

			if (!this.invoLocked) {
				const itemValue = unit.getItemCost(sdk.items.cost.ToSell);
				const itemValuePerSquare = itemValue / (unit.sizex * unit.sizey);

				if (itemValuePerSquare >= 2000) {
					// If total gold is less than 500k pick up anything worth 2k gold per square to sell in town.
					return resultObj(Pickit.Result.TRASH, "Valuable LowGold Item: " + itemValue);
				} else if (itemValuePerSquare >= 10) {
					// If total gold is less than LowGold setting pick up anything worth 10 gold per square to sell in town.
					return resultObj(Pickit.Result.TRASH, "LowGold Item: " + itemValue);
				}
			}
		}
	```
* note that the 9th line is customizable, adding only the value of the item (like 5k gold) or a mixed line with previous example (2k gold/square):

	```javascript
	&& (unit.getItemCost(sdk.items.cost.ToSell) >= 5e3 || (unit.getItemCost(sdk.items.cost.ToSell) / (unit.sizex * unit.sizey) >= 2000))
	```
* maybe the npc town visit will be more often, but large amounts of gold will be get faster.

## opening all chests
* if you want to open all chests during clearing, set in char configuration file
	```javascript
	Config.OpenChests.Enabled = true;
	Config.OpenChests.Types = ["all"];
	```
* add the changes to Attack.js, so line [1213 from Attack.js@openChests](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Attack.js#L1213) 
	```javascript
	ids = ["chest", "chest3", "weaponrack", "armorstand"];
	```
will be changed to:
```javascript
if (Config.OpenChests.Types.some((el) => el.toLowerCase() === "all")) {
	ids = [
		"chest", "loose rock", "hidden stash", "loose boulder", "corpseonstick",
		"casket", "armorstand", "weaponrack", "barrel", "holeanim", "tomb2",
		"tomb3", "roguecorpse", "ratnest", "corpse", "goo pile", "largeurn",
		"urn", "chest3", "jug", "skeleton", "guardcorpse", "sarcophagus", "object2",
		"cocoon", "basket", "stash", "hollow log", "hungskeleton", "pillar",
		"skullpile", "skull pile", "jar3", "jar2", "jar1", "bonechest", "woodchestl",
		"woodchestr", "barrel wilderness", "burialchestr", "burialchestl", "explodingchest",
		"chestl", "chestr", "groundtomb", "icecavejar1", "icecavejar2",
		"icecavejar3", "icecavejar4", "deadperson", "deadperson2", "evilurn", "tomb1l", "tomb3l", "groundtombl"
	];
} else {
	ids = ["chest", "chest3", "weaponrack", "armorstand"];
}
```

## open chests only from specific areas

1. in char config you should set:
```javascript
Config.OpenChests.Enabled = true; // Open chests. Controls key buying.
```

2. add in [Misc.js before default line 988](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/common/Misc.js#L988) '    shrineStates: false,'  (and feel free to add any other area where you wanna open chests, using sdk\areas.txt) :
```javascript
// open chests only from these areas -> Pather.popChests
openAreaChests: function (area) {
	if (!area) {
		area = me.area;
	}

	switch (area) {
	case  79: // Lower Kurast
	case 102: // Durance Of Hate Level 3
		return true;
	}

	return false;
},
```

3. [Pather.js@NodeAction@popChests](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Pather.js#L83) should be:
```javascript
if (!!Config.OpenChests.Enabled && Misc.openAreaChests()) {
```

4. [Attack.js@openChests](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Attack.js#L1208) should be:
```javascript
Config.OpenChests.Enabled && Misc.openAreaChests() && Misc.openChests(Config.OpenChests.Range);
```

## silenced Follower
* reason = to avoid the muting of keys. 
* thanks to [@noah-](https://github.com/noah-), if you set the LocalChat on mode 2, you should no worry about d2 server chat.

* the default script ...\d2bs\kolbot\libs\scripts\Follower.js is a wonderful written script, but it was working only by using chat commands to move to leader position, take portals, ...

* without the LocalChat active in mode 2, the follower reporting have to be silenced changing **say(** with **print(** or me.overhead (server side function of d2bs, other players don't see that).
* the default Follower.js has set town activities only with command, and in the case of silenced it was changed to do town activities at the start of the game and just after every leader move to town. Cain can be used to identify items, but before setting that check the [section related](#use-cain-and-sell-items), below.

* [FolowerSilent on gist](https://gist.github.com/mf022/d952e12bc89248a242c3868f2323b74a) or [FollowerSilent.js on github](https://raw.githubusercontent.com/blizzhackers/documentation/master/kolbot/custom-scripts/FollowerSilent.js) - copy and paste the text (or download that paste), in a new file ...\scripts\FollowerSilent.js.
This modded script has some adds, check the top of it. And you should add a new line in the character configuration file:
```javascript
Scripts.FollowerSilent = true; // a custom automated Follower.js
```

## LifeChicken restart profile
* by default LifeChicken will exit game
* if you wanna close d2 window (like the d2nt method) instead exiting game, you should think about restarting the current d2bot profile:

	* add in [Config.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Config.js#L130):
	```javascript
	LifeChicken: 0,
	LifeChickenRestart: false, // <--- add this
	```

	* add in char config file:
	```javascript
	Config.LifeChickenRestart = true; // Restart profile if LifeChicken is activated
	```

	* in [libs/core/Common/Tools.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Common/Tools.js#L123) add on line after `Config.LogExperience && Experience.log();`:
	```javascript
	Config.LifeChickenRestart && D2Bot.restart();
	```

## use Cain and sell items
* the item identifying on Cain will end with dropping the unwanted items by default. That was the reason to add a variable with minimum gold, just under the enabling ID at Cain.

* add in the character configuration file in Cain section:
	```javascript
	Config.CainID.Drop = false; // drop items identified at Cain
	```
* set a lower gold limit for using Cain, like 100.000 or 0:
	```javascript
	Config.CainID.MinGold = 0; // Minimum gold (stash + character) to have in order to use Cain.
	```
* [line 181 (CainID.Enable) in ... libs\core\Config.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Config.js#L181):
	```javascript
	CainID: {
		Enable: false,
		MinGold: 0,
		MinUnids: 0,
		Drop: false, // <--- add this
	},
	```
* change the [lines 890-894 in ...\libs\core\Town.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Town.js#L890C7-L894C15) with:
	```javascript
	case Pickit.Result.UNWANTED:
		if (!Config.CainID.Drop) {
			Item.logger("Sold", item, "cainID");
			Town.initNPC("Shop", "clearInventory");
			item.sell();
		} else {
			Item.logger("Dropped", item, "cainID");
			item.drop();
		}

		break;
	```

## sell cubing items
by default the cubing items will be dropped if them not meet the condition to be kept. You should replace [the default lines 1100-1104 from Cubing.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Cubing.js#L1100-L1104) with:
```javascript
case Pickit.Result.UNWANTED:
	Item.logger("Sell", cubeItem, "doCubing");
	Town.initNPC("Shop", "clearInventory");
	cubeItem.sell();

	break;
```
* if you get warnings/errors after the cubing is done, you should revert those lines to default.

## inventory full
* If you don't wanna to set the [Automule](https://github.com/blizzhackers/documentation/blob/master/kolbot/Automule.md/#automule) option, or you don't have too many d2/lod keys to do that, you can set the stop of the profile.
* again, some old etal users may need this function.

* add in char configuration file (at the end of General config section, ~ line 400), a new variable:
	```javascript
	Config.InventoryFull = true; // stop profile if inventory full
	```

* then edit Config.js and add after line ~ 204
	```javascript
	InventoryFull: false,
	```

* finally, look for the default [line 657 from Pickit.js](https://github.com/blizzhackers/kolbot/blob/69b48b27bb6b4b437edf7d3873a41cbbca09f6e7/d2bs/kolbot/libs/core/Pickit.js#L657) and change it to:
	```javascript
	// Town visit failed - abort
	console.warn("Failed to visit town. ÿc7Not enough room for " + Item.color(_item) + _item.name);

	if (Config.InventoryFull) {
		D2Bot.printToConsole("Inventory Full. game: " + me.gamename + "char: " + me.account + " - " + me.name, 6);
		D2Bot.stop(me.profile, true);
	}

	return false;
	```

## cubing all kind of gems
* if you wanna a bot from your team to cube all the gems found, you can add some changes:
* in the special pickit file for that char, you can have only the perfect gem lines
	```javascript
	[name] == perfectamethyst
	[name] == perfectdiamond
	[name] == perfectemerald
	[name] == perfectruby
	[name] == perfectsapphire
	[name] == perfecttopaz
	[name] == perfectskull
	```

* in character configuration file should be added in the cubing config section (default lines ~320-326 have the cubing of the flawless to perfect gems):
	```javascript
	// Ingredients for the following recipes will be auto-picked, for classids check libs/core/GameData/NTItemAlias.js

  Config.Recipes.push([Recipe.Gem, "Flawed Amethyst"]); // make Flawed Amethyst
  Config.Recipes.push([Recipe.Gem, "Flawed Topaz"]); // make Flawed Topaz
  Config.Recipes.push([Recipe.Gem, "Flawed Sapphire"]); // make Flawed Sapphire
  Config.Recipes.push([Recipe.Gem, "Flawed Emerald"]); // make Flawed Emerald
  Config.Recipes.push([Recipe.Gem, "Flawed Ruby"]); // make Flawed Ruby
  Config.Recipes.push([Recipe.Gem, "Flawed Diamond"]); // make Flawed Diamond
  Config.Recipes.push([Recipe.Gem, "Flawed Skull"]); // make Flawed Skull

  Config.Recipes.push([Recipe.Gem, "Amethyst"]); // make Amethyst
  Config.Recipes.push([Recipe.Gem, "Topaz"]); // make Topaz
  Config.Recipes.push([Recipe.Gem, "Sapphire"]); // make Sapphire
  Config.Recipes.push([Recipe.Gem, "Emerald"]); // make Emerald
  Config.Recipes.push([Recipe.Gem, "Ruby"]); // make Ruby
  Config.Recipes.push([Recipe.Gem, "Diamond"]); // make Diamond
  Config.Recipes.push([Recipe.Gem, "Skull"]); // make Skull

  Config.Recipes.push([Recipe.Gem, "Flawless Amethyst"]); // make Flawless Amethyst
  Config.Recipes.push([Recipe.Gem, "Flawless Topaz"]); // make Flawless Topaz
  Config.Recipes.push([Recipe.Gem, "Flawless Sapphire"]); // make Flawless Sapphire
  Config.Recipes.push([Recipe.Gem, "Flawless Emerald"]); // make Flawless Emerald
  Config.Recipes.push([Recipe.Gem, "Flawless Ruby"]); // make Flawless Ruby
  Config.Recipes.push([Recipe.Gem, "Flawless Diamond"]); // make Flawless Diamond
  Config.Recipes.push([Recipe.Gem, "Flawless Skull"]); // make Flawless Skull

  Config.Recipes.push([Recipe.Gem, "Perfect Amethyst"]); // Make Perfect Amethyst
  Config.Recipes.push([Recipe.Gem, "Perfect Topaz"]); // Make Perfect Topaz
  Config.Recipes.push([Recipe.Gem, "Perfect Sapphire"]); // Make Perfect Sapphire
  Config.Recipes.push([Recipe.Gem, "Perfect Emerald"]); // Make Perfect Emerald
  Config.Recipes.push([Recipe.Gem, "Perfect Ruby"]); // Make Perfect Ruby
  Config.Recipes.push([Recipe.Gem, "Perfect Diamond"]); // Make Perfect Diamond
  Config.Recipes.push([Recipe.Gem, "Perfect Skull"]); // Make Perfect Skull
	```

* if picking a lot of gems will highly increase the number of the lines in d2bs manager item log tab, check the proper settings in the **// Manager Item Log Screen** section from character config file


## Taiwan Disclaimer
* in Taiwan region ![this taiwan disclaimer](assets/kolbot-taiwan-disclaimer.png) blocks the d2 start.
* install https://www.autoitscript.com/site/autoit/downloads/
* check their documentation
* edit a new script in notepad++ (thanks to [Mercoory](https://github.com/Mercoory) + [emily785](https://github.com/emily785) - [posts](https://github.com/kolton/d2bot-with-kolbot/issues/1946#issuecomment-551206448):
```
While 1
	If WinExists("Taiwan Legal Disclaimer") Then
		WinWaitActive("Taiwan Legal Disclaimer")
		Send("{ENTER}")
	EndIf
	Sleep(1000)
WEnd
```
* save the script as TaiwanDisclaimer.au3
* run Autoit with administrative privileges


## Diabase & D2BS
[@Ned](https://github.com/Nedkali/) added some changes to Diabase to work with D2BS

* download using SVN Checkout... -> (https://github.com/Nedkali/DiaBaseV1/trunk)
* create a subfolder ...\d2bs\kolbot\MuleInventory\
* you have the option to not use the Diabase function which overwrite the files, using Utilities > Verify logging files, and it's enough to replace the default libs\MuleLogger.js with [Mulelogger on gist](https://gist.github.com/mf022/a0ee6d71d071dc45635650cef4bc8afd) - which will create the both log files for the default D2BS Char Viewer (in mules\realm\account) and Diabase(in MuleInventory\).

## silencing the scripts
**me.overhead** command in d2bs is displayed only on client side, like the **print** command, too. Nobody in the same game cannot see those messages. Those are different than server chat messages starting with **!** symbol.
Some of d2bot-with-kolbot scripts aren't silenced by default, and in some cases like MFTeam, SealLeader/Leecher, Follower.js, a.s.o.  the functionality is made through chat expressions.

1. **if you are worried about server chat filter**, you can **set** [**Local Chat**](#local-chat) **true** and **mode 1** or **2**. Setting mode 1 in the case of MFTeam or SealLeader/Leecher, or mode 2 in the case of Followers.js is all you have to do to get all chat messages only on local client(d2 window).

2. if you don't wanna see any messages overhead, open libs/core/Me.js and add after line 10:
	```javascript
	(function (original) {
	  me.overhead = function (...args) {
	    return true;
	  };
	})(me.overhead);
	```
3. if you insist to silent your scripts, the easier option is to set in char config:
	```javascript
		Config.Silence = true; // Make the bot not say a word. Do not use in combination with LocalChat
	```

4. other method:
	* for silencing Baal.js, look for [SVN line 196](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/bots/Baal.js#L196)
		```javascript
			say(string);
		```
	* comment this line adding **//** before say, or change **say** into **print**
	* do the same with lines [214](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/bots/Baal.js#L214) and [220](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/libs/bots/Baal.js#L220), for the cases of dolls and souls.
	* in char configuration file you can remove the text between quotes "" , lines 85-88, 114-116, 220-223.
	* in Config.js you can remove the text between quotes in lines 344-346, and for Diablo 376-381
	* use Find in Files looking for **say(** in whole d2bs folder. Then manually edit those results, changing them to (choose one):
		* **print(** - print on screen only
		* **console.log/debug/warn/error/info** - prints to console only
		* **me.overhead(** - a message displayed above bot head, but it's visible only for that char, and not in a d2 server chat.

