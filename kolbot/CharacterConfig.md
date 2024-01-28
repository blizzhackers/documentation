[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Character Configuration

---

* [Basic Start](#basic-start)
* [UserAddon](#useraddon)
* [Battle orders](#battle-orders)
* [Team MF system](#team-mf-system)
* [Boss/area scripts](#bossarea-scripts)
* [Leeching section](#leeching-section)
* [Special Scripts](#special-scripts)
* [Guest scripts](#guest-scripts)
* [Town settings](#town-settings)
* [Potion settings](#potion-settings)
* [Chicken](#chicken)
* [Inventory lock configuration](#inventory-lock-configuration)
* [Belt configuration](#belt-configuration)
* [Pickit config](#pickit-config)
* [Advanced automule settings](#advanced-automule-settings)
* [Additional item info log settings](#additional-item-info-log-settings-all-info-goes-to-logsitemlogtxt)
* [Item Identification Settings](#item-identification-settings)
* [Manager Item Log Screen](#manager-item-log-screen)
* [Repair settings](#repair-settings)
* [Gambling Config](#gambling-config)
* [Cubing Config](#cubing-config)
* [Runeword Config](#runeword-config)
* [Public game options](#public-game-options)
	* [Local Chat](#local-chat)
* [General Config](#general-config)
* [Shrine Scanner](#shrine-scanner)
* [MF Switch](#mf-switch)
* [Fastmod Config](#fastmod-config)
* [Anti-hostile Config](#anti-hostile-config)
* [DClone Config](#dclone-config)
* [Monster skip config](#monster-skip-config)
* [Attack config](#attack-config)
* [Class specific config](#class-specific-config)
	* [Amazon](#amazon)
	* [Assassin](#assassin)
	* [Barbarian](#barbarian)
	* [Druid](#druid)
	* [Necromancer](#necromancer)
	* [Paladin](#paladin)
	* [Sorceress](#sorceress)
* [AutoSkill builds character](#autoskill-builds-character)
* [AutoStat builds character](#autostat-builds-character)
* [AutoBuild System](#autobuild-system)
* [Advanced options](#advanced-options)
	* [Script-specific config override](#script-specific-config-override)
	* [Character config filename options](#character-config-filename-options)
	* [Custom Config](#custom-config)

---
### Basic Start
Character config files can be found in ...\d2bs\kolbot\libs\config\...:  Amazon.js, Assassin.js, Barbarian.js, Druid.js, Necromancer.js, Paladin.js, Sorceress.js. Choose your toon class file and copy it adding your toon name, like Sorceress.MyToon.js
If you started without having a char config file, you'll see on the top white console the option to press < Home > and < Space > to create the char config. Close that profile and look for the file Class.MyToon.js, because you have to edit it before start running.
Use your code editor of choice to edit kolbot files. See [IDE-Setup](kolbot/IDES.md/#code-editors-ides) for code editors

NOTE: To set up everything correctly you need to understand two simple commands used to configure!!!

* first is **true** or **false** (case sensitive). example:

* Scripts.Coldcrow = false; **DISABLED**
* Scripts.BoneAsh = true; **ENABLED**

* second is to comment out something, to do it put **//** in front of that line. example:

* //Config.Recipes.push([Recipe.Gem, 560]); // perfect amethyst **DISABLED**
* Config.Recipes.push([Recipe.Gem, 565]); // perfect topaz **ENABLED**


Character config file already contains lot's of explanations, please read them carefully.

To run other scripts change them to **true**, read carefully all notes and follow instructions.

### UserAddon
By default script **UserAddon.js** is enabled. It's for manual play.

* Allows you to see more information about items, NPCs and players by placing the cursor over them.
* Shows item level, items in sockets, classid, code and magic item prefix/suffix numbers.
* Shows monster's classid, HP percent and resistances.
* Shows other players' gear.

To start botting you need to disable script **UserAddon.js**, to do it change line 17 to **false**. Now you can start boss/area scripts
```javascript
	Scripts.UserAddon = false; // !!!YOU MUST SET THIS TO FALSE IF YOU WANT TO RUN BOSS/AREA SCRIPTS!!!
```

### Battle orders
Use this for 2+ characters (for example BO barb + sorc)
```javascript
	Scripts.BattleOrders = false;
		Config.BattleOrders.Mode = 0; // 0 = give BO, 1 = get BO
		Config.BattleOrders.Wait = false; // Idle until the player that received BO leaves.
		Config.BattleOrders.Getters = []; // List of players to wait for before casting Battle Orders (mode 0). All players must be in the same area as the BOer.
```
It will be used the Catacombs 2 wp, see line 36 from BattleOrders.js script. Unfortunately this will make the BO once, at the beginning of the game.

A modded script for HC players, with barbarian staying whole game on a chosen wp, written by [@nag0k](https://github.com/nag0k) you can find at https://pastebin.com/JTmWbqLf, and replace the default ...\libs\bots\BattleOrders.js. The barbarian will go to the chosen waypoint and will bo anyone that is nearby, no matter if they have bo stats or not. It will go back to town if monsters come closer to him, or when his mana is lower than the set value and visit a healer NPC, then return to continue giving bo. For using this script you have to add the other characters moving to that wp, from time to time.

### Team MF system
```javascript
	Config.MFLeader = false; // Set to true if you have one or more MFHelpers. Opens TP and gives commands when doing normal MF runs.
```

### Boss/area scripts
Enable desired scripts, changing the value to true.
If you want to change the order of the scripts, just change the order of their lines by using cut and paste. Scripts are executed from top to bottom.
```javascript
	// *** act 1 ***
	Scripts.Corpsefire = false;
		Config.Corpsefire.ClearDen = false;
	Scripts.Mausoleum = false;
		Config.Mausoleum.KillBloodRaven = false;
		Config.Mausoleum.ClearCrypt = false;
	Scripts.Rakanishu = false;
		Config.Rakanishu.KillGriswold = true;
	Scripts.UndergroundPassage = false;
	Scripts.Coldcrow = false;
	Scripts.Tristram = false;
		Config.Tristram.WalkClear = false; // Disable teleport while clearing to protect leechers
		Config.Tristram.PortalLeech = false; // Set to true to open a portal for leechers.
	Scripts.Pit = false;
		Config.Pit.ClearPit1 = true;
	Scripts.Treehead = false;
	Scripts.Smith = false;
	Scripts.BoneAsh = false;
	Scripts.Countess = false;
		Config.Countess.KillGhosts = false;
	Scripts.Andariel = false;
	Scripts.Cows = false;
		Config.MakeCows = false; // if set to true just opens cow portal but doesn't clear - useful to ensure maker never gets king killed
		Config.KillKing = false; // MAKE SURE YOUR MAKER DOESN"T HAVE THIS SET TO TRUE!!!!

	// *** act 2 ***
	Scripts.Radament = false;
	Scripts.Coldworm = false;
		Config.Coldworm.KillBeetleburst = false;
		Config.Coldworm.ClearMaggotLair = false; // Clear all 3 levels
	Scripts.AncientTunnels = false;
		Config.AncientTunnels.OpenChest = false; // Open special chest in Lost City
		Config.AncientTunnels.KillDarkElder = false;
	Scripts.Summoner = false;
		Config.Summoner.FireEye = false;
	Scripts.Tombs = false;
	Scripts.Duriel = false;

	// *** act 3 ***
	Scripts.Stormtree = false;
	Scripts.KurastTemples = false;
	Scripts.Icehawk = false;
	Scripts.Endugu = false;
	Scripts.Travincal = false;
		Config.Travincal.PortalLeech = false; // Set to true to open a portal for leechers.
	Scripts.Mephisto = false;
		Config.Mephisto.MoatTrick = false;
		Config.Mephisto.KillCouncil = false;
		Config.Mephisto.TakeRedPortal = true;

	// *** act 4 ***
	Scripts.OuterSteppes = false;
	Scripts.Izual = false;
	Scripts.Hephasto = false;
		Config.Hephasto.ClearRiver = false; // Clear river after killing Hephasto
		Config.Hephasto.ClearType = 0xF; // 0xF = skip normal, 0x7 = champions/bosses, 0 = all
	Scripts.Diablo = false;
		Config.Diablo.WalkClear = false; // Disable teleport while clearing to protect leechers
		Config.Diablo.Entrance = true; // Start from entrance
		Config.Diablo.JustViz = false; // Intended for classic sorc, kills Vizier only.
		Config.Diablo.SealLeader = false; // Clear a safe spot around seals and invite leechers in. Leechers should run SealLeecher script.
		Config.Diablo.Fast = false; // Runs diablo fast, focuses on clearing seal bosses rather than clearing path
		Config.Diablo.SealWarning = "Leave the seals alone!";
		Config.Diablo.EntranceTP = "Entrance TP up";
		Config.Diablo.StarTP = "Star TP up";
		Config.Diablo.DiabloMsg = "Diablo";

	// *** act 5 ***
	Scripts.Pindleskin = false;
		Config.Pindleskin.UseWaypoint = false;
		Config.Pindleskin.KillNihlathak = true;
		Config.Pindleskin.ViperQuit = false; // End script if Tomb Vipers are found.
	Scripts.Nihlathak = false;
		Config.Nihlathak.ViperQuit = false; // End script if Tomb Vipers are found.
		Config.Nihlathak.UseWaypoint = false; // Use waypoint to Nith, if false uses anya portal
	Scripts.Eldritch = false;
		Config.Eldritch.OpenChest = true;
		Config.Eldritch.KillShenk = true;
		Config.Eldritch.KillDacFarren = true;
	Scripts.Eyeback = false;
	Scripts.SharpTooth = false;
	Scripts.ThreshSocket = false;
	Scripts.Abaddon = false;
	Scripts.Frozenstein = false;
		Config.Frozenstein.ClearFrozenRiver = true;
	Scripts.Bonesaw = false;
		Config.Bonesaw.ClearDrifterCavern = false;
	Scripts.Snapchip = false;
		Config.Snapchip.ClearIcyCellar = true;
	Scripts.Worldstone = false;
	Scripts.Baal = false;
		Config.Baal.HotTPMessage = "Hot TP!";
		Config.Baal.SafeTPMessage = "Safe TP!";
		Config.Baal.BaalMessage = "Baal!";
		Config.Baal.SoulQuit = false; // End script if Souls (Undead Soul Killers) are found.
		Config.Baal.DollQuit = false; // End script if Dolls (Undead Stigyan Dolls) are found.
		Config.Baal.KillBaal = true; // Kill Baal. Leaves game after wave 5 if false.
```

### Leeching section

As you probably already noticed some scripts can be done with leader and leecher or even more leechers.

This very useful option gives you many possibilities how to run your bot.

For magic finding team you can use MF Leader/Helper or scripts with leader leecher option like for example Tristram, Travincal. All leechers option you can find in **leeching section**.

To set it up properly your leader runs for example
```javascript
Scripts.Tristram = true;
    Config.Tristram.WalkClear = false; // Disable teleport while clearing to protect leechers
    Config.Tristram.PortalLeech = true; // Set to true to open a portal for leechers.
```

For leecher you skip to **leeching section** and set

```javascript
Scripts.TristramLeech = true; // Enters Tristram, attempts to stay close to the leader and will try and help kill.
    Config.TristramLeech.Helper = false; // If set to true the character will help attack.
```

If u want your character to finish game when other character exits you have to set Quit.List

Example:

```js
Config.QuitList = ["MySorc", "MyDin"];
Config.QuitListMode = 0; // 0 = use character names; 1 = use profile names (all profiles must run on the same computer).
Config.QuitListDelay = []; // Quit the game with random delay in case of using Config.QuitList. Example: Config.QuitListDelay = [1, 10]; will exit with random delay between 1 and 10 seconds.
```
**(case sensitive)**

### Special Scripts
In special scripts section you can find additonal scripts with extra features like:

* Scripts.WPGetter
* Scripts.GetKeys
* Scripts.OrgTorch
* Scripts.Rusher
* Scripts.Rushee
* Scripts.CrushTele
* Scripts.Questing
* Scripts.Gamble
* Scripts.Crafting
* Scripts.GhostBusters
* Scripts.ControlBot
* Scripts.IPHunter
* Scripts.KillDclone
* Scripts.ShopBot
* Scripts.ChestMania
* Scripts.ClearAnyArea

Take a closer look and check what you like. Remember that inside of each script you can find additional information. All scripts are stored in **d2bs/kolbot/libs/scripts/**. 

### Guest scripts

Here is a place for scripts that you can add on your own. Who knows, maybe you can do some awesome script for us and **share** it!!

BaalAssistant //Used to leech or help in baal runs

### Town settings

Here you can set the percent of life to go to a healer, and the using of mercenary.

### Potion settings
Here you can set the percent of life/mana when the potion to be used, but also how many potions to keep in inventory as a buffer.

### Chicken

* this section prevents your character from death.
* under designated percent of life your player will exit game. 

* be careful lowest settings can be painful for your experience (XP) in hell, because chicken it's not always 100% safe due to many circumstances like poor servers,low life of character, etc.

### Inventory lock configuration
```js
Config.Inventory[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Config.Inventory[1] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Config.Inventory[2] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
Config.Inventory[3] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
```

* 0 = item is locked and won't be moved. If item occupies more than one slot, ALL of those slots must be set to 0 to lock it in place.
* set 0s where your torch, annihilus and everything else you want to KEEP is.
* 1 = item is unlocked and will be dropped, stashed or sold.
* If you don't change the default values, the bot won't pick up & stash items.

### Belt configuration
Potion types for belt columns from left to right. **Rejuvenation potions must always be rightmost.** Supported potions are Healing ("hp"), Mana ("mp") and Rejuvenation ("rv") example:

```js
Config.BeltColumn = ["hp", "hp", "mp", "rv"];
```

You can set minimum amount of potions. If we have less, bot goes to vendor to purchase more. Set rejuvenation columns to 0, because they can't be bought! example:
```js
Config.MinColumn = [3, 3, 3, 0];
```

### Pickit config
All pickit files are stored in **d2bs/kolbot/pickit/** By default kolton.nip and LLD.nip are included but not enabled.

To enable other nip file add a line here

```js
// Config.PickitFiles.push("kolton.nip"); // uncomment to include
// Config.PickitFiles.push("LLD.nip");  // uncomment to include
// add under here
Config.PickitFiles.push("myPickit.nip"); // <-- your personalized pickit
```

There are several files to choose, you can also create and add your own or just edit these files:

* classic.nip
* follower.nip
* gold.nip
* keyorg.nip
* kolton.nip
* LLD.nip
* pots.nip
* shopbot.nip
* test.nip

Additional information about [blizzhackers/pickits](https://github.com/blizzhackers/pickits/#pickits)

### Advanced automule settings

* Trigger - Having an item that is on the list will initiate muling. Useful if you want to mule something immediately upon finding.
* Force - Items listed here will be muled even if they are ingredients for cubing.
* Exclude - Items listed here will be ignored and will not be muled. Items on Trigger or Force lists are prioritized over this list.
* List can either be set as string in pickit format and/or as number referring to item classids. Each entries are separated by commas.
* Example :
	*  Config.AutoMule.Trigger = [639, 640, "[type] == ring && [quality] == unique # [maxmana] == 20"];
		*  	This will initiate muling when your character finds Ber, Jah, or SOJ.
	*  Config.AutoMule.Force = [561, 566, 571, 576, 581, 586, 601];
		*  	This will mule perfect gems/skull during muling.
	*  Config.AutoMule.Exclude = ["[name] >= talrune && [name] <= solrune", "[name] >= 654 && [name] <= 657"];
		*  	This will exclude muling of runes from tal through sol, and any essences.
```js
Config.AutoMule.Trigger = [];

Config.AutoMule.Force = [];

Config.AutoMule.Exclude = [];
```

### Additional item info log settings. All info goes to \logs\ItemLog.txt
```js
Config.ItemInfo = false; // Log stashed, skipped (due to no space) or sold items.

Config.ItemInfoQuality = []; // The quality of sold items to log. See **libs/core/GameData/NTItemAlias.js** for values. Example: Config.ItemInfoQuality = [6, 7, 8];
```

### Item Identification Settings
```js
// If you don't want to use Id Tome you can always try with Cain to id your items.
Config.CainID.Enable = true; // Identify items at Cain
Config.CainID.MinGold = 2500000; // Minimum gold (stash + character) to have in order to use Cain.
Config.CainID.MinUnids = 3; // Minimum number of unid items in order to use Cain.

// Other option is to identify your drop at field.To activate it just enable this script.
Config.FieldID.Enabled = true; // Identify items while in the field
Config.FieldID.PacketID = true; // use packets to speed up id process (recommended to use this)
Config.FieldID.UsedSpace = 80; // how much space has been used before trying to field id, set to 0 to id after every item picked

Config.DroppedItemsAnnounce.Enable = false;	// Announce Dropped Items to in-game newbs
Config.DroppedItemsAnnounce.Quality = []; // Quality of item to announce. See **libs/core/GameData/NTItemAlias.js** for values. 

// Example: Config.DroppedItemsAnnounce.Quality = [6, 7, 8];
```

* by default items identified at Cain won't be sold, but dropped, so add this workaround - [use Cain and sell items](https://github.com/blizzhackers/documentation/blob/master/kolbot/MiscellaneousOptions.md/#use-cain-and-sell-items).

### Manager Item Log Screen

If you wanna hide some items from manager item's log, set those to false:
```javascript
Config.LogKeys = false; // Log keys on item viewer

Config.LogOrgans = true; // Log organs on item viewer

Config.LogLowRunes = false; // Log low runes (El - Dol) on item viewer

Config.LogMiddleRunes = false; // Log middle runes (Hel - Mal) on item viewer

Config.LogHighRunes = true; // Log high runes (Ist - Zod) on item viewer

Config.LogLowGems = false; // Log low gems (chipped, flawed, normal) on item viewer

Config.LogHighGems = false; // Log high gems (flawless, perfect) on item viewer

Config.SkipLogging = []; // Custom log skip list. Set as three digit item code or classid. Example: ["tes", "ceh", 656, 657] will ignore logging of essences.

Config.ShowCubingInfo = true; // Show cubing messages on console
```

### Repair settings
Here you set the durability percent that will trigger repair

### Gambling Config
Gamble is a source of awesome items worth of trying after lvl 88 (classic).

To enable script make it true.
```js
Config.Gamble = true;
```

You have to set amount of gold when your bot starts to gamble and when it should stop.

Your start amount of gold is stash and character.

Now decide what you want to gamble and activate it.

Config.GambleItems.push(520); // Amulet **ENABLED**

// Config.GambleItems.push(522); // Ring **DISABLED**

for more items check **libs/core/GameData/NTItemAlias.js**
Don't set stop gold amount too low if you use MiniShopBot, buy can fail.
Gambling can be used as Gambling System. For more info about, see [Gambling System Guide](https://github.com/blizzhackers/documentation/kolbot/GamblingSystem.md#gambling-system)

### Cubing Config
All recipes are available in **d2bs\kolbot\libs\config\Templates\Cubing.txt.**

To enable script make it true.
```js
Config.Cubing = true; // Set to true to enable cubing.
```

For example if u want to collect perfect skulls comment out (remove comment //) on line
```js
// Config.Recipes.push([Recipe.Gem, "Perfect Skull"]); // Make Perfect Skull
```

All ingredients will be auto-picked, for classids check **d2bs/kolbot/libs/core/GameData/NTItemAlias.js**

### Runeword Config

To enable script make it true.
```js
Config.MakeRunewords = true; // Set to true to enable runeword making/rerolling
```

All recipes are available in **d2bs\kolbot\libs\config\Templates\Runewords.txt.
!!!NOTE!!! enhanced damage and enhanced defense on runewords are broken in the core right now**
Keep lines follow pickit format and any given runeword is tested vs ALL lines so you don't need to repeat them.

### Public game options

#### Local Chat
```javascript
// If LocalChat is enabled, chat can be sent via 'sendCopyData' instead of BNET

// To allow 'say' to use BNET, use 'say("msg", true)', the 2nd parameter will force BNET

// LocalChat messages will only be visible on clients running on the same PC

Config.LocalChat.Enabled = false; // enable the LocalChat system

Config.LocalChat.Toggle = false; // optional, set to KEY value to toggle through modes 0, 1, 2

Config.LocalChat.Mode = 0; // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)

// If Config.Leader is set, the bot will only accept invites from leader. If Config.PublicMode is not 0, Baal and Diablo script will open Town Portals.

Config.PublicMode = 0; // 1 = invite and accept, 2 = accept only, 3 = invite only, 0 = disable

// Party message settings. Each setting represents an array of messages that will be randomly chosen.

// $name, $level, $class and $killer are replaced by the player's name, level, class and killer

Config.Greetings = []; // Example: ["Hello, $name (level $level $class)"]

Config.DeathMessages = []; // Example: ["Watch out for that $killer, $name!"]

Config.Congratulations = []; // Example: ["Congrats on level $level, $name!"]

Config.ShitList = false; // Blacklist hostile players so they don't get invited to party.

Config.UnpartyShitlisted = false; // Leave party if someone invited a blacklisted player.
	
// Here you can set if you want to invite to party, accept invitation or ignore and play alone.
Config.PublicMode = 0; // 1 = invite, 2 = accept, 0 = disable. If Config.Leader is set, the bot will only accept invites from leader.

// To blacklist hostile players so they don't get invited to party you have to enable script.
Config.ShitList = true;
```

### General Config
Default minimum time of game is set to 60 seconds. You can change it to what you want by changing number of seconds.

The max game time is set to infinity, to force your bot to leave game after desired number of seconds changed 0 to what you like. example: to finish game after 15 minutes
```js
Config.MaxGameTime = 900;
```

Here you can also configure your ping settings in two ways example:
```js
Config.PingQuit = [{Ping: 600, Duration: 10}, {Ping: 1500, Duration: 0}];
```

First condition is that bot will quit if your ping will be higher than 600 for 10 seconds, second condition is that will quit when ping is higher then 1500.

Rest of settings are self-explanatory

### Shrine Scanner
Shrine Scanner scans for shrines while moving. Put the shrine types in order of priority (from highest to lowest). For a list of types, see **d2bs\kolbot\sdk\Shrines.txt.**

example:
```js
Config.ScanShrines = [15, 12, 13];
```

where
* 12 skill shrine
* 13 mana recharge shrine (end of **Config.ScanShrines** - lowest priority)
* 15 experience shrine (begining of **Config.ScanShrines** - highest priority)

### MF Switch
When you want to swap a weapon for MF you have to set on what Boss life % to switch weapons at. Set to 0 to disable. You have also to set a MF weapon slot.

### Fastmod Config
!!! **Packet casting is patched and does not work on 1.14d**

While warden is off it's **safe** to use **fastmod** or full **packet casting**. Here are some technical explanations about differences between them [by noah-](https://github.com/noah-):

* **Fastmod** is a player STAT spoofing method, basically when your items give you say 100 fcr, the server sends you (the d2 client) information saying hey you have 100 fcr so do animations such that they match the 100 fcr frame, by using packets we can spoof receiving this packet from the server and trick the diablo 2 client into believing that it can cast at some rate --- when it casts at a faster rate that information is again packets transmitted from diablo 2 to blizzard's servers -- however this still relies on the game's method of casting skills with animation frames.

* **Packet casting** this bypasses all animation code in diablo 2, this directly sends to the blizzard server the information that the diablo 2 client is casting a skill the blizzard server does not strictly enforce your item stats and how fast you can attack, they rely on the animation delay to keep things in sync because of this, we can "spam" the cast packet and more than likely we will get more hits than normally with animation because the blizzard server allows the attack packets +- some threshold of what your gear should allow you to

**Packet casting** does not alter your player stats, packet casting bypasses diablo 2 client code to cast skills by directly sending the request to blizzard d2gs servers.

**Fastmod** does not bypass the animation code of diablo 2 client, it spoofs the incomming packets to the diablo 2 client so that the client thinks it has better mods than it actually has based on the gear its using

Some things that are contingent upon how effective **fastmod** or **packet casting can** be include but are not limited to your base stats, internet connection speed and internet latency (measured by ping)

Using **packet casting**, it should technically cast as fast as possible by **your connection**, this means that **fastmod** would not affect you if you are using full **packet casting**.

Example of settings:

```javascript
Config.FCR = 255; // 0 - disable, 1 to 255 - set value of faster cast rate

Config.FHR = 255; // 0 - disable, 1 to 255 - set value of faster hit recovery

Config.FBR = 255; // 0 - disable, 1 to 255 - set value of faster block recovery

Config.IAS = 255; // 0 - disable, 1 to 255 - set value of increased attack speed

Config.PacketCasting = 2; // 0 = disable, 1 = packet teleport, 2 = full packet casting.
```

### Anti-hostile Config

In this section you can defend your bot against hostile players that want to kill you or ruin your game.

You enable script by setting to true.
```js
Config.AntiHostile = true; // Enable anti-hostile
```

Now you have some possibilities depending on what you want like chicken to town, exit game or try to kill hostile player when spotted.


### DClone Config

Bot goes to Palace Cellar level 3 and kills Diablo Clone.
```js
Config.StopOnDClone = true; // Go to town and idle as soon as Diablo walks the Earth

Config.SoJWaitTime = 5; // Time in minutes to wait for another SoJ sale before leaving game. 0 = disabled

Config.KillDclone = true; // Go to Palace Cellar 3 and try to kill Diablo Clone. Pointless if you already have Annihilus.
```

### Monster skip config

Here you can set what kind of monster you would like to skip.

For example if you play classic cold sorceress, you have to skip all cold immunes.

example:
```js
Config.SkipImmune = ["cold"];
```

You can also skip monsters with **"Aura"** and **"Enchant"**, with exactly similiar way like for **"Immune"**.

Uncomment the following line to always attempt to kill these bosses despite immunities and mods
```js
Config.SkipException = [getLocaleString(2851), getLocaleString(2852), getLocaleString(2853)]; // vizier, de seis, infector
```

### Attack config

Attack patterns depends on your build and type of character.
```js
/**
 * Attack config
 * To disable an attack, set it to -1
 * Skills MUST be POSITIVE numbers. For reference see ...\kolbot\sdk\skills.txt or use sdk.skills.SkillName see -> \kolbot\libs\modules\sdk.js
 * DO NOT LEAVE THE NEGATIVE SIGN IN FRONT OF THE SKILLID.
 * GOOD: Config.AttackSkill[1] = 151;
 * GOOD: Config.AttackSkill[1] = sdk.skills.Whirlwind;
 * BAD: Config.AttackSkill[1] = -151;
 * BAD: Config.AttackSkill[1] = "Whirlwind";
 */
```
You can find some example settings in **d2bs\kolbot\libs\config\Templates\Attacks.txt.**

You can use charged skills as a preattack. **This is experimental**
```js
Config.ChargeCast = {
  skill: sdk.skills.LowerResist,
  spectype: 0x7,
};
```

```js
/**
 *  Advanced Attack config. Allows custom skills to be used on custom monsters.
 *	Format: "Monster Name": [timed skill id, untimed skill id]
 *	Example: "Baal": [38, -1] to use charged bolt on Baal
 *	Multiple entries are separated by commas
 */
Config.CustomAttack = {
  //"Monster Name": [-1, -1]
};
```

If you would like to attack Unique/SuperUnique monsters first when clearing you have to change this script to true.
```js
Config.BossPriority = true;
```

You can decide what kind of monster you want to attack by ClearType.
```js
Config.ClearType = 0xF;
```

* 0xF = skip normal,
* 0x7 = champions/bosses,
* 0 = all

Clear while traveling during bot scripts
You have two methods to configure clearing.
* First is simply a spectype to always clear, in any area, with a default range of 30
* The second method allows you to specify the areas in which to clear while traveling, a range, and a spectype. If area is excluded from this method,
all areas will be cleared using the specified range and spectype
```js
Config.ClearPath = 0; // Monster spectype to kill while traveling. 0xF = skip normal, 0x7 = champions/bosses, 0 = all
Config.ClearPath = {
	Areas: [74], // Specific areas to clear while traveling in. Comment out to clear in all areas
	Range: 30, // Range to clear while traveling
	Spectype: 0, // Monster spectype to kill while traveling. 0xF = skip normal, 0x7 = champions/bosses, 0 = all
};
```

### Class specific config
is additional option for class only


#### Amazon
```js
Config.LightningFuryDelay = 10; // Lightning fury interval in seconds. LF is treated as timed skill.

Config.UseInnerSight = true; // Use inner sight as a precast

Config.UseSlowMissiles = true; // Use slow missiles as a precast

Config.UseDecoy = true; // Use decoy with merc stomp

Config.SummonValkyrie = true; // Summon Valkyrie
```

#### Assassin
```js
Config.UseTraps = true; // Set to true to use traps

Config.Traps = [271, 271, 271, 276, 276]; // Skill IDs for traps to be cast on all mosters except act bosses.

Config.BossTraps = [271, 271, 271, 271, 271]; // Skill IDs for traps to be cast on act bosses.

Config.SummonShadow = "Master"; // 0 = don't summon, 1 or "Warrior" = summon Shadow Warrior, 2 or "Master" = summon Shadow Master

Config.UseFade = true; // Set to true to use Fade prebuff.

Config.UseBoS = false; // Set to true to use Burst of Speed prebuff. TODO: Casting in town + UseFade compatibility

Config.UseVenom = false; // Set to true to use Venom prebuff. Set to false if you don't have the skill and have Arachnid Mesh - it will cause connection drop otherwise.

Config.UseCloakofShadows = true; // Set to true to use Cloak of Shadows while fighting. Useful for blinding regular monsters/minions.

Config.UseBladeShield = false; // Set to true to use blade shield armor
```

#### Barbarian
```js
Config.FindItem = false; // Use Find Item skill on corpses after clearing.

Config.FindItemSwitch = 0; // Find Item weapon slot - 0 = slot I, 1 = slot II

Config.UseWarcries = true; // use battle orders, battle command, and shout if we have them
```

#### Druid
```js
Config.SummonRaven = true;

Config.SummonAnimal = "Grizzly"; // 0 = disabled, 1 or "Spirit Wolf" = summon spirit wolf, 2 or "Dire Wolf" = summon dire wolf, 3 or "Grizzly" = summon grizzly

Config.SummonSpirit = "Oak Sage"; // 0 = disabled, 1 / "Oak Sage", 2 / "Heart of Wolverine", 3 / "Spirit of Barbs"

Config.SummonVine = "Poison Creeper"; // 0 = disabled, 1 / "Poison Creeper", 2 / "Carrion Vine", 3 / "Solar Creeper"
```

#### Necromancer
```js
Config.Curse[0] = 0; // Boss curse. Use skill number or set to 0 to disable.

Config.Curse[1] = 0; // Other monsters curse. Use skill number or set to 0 to disable.

/**
 * Custom curses for monster
 * Can use monster name or classid
 * Format: Config.CustomCurse = [["monstername", skillid], [156, skillid]];
 * Optional 3rd parameter for spectype, leave blank to use on all
  0x00    Normal Monster
  0x01    Super Unique
  0x02    Champion
  0x04    Boss
  0x08    Minion
  Example: Config.CustomCurse = [["HellBovine", 60], [571, 87], ["SkeletonArcher", 71, 0x00]];
 */
Config.CustomCurse = [];

Config.ExplodeCorpses = 0; // Explode corpses. Use skill number or 0 to disable. 74 = Corpse Explosion, 83 = Poison Explosion

Config.Golem = "None"; // Golem. 0 or "None" = don't summon, 1 or "Clay" = Clay Golem, 2 or "Blood" = Blood Golem, 3 or "Fire" = Fire Golem

Config.Skeletons = 0; // Number of skeletons to raise. Set to "max" to auto detect, set to 0 to disable.

Config.SkeletonMages = 0; // Number of skeleton mages to raise. Set to "max" to auto detect, set to 0 to disable.

Config.Revives = 0; // Number of revives to raise. Set to "max" to auto detect, set to 0 to disable.

Config.PoisonNovaDelay = 2; // Delay between two Poison Novas in seconds.

Config.ActiveSummon = false; // Raise dead between each attack. If false, it will raise after clearing a spot.

Config.ReviveUnstackable = true; // Revive monsters that can move freely after you teleport.

Config.IronGolemChicken = 30; // Exit game if Iron Golem's life is less or equal to designated percent.
```

#### Paladin
```js
Config.AvoidDolls = false; // Try to attack Soul Killers from a greater distance with hammerdins.

Config.Vigor = true; // Swith to Vigor when running

Config.Redemption = [50, 50]; // Switch to Redemption after clearing an area if under designated life or mana. Format: [lifepercent, manapercent]
```

#### Sorceress
```js
Config.CastStatic = 60; // Cast static until the target is at designated life percent. 100 = disabled.

Config.StaticList = ["Diablo"]; // List of monster NAMES to static. Example: Config.StaticList = ["Andariel", "Diablo", "Baal"];

Config.UseTelekinesis = true; // Use telekinesis on units that allow it. Example: Shrines, Waypoints, Chests, and Portals

Config.UseEnergyShield = false; // set to true to use energy shield if its available

Config.UseColdArmor = true; // use armor skills, uses skill ids or set to true to let the bot decide based on skill level or false to disable completely
// (40 / sdk.skills.FrozenArmor)(50 / sdk.skills.ShiverArmor)(60 / sdk.skills.ChillingArmor)
```

### AutoSkill builds character

it is based on array defined by the user and it replaces AutoBuild's skill system.

AutoSkill will automatically spend skill points and it can also allocate any prerequisite skills as required.

See libs/config/Templates/AutoSkillExampleBuilds.txt for Config.AutoSkill.Build examples.


###  AutoStat builds character

it is based on array defined by the user and this will replace AutoBuild's stat system.

See libs/config/Templates/AutoStatExampleBuilds.txt for Config.AutoStat.Build examples.


### AutoBuild System

See /d2bs/kolbot/libs/config/Builds/README.txt for instructions


### Advanced options

#### Script-specific config override

Every option belonging to the Config object can be overridden for each individual script.

Format:
```js
Scripts.SomeScript = {changed_properties};
```

true is replaced by an object containing the properties you wish to change. The properties are listed **without** "Config." in front of them.

For example, disabling dodge for Mephisto script would look like this:
```js
Scripts.Mephisto = {Dodge: false};
```

Multiple properties can be changed like this:
```js
Scripts.Mephisto = {Dodge: false, TownHP: 60, MFSwitchPercent: 25};
```

The changes will revert back when the script ends.


#### Character config filename options

There's several ways to name a character config file. List in order of priority (formats higher in the list will override lower ones):

* **Custom Config** (see below)
* **Class.Profile.js** - Profile matches D2Bot# profile. This makes it possible to assign different configs to the same character. Just make 2 profiles that use the same character and 2 character config in this format.
**Examples**: Paladin.MFer.js, Paladin.Rusher.js
* **Realm.Class.Charname.js** - This is used when botting on multiple realms with same character name.
**Examples**: Europe.Sorceress.MyChar.js, USEast.Sorceress.MyChar.js
* **Class.Charname.js** - This is the default format.
**Examples**: Sorceress.MyChar.js, Sorceress.MyOtherChar.js
* **Profile.js** - Similar to 1 but without Class prefix. This is used for generic characters where class doesn't matter (Follower, Wakka, AutoBaal etc.).
**Examples**: Follower1.js, Follower2.js


#### Custom Config
Custom Config allows you to specify which profile(s) will use which config file.

You can do this by editing **_CustomConfig.js**

The format is:
```js
"Config_Filename_Without_Extension": ["array", "of", "profiles"]
```

This means we can make groups of profiles run from certain character configs. For example, ShopBot profiles don't need individual profiles, so we can do something like this:
```js
"ShopConfig": ["Shopper1", "Shopper2", "Shopper3", "Shopper4"]
```

This will make all 4 profiles run off the same character config - ShopConfig.js
Multiple entries are separated by commas like so:
```js
"ShopConfig": ["Shopper1", "Shopper2", "Shopper3", "Shopper4"],
"Leecher": ["Leech 1", "Leech 2", "Leech 3"]
```
