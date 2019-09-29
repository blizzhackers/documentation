[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Miscellaneous Options

---

* [local chat](#local-chat)
* [updated Autosmurf](#updated-Autosmurf)
* [Autochaos](#Autochaos)
* [modded BattleOrders.js](#modded-BattleOrdersjs)
* [how to define your own party](#how-to-define-your-own-party)
* [hardcore loot corpses](#hardcore-loot-corpses)
* [Baal.js with adds for hdin on wave 2](#Baaljs-with-adds-for-hdin-on-wave-2)
* [staggered delays for creating games](#staggered-delays-for-creating-games)
* [opening all chests](#opening-all-chests)
* [silenced Follower](#silenced-Follower)
* [LifeChicken restart profile](#lifechicken-restart-profile)
* [use Cain and sell items](#use-Cain-and-sell-items)
* [inventory full](#inventory-full)
* [cubing all kind of gems](#cubing-all-kind-of-gems)
* [picking and selling junk items](#picking-and-selling-junk-items)
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
		Config.LocalChat.Enabled = false; // enable the LocalChat system
		Config.LocalChat.Toggle = false; // optional, set to KEY value to toggle through modes 0, 1, 2
		Config.LocalChat.Mode = 0; // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
	```
* for using manual play and Follower.js you should activate it on mode 2
* to be sure that any char isn't using the d2 server chat, you can set in Config.js:
	```javascript
		LocalChat: {
			Enabled: true,
			Toggle: false,
			Mode: 2
		},
	```

## updated Autosmurf
* @Dark-f updated the [JeanMax/AutoSmurf](https://github.com/JeanMax/AutoSmurf) with https://cdn.discordapp.com/attachments/228855570537381888/456564852971012096/AutoSmurf_2018-6-13.rar
	- check this @Dark-f video https://www.youtube.com/watch?v=rTXM9szlIdw

* other autosmurf version can be be downloaded with tortoiseSVN <https://github.com/SetupSonic/d2bot-with-kolbot-sonic/trunk>
	- it is a modified version of d2bs for sorceress chars, so check D2BotSonic.dbj starter script, config files ...\libs\config\Sorceress.js and ...\libs\config\Builds\Sorceress.Sonic.js 
	- it have its modified files in ...\d2bot-with-kolbot-sonic\d2bs\kolbot\libs\sonic\

## Autochaos

* by [@noah-](https://github.com/noah-), without explicit communication in game.
* https://gist.github.com/noah-/2685fbeccc72fd595bbe89116aea272e
* check also the comments there
* you can post the results on discord [#testing channel](https://discordapp.com/channels/430522386253611018/430534815549358080)

## modded BattleOrders.js
* reason = the default script was programmed to do only a single BOgive - BOget at the beggining of the game. Maybe it wasn't necessary a 2nd one, because games were shorter in those d2 server times without a lot of restrictions, which were applied in the meantime.

* by [@nag0k](https://github.com/nag0k) - https://pastebin.com/JTmWbqLf - replace the default ...\libs\bots\BattleOrders.js
* barbarian will go to the waypoint of your choosing and bo anyone that is nearby if they have bo or not. It will go back to town if monsters come close to the boer. It will go back to town and visit a healer NPC if it's mana gets below a set percentage then return to continue giving bo.

* there are some settings at the top of the script you can change:
	```javascript
		const BO_WP = 35; // area to buff - 35 is catacombs level 2
		const TOWN_NEARBY_MONSTER = true; // go to town if monsters nearby
		const TOWN_MANA = 20; // go refill mana if mana drops below this percent
	```
* BO_WP sets what wp to bo at, 35 is default which is catacombs level 2.
* TOWN_NEARBY_MONSTER makes the barb go to town if monsters come too close.
* TOWN_MANA makes the barb go refill it's mana if it drops below this percentage, if mana drops below 20% the barb will go heal by default.

* Notes:
	* only for giving BO, so only in barbarian config file:
		```javascript
			// Battle orders script - Use this for 2+ characters (for example BO barb + sorc)
			Scripts.BattleOrders = true;
		```
	* the other parameters are useless.
	* in barbarian config Config.QuitList = ["..."]; should be completed.
	* this script is only the "barb giving bo" component, so it's not really compatible with the current BattleOrders unless you do what you done and make the characters receiving bo to go on the Boer wp first, by adding in your running scripts the following lines:
		```javascript
			Pather.useWaypoint(35, true); // take Boer wp
			Pather.moveTo(me.x + 5, me.y + 5);
			delay(3000);
		```

## how to define your own party
* It is a public mode when your players invite and accept other players invites, only if their names are in your previously configured MyOwnParty list

* in char config file, look to the // Public game options section and you have to add (line Config.PublicMode is already there, so add only option 4)
	```javascript
		Config.PublicMode = 4; // 1 = invite and accept, 2 = accept only, 3 = invite only, 4 = MyOwnParty, 0 = disable
		Config.MyOwnParty = []; // ["MyPlayer1", "MyPlayer2", "MyPlayer3"]
	```

* in ... libs\common\Config.js before line 161 DeathMessages add
	```javascript
		MyOwnParty: [],
	```
* and complete the same list on every char config that you will add in your team game, including all charnames.
    Config.MyOwnParty = ["MyPlayer1", "MyPlayer2", "MyPlayer3", "MyPlayer4"];

* in ... \tools\Party.js add after [default SVN line 143](https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/tools/Party.js#L143) the case 4 (for entire Party.js script, check [next chapter](#hardcore-loot-corpses) pastebins)
```javascript
                    case 4: // MyOwnParty
                        if (Config.MyOwnParty.length > 0) {
                            var i;
 
                            for (i = 0; i < Config.MyOwnParty.length; i += 1) {
                                if (player.name == Config.MyOwnParty[i] && player.name !== me.name) {
                                    if (player.partyflag !== 4 || player.partyflag !== 2 && player.partyid === 65535) {
                                        clickParty(player, 2);
                                        delay(100);
                                    }
                                    if (player.partyid !== 65535 && player.partyid !== myPartyId) {
                                        otherParty = player.partyid;
                                    }
                                    if (player.partyflag === 2 && (!otherParty || player.partyid === otherParty) && (getTickCount() - partyTick >= 2000 || Config.FastParty)) {
                                        clickParty(player, 2);
                                        delay(100);
                                    }
                                }
                            }
                        }
 
                        break;
```

## hardcore loot corpses
* I added the lines to send automatically the accept of looting own corpse to other players. This was added in my modded MyOwnParty option from Party.js, so no one who isn't already defined there cannot get them.
* If all are using it, everyone is able to loot other player corpse, set just after the partied message.
* In case of disconnection and re-enter in the same game, the disconnected player will allow everyone the loot, but he not get the accept from all other players, because he is already on their loot list.
* In case of reloading the scripts, first that player will refuse the loot, but 2 x reload will allow the looting again.

* Party.js - https://pastebin.com/9Zjmg5HT
* OOG.js - https://pastebin.com/CWAW8hjW

* copy the text and paste it.

* I tested it with my modded Follower.js, where I added (around line 824+) an infinite loop to stop dead HC player from other actions which will end the game because of errors
```javascript
        if (me.playertype == 1 && me.mode === 17) { // stop the HC screen to allow the loot of dead player
            while(true) {
                delay(60000);
            }
        }
```
* it's working, and the other players in game are able to loot his/her corpse, getting the equipped items back. the mercenary stuff is lost, and also the items located in inventory and stash.

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

* a staggered version of ...\d2bs\kolbot\D2BotLead.dbj  https://pastebin.com/u02RH1C2
* copy and paste the text, and save it ...\kolbot\D2BotLeadStagger.dbj

* this will create ...\logs\gameStagger.txt file and you'll see a message in status "Lobby - stagger time: (...s)" if the stagger delay wasn't reached.
* in case of errors or too high values shown on d2bs status line, delete the gameStagger.txt and it will be written again.

* staggerDelay was set to random value 120 - 130 sec (line 370), and CreateGameDelay to random value 5-15 sec (line 8)

## opening all chests
* if you want to open all chests during clearing, set in char configuration file
	```javascript
		Config.OpenChests = true;
	```
* add the changes to Attack.js, so line 892 from Attack.js will be:
```javascript
            ids = ["chest", "loose rock", "hidden stash", "loose boulder", "corpseonstick", "casket", "armorstand", "weaponrack", "barrel",
                "holeanim", "tomb2", "tomb3", "roguecorpse", "ratnest", "corpse", "goo pile", "largeurn", "urn", "chest3", "jug", "skeleton",
                "guardcorpse", "sarcophagus", "object2", "cocoon", "basket", "stash", "hollow log", "hungskeleton", "pillar", "skullpile",
                "skull pile", "jar3", "jar2", "jar1", "bonechest", "woodchestl", "woodchestr", "barrel wilderness", "burialchestr", "burialchestl",
                "explodingchest", "chestl", "chestr", "groundtomb", "icecavejar1", "icecavejar2", "icecavejar3", "icecavejar4", "deadperson",
                "deadperson2", "evilurn", "tomb1l", "tomb3l", "groundtombl"
                ];
```

## silenced Follower
* reason = to avoid the muting of keys. 
* thanks to [@noah-](https://github.com/noah-), if you set the LocalChat on mode 2, you should no worry about d2 server chat.

* the default script ...\d2bs\kolbot\libs\bots\Follower.js is a wonderful written script, but it was working only by using chat commands to move to leader position, take portals, ...
* also the follower reporting have to be silenced changing say( with print( or me.overhead (server side function of d2bs, other players don't see that).
* by default, the follower is doing town activities only with command, and this can be changed to be done at the start of the game and just after every leader move in town. Cain can be used to identify items, but before setting that check the section related, below.

* https://pastebin.com/LnXCQ3ES - copy and paste the text, replacing the content of ...\bots\Follower.js. 

## LifeChicken restart profile
* by default LifeChicken will exit game
* if you wanna close d2 window (like the d2nt method) instead exiting game, you should think about restarting the current d2bot profile:

	* add in Config.js after https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/libs/common/Config.js#L117 :
	```javascript
		LifeChickenRestart: false,
	```

	* add in char config file:
	```javascript
		Config.LifeChickenRestart = true; // Restart profile if LifeChicken is activated
	```

	* in ToolsThread.js replace https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/tools/ToolsThread.js#L564 with:
	```javascript
						Config.LifeChickenRestart ? D2Bot.restart() : this.exit();
	```

## use Cain and sell items
* By default the identifying items on Cain will end with dropping the unwanted items. That was the reason to add a variable with minimum gold, just under the enabling ID at Cain.
* [@noah-](https://github.com/noah-) argued that identifying on other npc is faster, but it isn't matter some seconds in these days on d2 server, and maybe old Etal users will use it.

* look in ...\d2bs\kolbot\libs\common\Town.js for [SVN lines 711-715](https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/libs/common/Town.js#L711-L715) :
	```javascript
					case 0:
						Misc.itemLogger("Dropped", unids[i], "cainID");
						unids[i].drop();
	
						break;
	```
* and change them into:
	```javascript
					case 0:
						Misc.itemLogger("Dropped", unids[i], "cainID");
						this.initNPC("Shop", "clearInventory");
						unids[i].sell();
	
						break;
	```
* set a lower gold limit on char for using Cain, like 100.000 or 0.

## inventory full
* If you don't wanna to set the [Automule](https://github.com/kolton/d2bot-with-kolbot/wiki/AutoMule-and-TorchMule#automule) option, or you don't have too many d2/lod keys to do that, you can set the stop of the profile.
* again, some old etal users may need this function.

* add in char configuration file (at the end of General config section, ~ line 400), a new variable:
	```javascript
		Config.InventoryFull = true; // stop profile if inventory full
	```

* then edit Config.js and add after line ~ 204
	```javascript
		InventoryFull: false,
	```

* finally, look for the default SVN lines 145-148 from Pickit.js
```javascript
                            // Town visit failed - abort
                            print("ÿc7Not enough room for " + this.itemColor(pickList[0]) + pickList[0].name);

                            return false;
```
* and change them to:
```javascript
                            // Town visit failed - abort
                            print("ÿc7Not enough room for " + this.itemColor(pickList[0]) + pickList[0].name);
 
                            if (Config.InventoryFull) {
                                D2Bot.printToConsole("Inventory Full. game: " + me.gamename + "char: " + me.account + " - " + me.name, 6);
                                D2Bot.stop(me.profile, true);
                            }

                            return false;
```

## cubing all kind of gems
* if you wanna a bot from your team to cube all the gems found, you can add some changes:
* in the special pickit file for that char, you can have only 1 line near the perfect gem lines
	```javascript
	[type] == gem
	[name] == perfectamethyst
	[name] == perfectdiamond
	[name] == perfectemerald
	[name] == perfectruby
	[name] == perfectsapphire
	[name] == perfecttopaz
	[name] == perfectskull
	```
* in ...\kolbot\libs\common\Cubing.js after [SVN line 667](https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/libs/common/Cubing.js#L667) add these lines:
```javascript

                // flawless gems
                // Make flawless amethyst
                if (this.subRecipes.indexOf(560) === -1 && (this.recipes[i].Ingredients[j] === 560 || (this.recipes[i].Ingredients[j] === "lgem" && this.gemList.indexOf(560) > -1))) {
                    this.recipes.push({Ingredients: [559, 559, 559], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(560);
                }

                // Make flawless topaz
                if (this.subRecipes.indexOf(565) === -1 && (this.recipes[i].Ingredients[j] === 565 || (this.recipes[i].Ingredients[j] === "lgem" && this.gemList.indexOf(565) > -1))) {
                    this.recipes.push({Ingredients: [564, 564, 564], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(565);
                }

                // Make flawless sapphire
                if (this.subRecipes.indexOf(570) === -1 && (this.recipes[i].Ingredients[j] === 570 || (this.recipes[i].Ingredients[j] === "lgem" && this.gemList.indexOf(570) > -1))) {
                    this.recipes.push({Ingredients: [569, 569, 569], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(570);
                }

                // Make flawless emerald
                if (this.subRecipes.indexOf(575) === -1 && (this.recipes[i].Ingredients[j] === 575 || (this.recipes[i].Ingredients[j] === "lgem" && this.gemList.indexOf(575) > -1))) {
                    this.recipes.push({Ingredients: [574, 574, 574], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(575);
                }

                // Make flawless ruby
                if (this.subRecipes.indexOf(580) === -1 && (this.recipes[i].Ingredients[j] === 580 || (this.recipes[i].Ingredients[j] === "lgem" && this.gemList.indexOf(580) > -1))) {
                    this.recipes.push({Ingredients: [579, 579, 579], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(580);
                }

                // Make flawless diamond
                if (this.subRecipes.indexOf(585) === -1 && (this.recipes[i].Ingredients[j] === 585 || (this.recipes[i].Ingredients[j] === "lgem" && this.gemList.indexOf(585) > -1))) {
                    this.recipes.push({Ingredients: [584, 584, 584], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(585);
                }

                // Make flawless skull
                if (this.subRecipes.indexOf(600) === -1 && (this.recipes[i].Ingredients[j] === 600 || (this.recipes[i].Ingredients[j] === "lgem" && this.gemList.indexOf(600) > -1))) {
                    this.recipes.push({Ingredients: [599, 599, 599], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(600);
                }

                // gems
                // Make amethyst
                if (this.subRecipes.indexOf(559) === -1 && (this.recipes[i].Ingredients[j] === 559 || (this.recipes[i].Ingredients[j] === "sgem" && this.gemList.indexOf(559) > -1))) {
                    this.recipes.push({Ingredients: [558, 558, 558], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(559);
                }

                // Make topaz
                if (this.subRecipes.indexOf(564) === -1 && (this.recipes[i].Ingredients[j] === 564 || (this.recipes[i].Ingredients[j] === "sgem" && this.gemList.indexOf(564) > -1))) {
                    this.recipes.push({Ingredients: [563, 563, 563], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(564);
                }

                // Make sapphire
                if (this.subRecipes.indexOf(569) === -1 && (this.recipes[i].Ingredients[j] === 569 || (this.recipes[i].Ingredients[j] === "sgem" && this.gemList.indexOf(569) > -1))) {
                    this.recipes.push({Ingredients: [568, 568, 568], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(569);
                }

                // Make emerald
                if (this.subRecipes.indexOf(574) === -1 && (this.recipes[i].Ingredients[j] === 574 || (this.recipes[i].Ingredients[j] === "sgem" && this.gemList.indexOf(574) > -1))) {
                    this.recipes.push({Ingredients: [573, 573, 573], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(574);
                }

                // Make ruby
                if (this.subRecipes.indexOf(579) === -1 && (this.recipes[i].Ingredients[j] === 579 || (this.recipes[i].Ingredients[j] === "sgem" && this.gemList.indexOf(579) > -1))) {
                    this.recipes.push({Ingredients: [578, 578, 578], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(579);
                }

                // Make diamond
                if (this.subRecipes.indexOf(584) === -1 && (this.recipes[i].Ingredients[j] === 584 || (this.recipes[i].Ingredients[j] === "sgem" && this.gemList.indexOf(584) > -1))) {
                    this.recipes.push({Ingredients: [583, 583, 583], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(584);
                }

                // Make skull
                if (this.subRecipes.indexOf(599) === -1 && (this.recipes[i].Ingredients[j] === 599 || (this.recipes[i].Ingredients[j] === "sgem" && this.gemList.indexOf(599) > -1))) {
                    this.recipes.push({Ingredients: [598, 598, 598], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(599);
                }

                // flawed gems
                // Make flawed amethyst
                if (this.subRecipes.indexOf(558) === -1 && (this.recipes[i].Ingredients[j] === 558 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(558) > -1))) {
                    this.recipes.push({Ingredients: [557, 557, 557], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(558);
                }

                // Make flawed topaz
                if (this.subRecipes.indexOf(563) === -1 && (this.recipes[i].Ingredients[j] === 563 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(563) > -1))) {
                    this.recipes.push({Ingredients: [562, 562, 562], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(563);
                }

                // Make flawed sapphire
                if (this.subRecipes.indexOf(568) === -1 && (this.recipes[i].Ingredients[j] === 568 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(568) > -1))) {
                    this.recipes.push({Ingredients: [567, 567, 567], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(568);
                }

                // Make flawed emerald
                if (this.subRecipes.indexOf(573) === -1 && (this.recipes[i].Ingredients[j] === 573 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(573) > -1))) {
                    this.recipes.push({Ingredients: [572, 572, 572], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(573);
                }

                // Make flawed ruby
                if (this.subRecipes.indexOf(578) === -1 && (this.recipes[i].Ingredients[j] === 578 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(578) > -1))) {
                    this.recipes.push({Ingredients: [577, 577, 577], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(578);
                }

                // Make flawed diamond
                if (this.subRecipes.indexOf(583) === -1 && (this.recipes[i].Ingredients[j] === 583 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(583) > -1))) {
                    this.recipes.push({Ingredients: [582, 582, 582], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(583);
                }

                // Make flawed skull
                if (this.subRecipes.indexOf(598) === -1 && (this.recipes[i].Ingredients[j] === 599 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(598) > -1))) {
                    this.recipes.push({Ingredients: [597, 597, 597], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
                    this.subRecipes.push(598);
                }
```
* in character configuration file should be added in the cubing config section (default lines ~320-326 have the cubing of the flawless to perfect gems):
	```javascript
		Config.Recipes.push([Recipe.Gem, "Chipped Amethyst"]); // make FlawedAmethyst
		Config.Recipes.push([Recipe.Gem, "Chipped Topaz"]); // make Flawed Topaz
		Config.Recipes.push([Recipe.Gem, "Chipped Sapphire"]); // make Flawed Sapphire
		Config.Recipes.push([Recipe.Gem, "Chipped Emerald"]); // make Flawed Emerald
		Config.Recipes.push([Recipe.Gem, "Chipped Ruby"]); // make Flawed Ruby
		Config.Recipes.push([Recipe.Gem, "Chipped Diamond"]); // make Flawed Diamond
		Config.Recipes.push([Recipe.Gem, "Chipped Skull"]); // make Flawed Skull
 
		Config.Recipes.push([Recipe.Gem, "Flawed Amethyst"]); // make Amethyst
		Config.Recipes.push([Recipe.Gem, "Flawed Topaz"]); // make Topaz
		Config.Recipes.push([Recipe.Gem, "Flawed Sapphire"]); // make Sapphire
		Config.Recipes.push([Recipe.Gem, "Flawed Emerald"]); // make Emerald
		Config.Recipes.push([Recipe.Gem, "Flawed Ruby"]); // make Ruby
		Config.Recipes.push([Recipe.Gem, "Flawed Diamond"]); // make Diamond
		Config.Recipes.push([Recipe.Gem, "Flawed Skull"]); // make Skull
 
		Config.Recipes.push([Recipe.Gem, "Amethyst"]); // make Flawless Amethyst
		Config.Recipes.push([Recipe.Gem, "Topaz"]); // make Flawless Topaz
		Config.Recipes.push([Recipe.Gem, "Sapphire"]); // make Flawless Sapphire
		Config.Recipes.push([Recipe.Gem, "Emerald"]); // make Flawless Emerald
		Config.Recipes.push([Recipe.Gem, "Ruby"]); // make Flawless Ruby
		Config.Recipes.push([Recipe.Gem, "Diamond"]); // make Flawless Diamond
		Config.Recipes.push([Recipe.Gem, "Skull"]); // make Flawless Skull

		Config.Recipes.push([Recipe.Gem, "Flawless Amethyst"]); // make Perfect Amethyst
		Config.Recipes.push([Recipe.Gem, "Flawless Topaz"]); // make Perfect Topaz
		Config.Recipes.push([Recipe.Gem, "Flawless Sapphire"]); // make Perfect Sapphire
		Config.Recipes.push([Recipe.Gem, "Flawless Emerald"]); // make Perfect Emerald
		Config.Recipes.push([Recipe.Gem, "Flawless Ruby"]); // make Perfect Ruby
		Config.Recipes.push([Recipe.Gem, "Flawless Diamond"]); // make Perfect Diamond
		Config.Recipes.push([Recipe.Gem, "Flawless Skull"]); // make Perfect Skull
	```

* if picking a lot of gems will highly increase the number of the lines in d2bs manager item log tab, check the proper settings in the **// Manager Item Log Screen** section from character config file


## picking and selling junk items

* if your low bot need gold, you should activate the picking of junk items.
* if total gold is less than Config.LowGold value pick up anything worth 10 gold per square to sell in town.

* you should add in the char configuration file:
	```javascript
		Config.LowGold = 200000 // any low item with 10 gold per square will be picked and sold to NPC until me.gold < Config.LowGold
	```
that variable is already defined in Config.js (line 138, where it is set to 0), and it is used in Pickit.js(line 64) and Town.js(line 526)

* some items are ignored, but if you wanna pick everything, remove this part from default line 64 in Pickit.js:
	```javascript
	&& Town.ignoredItemTypes.indexOf(unit.itemType) === -1 
	```
otherwise you can only comment the desired line from Town.js like line 54, which is responsible of ignoring [throwing potions](http://classic.battle.net/diablo2exp/items/potions.shtml)
	```javascript
			//38, // Missile Potion
	```

## Diabase & D2BS
@Ned added some changes to Diabase to work with D2BS

* download using SVN Checkout... -> (https://github.com/Nedkali/DiaBaseV1/trunk)
* create a subfolder ...\d2bs\kolbot\[COLOR=#ffa64d]MuleInventory\
* you have the option to not use the Diabase function which overwrite the files, using Utilities > Verify logging files, and it's enough to replace the default libs\MuleLogger.js with https://pastebin.com/5AkYLwNU - which will create the both log files for the default D2BS Char Viewer (in mules\realm\account) and Diabase(in MuleInventory\).

## silencing the scripts
**me.overhead** command in d2bs is displayed only on client side, like the **print** command, too. Nobody in the same game cannot see those messages. Those are different than server chat messages starting with **!** symbol.
Some of d2bot-with-kolbot scripts aren't silenced by default, and in some cases like MFTeam, SealLeader/Leecher, Follower.js, a.s.o.  the functionality is made through chat expressions.

1. **if you are worried about server chat filter**, you can **set** [**Local Chat**](#local-chat) **true** and **mode 1** or **2**. Setting mode 1 in the case of MFTeam or SealLeader/Leecher, or mode 2 in the case of Followers.js is all you have to do to get all chat messages only on local client(d2 window).

2. if you don't wanna see any messages overhead, use notepad++ find and remove the text between quotes -> you'll get smth like:
	```
	me.overhead("");
	```
	
3. if you don't wanna see any chat messages:
	* check the config file and remove text between quotes -> you'll get smth like:
		```
		Config.  ... = "";
		```
	* and also check the Boss/Area script and remove the text between quotes in the line with **say("anytext");** -> so you'll get smth like:
		```
		say("");
		```

4. if you insist to silent your scripts, the easier option (@nag0k choice) is to add a function in ...\kolbot\default.dbj after line 92, which will change **say** into **me.overhead** or **print**:
	```javascript
	this.say = function (string) {
		me.overhead(string);
	};
	```
	```javascript
	this.say = function (string) {
		print(string);
	};
	```

5. other method:
	* for silencing Baal.js, look for [SVN line 196](https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/libs/bots/Baal.js#L196)
		```javascript
			say(string);
		```
	* comment this line adding **//** before say, or change **say** into **print**
	* do the same with lines [214](https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/libs/bots/Baal.js#L214) and [220](https://github.com/kolton/d2bot-with-kolbot/blob/master/d2bs/kolbot/libs/bots/Baal.js#L220), for the cases of dolls and souls.
	* in char configuration file you can remove the text between quotes "" , lines 85-88, 114-116, 220-223.
	* in Config.js you can remove the text between quotes in lines 344-346, and for Diablo 376-381
	* use np++ Find in Files looking for **say(** in whole d2bs folder. Then manually edit those results, changing them to (choose one):
		* **print(** - print on screen only
		* **me.overhead(** - a message displayed above bot head, but it's visible only for that char, and not in a d2 server chat.

