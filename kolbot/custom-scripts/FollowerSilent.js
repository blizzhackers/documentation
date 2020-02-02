/*
* Follower by kolton
*
* you should set "LocalChat" in mode 2 for all chars:
*	Config.LocalChat.Enabled = true; // enable the LocalChat system
*	Config.LocalChat.Mode = 2; // 0 = disabled, 1 = chat from 'say' (recommended), 2 = all chat (for manual play)
*
* version: 17.01.2020
*
* silent-automated follower changes:
*	- silent follower will check the leader's act and will go to it.
*	- when leader makes tp the follower will try to use it and will precast/buff.
*	- the follower will go after leader in town, using his tp, and will do town activities (if autoTownChores = true).
*	- lines 1007-1021 will stop HC chars, in order to allow the loot of their corpses.
*	- quiting/ending the game will be done using the random delay Config.QuitListDelay.
*	- check the additional commands: b, ancs, ancsoff, ai, map, stash, restart, end, 0, ...
*
* Commands:
*
* Main commands:
*	1 - take leader's tp from town / move to leader's town
*	2 - take leader's tp to town
*
*	3					| town manager
*	<charname> 3		|
*
*	p					| pick items, potions and open containers
*	<charname> p		|
*
*	c					| get softcore player corpse
*	<charname> c		|
*
*	s 					| toggle stop in town near stash. if outside of town followers will make own tp and stop near stash.
*	<charname> s		|
*
* Attack:
*	a 					| toggle attack
*	<charname> a		|
*
*	aon					| attack on
*	<charname> aon		|
*
*	aoff				| attack off
*	<charname> aoff		|
*
* Teleport:
*	*** characters without teleport skill will ignore tele command ***
*	tele				| toggle teleport
*	<charname> tele		|
*
*	tele on				| teleport on
*	<charname> tele on	|
*
*	tele off			| teleport off
*	<charname> tele off	|
*
* Skills:
*	all skill <skillid>			| change skill (refer to sdk\skills.txt)
*	<charname> skill <skillid>	|
*	<class> skill <skillid>		| change skill for all characters of certain class *** any part of class name will do *** for example: "sorc skill 36", "zon skill 0", "din skill 106"
*
* Auras:
*	all aura <skillid>			| change aura for paladins (refer to sdk\skills.txt)
*	<charname> aura <skillid>	|
*
* Town:
*	a2-5 - move to appropriate act (after quest) !NOTE: Disable 'no sound' or game will crash!
*	use a2,a3,a4,a5 chat commands after completing the last quest. trying to get next act/town without having wp yet will lead to Connection Interrupted
*	talk <npc name> - talk to a npc in town
*	ai					| toggle anti-idle
*	<charname> ai		|
*	ancs - prepare for ancients quest a5q5, overwrite the config settings with more potions and towncheck restricted
*	ancsoff - revert to char config from ancients config. *** or you can use .reload for every follower
*
* Misc.
*	cow - enter red cow portal
*
*	wp					| activate a nearby wp
*	<charname> wp		|
*
*	bo - barbarian precast
*	b - refresh buff all followers
*
*	<charname> tp - make a TP. Needs a TP tome if not using custom libs.
*
*	move				| move in a random direction based on player position (use if you're stuck by followers)
*	m					| 
*	<charname> m		|
*
*	dist:x	- minimum distance to leader. default value 6. you can set it in range 6 - 30
*
*	area: ... x: ... y: ... |  move to leader position in the same area *** leader should set a key in ToolsThread.js, like case 111: say("area: " + me.area + " x: " + me.x + " y: " + me.y); ***
*
*	map					| activate mh in the follower windows
*	<charname> map		| ** you should reload the char config where you don't want to see the already activated mh
*
*	reload - reload script instructions. Use only in case of emergency, or after editing character config.
*
*	quit				| exit game
*	<charname> quit		|
*
*	restart				| restart profiles
*	<charname> restart 	|
*
* 	end					| stop follower profile and release the key, after a random delay
*	<charname> end		|
*/

function FollowerSilent() {
	var i, j, stop, leader, leaderUnit, piece, skill, result, unit, player, coord, map, tick, ai,
		commanders = [Config.Leader],
		attack = true,
		openContainers = true,
		classes = ["amazon", "sorceress", "necromancer", "paladin", "barbarian", "druid", "assassin"],
		action = "",
		charClass = classes[me.classid],
		autoTownChores = true, // automatic town activities after arriving from field/areas
		field = false, // variable used in autoTownChores
		dist = 6, // distance to leader. It can be changed with chat "dist:x" by leader.
		logCharOnExit = true; // log items of the current char before exit

	// Override config values
	Config.LocalChat.Enabled = true;
	Config.LocalChat.Mode = 2;

	Config.TownCheck = true;
	Config.OpenChests = true;

	// Get leader's Party Unit
	this.getLeader = function (name) {
		var player = getParty();

		if (player) {
			do {
				if (player.name === name) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's Unit
	this.getLeaderUnit = function (name) {
		var player = getUnit(0, name);

		if (player) {
			do {
				if (!player.dead) {
					return player;
				}
			} while (player.getNext());
		}

		return false;
	};

	// Get leader's act from Party Unit
	this.checkLeaderAct = function (unit) {
		if (unit.area <= 39) {
			return 1;
		}

		if (unit.area >= 40 && unit.area <= 74) {
			return 2;
		}

		if (unit.area >= 75 && unit.area <= 102) {
			return 3;
		}

		if (unit.area >= 103 && unit.area <= 108) {
			return 4;
		}

		return 5;
	};

	this.getCloser = function () {
		if (me.inTown) {
			return;
		}

		if (leaderUnit && getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y) <= 65) {
			if (getDistance(me.x, me.y, leaderUnit.x, leaderUnit.y) > dist) {
				Pather.moveToUnit(leaderUnit, true);
			}
		} else if (!leaderUnit) {
			player = getUnit(0);

			if (player) {
				do {
					if (player.name !== me.name) {
						Pather.moveToUnit(player, true);

						break;
					}
				} while (player.getNext());
			}
		}
	};

	// Change areas to where leader is
	this.checkExit = function (unit, area) {
		if (unit.inTown) {
			return false;
		}

		var i, target,
			exits = getArea().exits;

		for (i = 0; i < exits.length; i += 1) {
			if (exits[i].target === area) {
				return 1;
			}
		}

		if (unit.inTown) {
			target = getUnit(2, "waypoint");

			if (target && getDistance(me, target) < 20) {
				return 3;
			}
		}

		target = getUnit(2, "portal");

		if (target) {
			do {
				if (target.objtype === area) {
					Pather.usePortal(null, null, target);

					return 2;
				}
			} while (target.getNext());
		}

		// Arcane<->Cellar portal
		if ((me.area === 74 && area === 54) || (me.area === 54 && area === 74)) {
			Pather.usePortal(null);

			return 4;
		}

		// Arcane<->Canyon of the Magi
		if ((me.area === 74 && area === 46) || (me.area === 46 && area === 74)) {
			Pather.usePortal(null);

			return 4;
		}

		// Tal-Rasha's tomb->Duriel's lair
		if (me.area >= 66 && me.area <= 72 && area === 73) {
			Pather.useUnit(2, 100, area);

			return 4;
		}

		// Throne->Chamber
		if (me.area === 131 && area === 132) {
			target = getUnit(2, 563);

			if (target) {
				Pather.usePortal(null, null, target);

				return 4;
			}
		}

		return false;
	};

	// Talk to a NPC
	this.talk = function (name) {
		if (!me.inTown) {
			me.overhead("ÿc1Going to talk in town!");
			Town.goToTown();
		}

		if (typeof name === "string") {
			name = name.toLowerCase();
		} else {
			me.overhead("ÿc1No NPC name given.");

			return false;
		}

		var npc, names;

		switch (me.act) {
		case 1:
			names = [NPC.Gheed, NPC.Charsi, NPC.Akara, NPC.Kashya, NPC.Cain, NPC.Warriv];

			break;
		case 2:
			names = [NPC.Fara, NPC.Lysander, NPC.Greiz, NPC.Elzix, NPC.Jerhyn, NPC.Meshif, NPC.Drognan, NPC.Atma, NPC.Cain];

			break;
		case 3:
			names = [NPC.Alkor, NPC.Asheara, NPC.Ormus, NPC.Hratli, NPC.Cain];

			break;
		case 4:
			names = [NPC.Halbu, NPC.Tyrael, NPC.Jamella, NPC.Cain];

			break;
		case 5:
			names = [NPC.Larzuk, NPC.Malah, NPC.Qual_Kehk, NPC.Anya, NPC.Nihlathak, NPC.Cain];

			break;
		}

		if (names.indexOf(name) === -1) {
			me.overhead("ÿc1Invalid NPC.");

			return false;
		}

		if (!Town.move(name === NPC.Jerhyn ? "palace" : name)) {
			Town.move("portalspot");
			me.overhead("ÿc1Failed to move to town spot.");

			return false;
		}

		npc = getUnit(1);

		if (npc) {
			do {
				if (npc.name.replace(/ /g, "").toLowerCase().indexOf(name) > -1) {
					npc.openMenu();
					me.cancel();
					me.overhead("ÿc2Done talking.");

					return true;
				}
			} while (npc.getNext());
		}

		me.overhead("ÿc1NPC not found.");
		Town.move("portalspot");

		return false;
	};

	// Change act after completing last act quest
	this.changeAct = function (act) {
		var npc, preArea, target;

		preArea = me.area;

		switch (act) {
		case 2:
			if (me.area >= 40) {
				break;
			}

			Town.move(NPC.Warriv);

			npc = getUnit(1, 155);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D36);
			}

			break;
		case 3:
			if (me.area >= 75) {
				break;
			}

			Town.move("palace");

			npc = getUnit(1, 201);

			if (npc) {
				npc.openMenu();
				me.cancel();
			}

			Town.move(NPC.Meshif);

			npc = getUnit(1, 210);

			if (npc) {
				npc.openMenu();
				Misc.useMenu(0x0D38);
			}

			break;
		case 4:
			if (me.area >= 103) {
				break;
			}

			if (me.inTown) {
				Town.move(NPC.Cain);

				npc = getUnit(1, 245);

				if (npc) {
					npc.openMenu();
					me.cancel();
				}

				Town.move("portalspot");
				Pather.usePortal(102, null);
			}

			delay(1500);

			target = getUnit(2, 342);

			if (target) {
				Pather.moveTo(target.x - 3, target.y - 1);
			}

			Pather.usePortal(null);

			break;
		case 5:
			if (me.area >= 109) {
				break;
			}

			Town.move(NPC.Tyrael);

			npc = getUnit(1, NPC.Tyrael);

			if (npc) {
				npc.openMenu();
				me.cancel();

				try {
					Pather.useUnit(2, 566, 109);
				} catch (a5e) {

				}
			}

			break;
		}

		delay(2000);

		while (!me.area) {
			delay(500);
		}

		if (me.area === preArea) {
			me.cancel();
			Town.move("portalspot");
			print("ÿc1Act change failed.");

			return false;
		}

		Town.move("portalspot");
		me.overhead("ÿc8Act change successful.");

		if (act === 2) {
			me.overhead("Don't forget to talk to Drognan after getting the Viper Amulet!");
		}

		return true;
	};

	this.nextArea = function (area) { // only the exceptions from area = ± 1

		switch (area) {
		case 1:
			return [39];
		case 2:
			return [8];
		case 3:
			return [9, 17];
		case 4:
			return [10, 38];
		case 6:
			return [11, 20];
		case 7:
			return [12, 26];
		case 8:
			return [2];
		case 9:
			return [3, 13];
		case 10:
			return [4, 5, 14];
		case 11:
			return [6, 15];
		case 12:
			return [7, 16];
		case 13:
			return [9];
		case 14:
			return [10];
		case 15:
			return [11];
		case 16:
			return [12];
		case 17:
			return [3, 18, 19];
		case 18:
			return [17];
		case 19:
			return [17];
		case 39:
			return [1];
		case 40:
			return [47, 50];
		case 41:
			return [55];
		case 42:
			return [56];
		case 43:
			return [62];
		case 44:
			return [65];
		case 45:
			return [58];
		case 46:
			return [66, 67, 68, 69, 70, 71, 72];
		case 55:
			return [41, 59];
		case 56:
			return [42];
		case 57:
			return [60];
		case 58:
			return [45, 61];
		case 59:
			return [55];
		case 60:
			return [57];
		case 61:
			return [58];
		case 62:
			return [43];
		case 65:
			return [44];
		case 66:
		case 67:
		case 68:
		case 69:
		case 70:
		case 71:
		case 72:
			return [46, 73];
		case 76:
			return [84, 85];
		case 78:
			return [86, 88];
		case 80:
			return [92, 94, 95];
		case 81:
			return [92, 96, 97];
		case 82:
			return [98, 99];
		case 83:
			return [100];
		case 84:
		case 85:
			return [76];
		case 86:
		case 88:
			return [78];
		case 87:
			return [90];
		case 89:
			return [91];
		case 90:
			return [87];
		case 91:
			return [89];
		case 92:
			return [80, 81];
		case 94:
		case 95:
			return [80];
		case 96:
		case 97:
			return [81];
		case 98:
		case 99:
			return [82];
		case 100:
			return [83];
		case 109:
			return [121];
		case 111:
			return [125];
		case 112:
			return [126];
		case 113:
			return [115];
		case 115:
			return [113, 117];
		case 117:
			return [127];
		case 118:
			return [120];
		case 120:
			return [128]; // 118 is getting C/I for using the exit
		case 125:
			return [111];
		case 126:
			return [112];
		case 127:
			return [117];
		case 128:
			return [120];
		default:
			return [];
		}
	};

	this.pickPotions = function (range) {
		if (me.dead) {
			return false;
		}

		Town.clearBelt();

		while (!me.idle) {
			delay(40);
		}

		var status,
			pickList = [],
			item = getUnit(4);

		if (item) {
			do {
				if ((item.mode === 3 || item.mode === 5) && item.itemType >= 76 && item.itemType <= 78 && getDistance(me, item) <= range) {
					pickList.push(copyUnit(item));
				}
			} while (item.getNext());
		}

		pickList.sort(Pickit.sortItems);

		while (pickList.length > 0) {
			item = pickList.shift();

			if (item && copyUnit(item).x) {
				status = Pickit.checkItem(item).result;

				if (status && Pickit.canPick(item)) {
					Pickit.pickItem(item, status);
				}
			}
		}

		return true;
	};

	this.openContainers = function (range) {
		var unit, ox, oy,
			unitList = [],
			containers = ["chest", "loose rock", "hidden stash", "loose boulder", "corpseonstick", "casket", "armorstand", "weaponrack", "barrel", "holeanim",
							"roguecorpse", "ratnest", "corpse", "goo pile", "largeurn", "urn", "chest3", "jug", "skeleton", "guardcorpse", "sarcophagus",
							"cocoon", "basket", "stash", "hollow log", "hungskeleton", "pillar", "skullpile", "skull pile", "jar3", "jar2", "jar1", "bonechest", "woodchestl",
							"woodchestr", "barrel wilderness", "burialchestr", "burialchestl", "explodingchest", "chestl", "chestr", "icecavejar1", "icecavejar2",
							"icecavejar3", "icecavejar4", "deadperson", "deadperson2", "evilurn", "tomb1l", "tomb3l", "tomb2", "tomb3", "object2", "groundtomb", "groundtombl", "crate", "tomb"
						];

		ox = me.x;
		oy = me.y;
		unit = getUnit(2);

		if (unit) {
			do {
				if (containers.indexOf(unit.name.toLowerCase()) > -1 && unit.mode === 0 && getDistance(me, unit) <= range) {
					unitList.push(copyUnit(unit));
				}
			} while (unit.getNext());
		}

		while (unitList.length > 0) {
			unitList.sort(Sort.units);

			unit = unitList.shift();

			if (unit) {
				Misc.openChest(unit);
				Pickit.pickItems();
			}
		}

		return true;
	};

	this.chatEvent = function (nick, msg) {
		if (msg && nick === Config.Leader) {
			switch (msg) {
			case "tele":
			case me.name + " tele":
				if (Pather.teleport) {
					Pather.teleport = false;

					me.overhead("ÿc1Teleport off.");
				} else {
					Pather.teleport = true;

					me.overhead("ÿc2Teleport on.");
				}

				break;
			case "tele off":
			case me.name + " tele off":
				Pather.teleport = false;

				me.overhead("ÿc1Teleport off.");

				break;
			case "tele on":
			case me.name + " tele on":
				Pather.teleport = true;

				me.overhead("ÿc2Teleport on.");

				break;
			case "a":
			case me.name + " a":
				if (attack) {
					attack = false;

					me.overhead("ÿc1Attack off.");
				} else {
					attack = true;

					me.overhead("ÿc2Attack on.");
				}

				break;
			case "flash":
				Packet.flash(me.gid);

				break;
			case "aoff":
			case me.name + " aoff":
				attack = false;

				me.overhead("ÿc1Attack off.");

				break;
			case "aon":
			case me.name + " aon":
				attack = true;

				me.overhead("ÿc2Attack on.");

				break;
			case "quit":
			case me.name + " quit":
				me.overhead("ÿc1quit game ...");
				if (logCharOnExit) {
					MuleLogger.logChar(); // log the char
				}
				delay(rand(Config.QuitListDelay[0] * 1e3, Config.QuitListDelay[1] * 1e3));
				quit();

				break;
			case "s": // go to stash and stop
			case me.name + " s":
				if (!me.inTown) {
					Town.goToTown();
				}

				if (stop) {
					stop = false;

					me.overhead("ÿc2Resuming.");
				} else {
					Town.move("stash");
					stop = true;

					me.overhead("ÿc1Stopping.");
					delay(500);
				}

				break;
			case "r":
				if (me.playertype != 1 && me.mode === 17) {
					me.revive();
				}

				break;
			case "reload":
				showConsole();
				print("reload");
				say("you must type manually the reload command in d2 follower console");
				//hideConsole();

				break;
			case "ancs": // prepare ancients quest a5q5, overwrite the config settings
			case me.name + " ancs":
				Config.MercWatch = false;
				Config.TownCheck = false;
				Config.TownHP = 0;
				Config.LifeChicken = 0;
				Config.ManaChicken = 0;
				Config.HealStatus = false;
				Config.HPBuffer = 3;
				Config.MPBuffer = 3;
				Config.RejuvBuffer = 5;

				if (me.inTown) {
					Town.doChores(true);
					me.overhead("ÿc2Prepared with potions for ancients");
				}

				print("ÿc2Prepared with settings for ancients");

				break;
			case "ancsoff": // revert to char config from ancients config
				Config.MercWatch = true;
				Config.TownCheck = true;
				Config.TownHP = 30;
				Config.HPBuffer = 0;
				Config.MPBuffer = 0;
				Config.RejuvBuffer = 5;
				me.overhead("ÿc1Configuration settings reverted");

				break;
			case "ai": // anti-idle
			case me.name + " ai":
				tick = getTickCount() + rand(150e4, 175e4); // trigger anti-idle every ~30 minutes

				if (!me.inTown) {
					Town.goToTown();
				}

				if (ai) {
					ai = false;
					Config.AutoMap = false;
					me.overhead("ÿc1anti-idle off");
				} else {
					ai = true;
					me.overhead("ÿc2anti-idle on");

					while (ai) {
						delay(1000);

						if (!ai) {
							break;
						}

						if ((getTickCount() - tick) > 0) {
							sendPacket(1, 0x40); // quest status refresh, working as anti-idle
							tick += rand(150e4, 175e4);
						}
					}
				}

				break;
			case "map": // load the mh in the follower d2 window
			case me.name + " map":
				if (map) {
					map = false;
					Config.AutoMap = false;
					me.overhead("ÿc1Hide the mh ÿc0-> type .reload");
					print("ÿc1for hiding the mh, you should manually type ÿc0.reload ÿc4in the chat.");
				} else {
					map = true;
					load("tools/mapthread.js");
					Config.AutoMap = true;
					me.overhead("ÿc2Show the map");
				}

				break;
			case "end": // stop follower profiles after a random delay
			case me.name + " end":
				me.overhead("ÿc1game ended. ÿc0leaving ...");
				if (logCharOnExit) {
					MuleLogger.logChar(); // log the char
				}
				delay(rand(Config.QuitListDelay[0] * 1e3, Config.QuitListDelay[1] * 1e3));
				D2Bot.printToConsole(me.profile + " - end run " + me.gamename);
				D2Bot.stop(me.profile, true);

				break;
			case "restart": // restart the follower profiles after a random delay
			case me.name + " restart":
				me.overhead("ÿc1rejoin game...");
				delay(rand(Config.QuitListDelay[0] * 1e3, Config.QuitListDelay[1] * 1e3));
				D2Bot.printToConsole(me.profile + " restart " + me.gamename);
				D2Bot.restart();

				break;
			default:
				if (me.classid === 3 && msg.indexOf("aura ") > -1) {
					piece = msg.split(" ")[0];

					if (piece === me.name || piece === "all") {
						skill = parseInt(msg.split(" ")[2], 10);

						if (me.getSkill(skill, 1)) {
							me.overhead("ÿc3Active aura is: " + skill);

							Config.AttackSkill[2] = skill;
							Config.AttackSkill[4] = skill;

							Skill.setSkill(skill, 0);
							//Attack.init();
						} else {
							me.overhead("ÿc1I don't have that aura.");
						}
					}

					break;
				}

				if (msg.indexOf("skill ") > -1) {
					piece = msg.split(" ")[0];

					if (charClass.indexOf(piece) > -1 || piece === me.name || piece === "all") {
						skill = parseInt(msg.split(" ")[2], 10);

						if (me.getSkill(skill, 1)) {
							me.overhead("Attack skill is: " + skill);

							Config.AttackSkill[1] = skill;
							Config.AttackSkill[3] = skill;

							//Attack.init();
						} else {
							me.overhead("ÿc1I don't have that skill.");
						}
					}

					break;
				}

				action = msg;

				break;
			}
		}

		if (msg && msg.split(" ")[0] === "leader" && commanders.indexOf(nick) > -1) {
			piece = msg.split(" ")[1];

			if (typeof piece === "string") {
				if (commanders.indexOf(piece) === -1) {
					commanders.push(piece);
				}

				me.overhead("ÿc4Switching leader to " + piece);

				Config.Leader = piece;
				leader = this.getLeader(Config.Leader);
				leaderUnit = this.getLeaderUnit(Config.Leader);
			}
		}
	};

	// Start
	addEventListener("chatmsg", this.chatEvent);
	leaderUnit = this.getLeaderUnit(Config.Leader);
	leader = this.getLeader(Config.Leader);

	for (i = 0; i < 120; i += 1) {
		if (leader) {
			break;
		}

		delay(1000);
	}

	if (!leader) {
		print("ÿc1Leader not found - " + me.gamename);
		delay(2e5, 3e5);

		if (logCharOnExit) {
			MuleLogger.logChar(); // log the char
		}

		delay(rand(Config.QuitListDelay[0] * 1e3, Config.QuitListDelay[1] * 1e3));
		quit();

	} else if (leader) {
		me.overhead("ÿc2Leader found.");
	}

	while (!Misc.inMyParty(Config.Leader)) {
		delay(500);
	}

	me.overhead("ÿc2Partied.");
	delay(500);

	// Main Loop
	while (Misc.inMyParty(Config.Leader)) {
		if (me.mode === 17) {
			if (me.playertype != 1) {
				while (!me.inTown) {
					me.revive();
					delay(1000);
				}

				Town.move("portalspot");
				me.overhead("ÿc2I'm alive!");

			} else if (me.playertype == 1) { // stop the HC screen to allow the loot of dead player corpse
				Config.MercWatch = false;
				Config.TownCheck = false;
				Config.HealStatus = false;
				Config.TownHP = 0;
				Config.LifeChicken = 0;
				Config.ManaChicken = 0;
				Config.MercChicken = 0;
				Config.TownCheck = false;

				while(true) {
					action = "";
					delay(6e5);
				}
			}
		}

		while (stop) {
			if (!me.inTown) {
				Town.goToTown();
				Town.move("stash");
			}

			delay(500);
		}

		if (!me.inTown) {
			field = true;

			if (!leaderUnit || !copyUnit(leaderUnit).x) {
				leaderUnit = this.getLeaderUnit(Config.Leader);

				if (leaderUnit) {
					me.overhead("ÿc2Leader unit found.");
				}
			}

			this.getCloser();

			if (attack) {
				Attack.clear(15, false, false, false, true);
				this.pickPotions(15);
			}

			Pickit.pickItems();
			if (openContainers) {
				this.openContainers(15);
			}

			if (leader.area !== me.area) {
				while (leader.area === 0) {
					delay(100);
				}

				result = this.checkExit(leader, leader.area);

				switch (result) {
				case 1:
					if (Math.abs(leader.area - me.area) === 1 || this.nextArea(me.area).indexOf(leader.area) > -1) {
						me.overhead("Taking exit.");
						delay(500);
						Pather.moveToExit(leader.area, true);
					}

					break;
				case 2:
					me.overhead("Taking portal.");

					break;
				case 3:
					me.overhead("ÿc8Taking waypoint.");
					delay(500);
					Pather.useWaypoint(leader.area, true);

					break;
				case 4:
					me.overhead("Special transit.");

					break;
				}

				while (me.area === 0) {
					delay(100);
				}

				if (!me.inTown && (leader.inTown || this.checkLeaderAct(leader) !== me.act)) {
					if (!Pather.usePortal(null, leader.name)) {
						me.overhead("ÿc1Failed to use leader portal.");
						Town.goToTown();
						delay(200);
					}
				}
			}
		}

		if (me.inTown) {
			if (!leader.inTown && this.checkLeaderAct(leader) === me.act) {
				me.overhead("ÿc2Ready");
				Town.move("portalspot");
				Attack.weaponSwitch(0);

				while (!Pather.usePortal(leader.area, leader.name) && leader.area !== me.area) {
					me.overhead("ÿc1Failed to use leader portal.");

					if (this.checkLeaderAct(leader) !== me.act) {

						break;
					}
				}

				if (!me.inTown) {
					me.overhead("ÿc2Precast");
					delay(rand(100, 200));
					Precast.doPrecast(true);

					if (me.classid === 4) {
						Attack.clear(10, false, false, false, true);
						delay(3e3);
						Precast.doPrecast(true);
					}

					while (!this.getLeaderUnit(Config.Leader) && !me.dead && !action) {
						Attack.clear(10, false, false, false, true);
						delay(200);

						if (leader.area !== me.area) {

							break;
						}
					}
				}
			}

			if (this.checkLeaderAct(leader) !== me.act) {
				me.overhead("ÿc8Going to leader's town.");
				Town.goToTown(this.checkLeaderAct(leader));
				delay(200);
				Town.move("portalspot");
			}

			if (field && autoTownChores && leader.inTown && !action) {
				me.overhead("ÿc4Running town chores");
				Town.doChores();
				field = false;
				Town.move("portalspot");
			}
		}

		switch (action) {
		case "cow":
			if (me.area === 1) {
				Town.move("portalspot");

				if (!Pather.usePortal(39)) {
					me.overhead("ÿc1Failed to use cow portal.");
				}
			}

			break;
		case "move":
		case "m":
		case me.name + " m":
			coord = CollMap.getRandCoordinate(me.x, -1, 1, me.y, -1, 1, 5);
			Pather.moveTo(coord.x, coord.y);

			break;
		case "wp":
		case me.name + " wp":
			if (me.inTown && !leader.inTown) {
				me.overhead("ÿc8Taking waypoint to leader");
				Town.move("waypoint");
				Pather.useWaypoint(leader.area, true);

				break;
			}

			delay(rand(1, 3) * 500);

			unit = getUnit(2, "waypoint");

			if (unit) {
WPLoop:
				for (i = 0; i < 3; i += 1) {
					if (getDistance(me, unit) > 3) {
						Pather.moveToUnit(unit);
					}

					unit.interact();

					for (j = 0; j < 100; j += 1) {
						if (j % 20 === 0) {
							me.cancel();
							delay(300);
							unit.interact();
						}

						if (getUIFlag(0x14)) {
							break WPLoop;
						}

						delay(10);
					}
				}
			}

			if (getUIFlag(0x14)) {
				me.overhead("ÿc2Got wp.");
			} else {
				me.overhead("ÿc1Failed to get wp.");
			}

			me.cancel();

			break;
		case "c":
		case me.name + " c":
			if (me.playertype != 1 && !me.inTown) {
				Town.getCorpse();
			}

			break;
		case "p":
		case me.name + " p":
			me.overhead("ÿc4!Picking items.");
			Pickit.pickItems();
			this.pickPotions(20);

			if (openContainers) {
				this.openContainers(20);
			}

			me.overhead("ÿc2!Done picking.");

			break;
		case "1":
			if (me.inTown && leader.inTown && this.checkLeaderAct(leader) !== me.act) {
				me.overhead("ÿc8Going to leader's town.");
				Town.goToTown(this.checkLeaderAct(leader));
				Town.move("portalspot");
			} else if (me.inTown) {
				say("Going outside.");
				Town.goToTown(this.checkLeaderAct(leader));
				Town.move("portalspot");

				if (!Pather.usePortal(leader.area, leader.name)) {
					break;
				}

				while (!this.getLeaderUnit(Config.Leader) && !me.dead) {
					Attack.clear(10);
					delay(200);
				}
			}

			break;
		case "2":
			if (!me.inTown) {
				delay(150);
				me.overhead("ÿc4Going to town.");
				Pather.usePortal(null, leader.name);
			}

			break;
		case "3":
		case me.name + " 3":
			if (me.inTown) {
				me.overhead("ÿc4Running town chores");
				Town.doChores(true);
				Town.move("portalspot");
				me.overhead("ÿc2Ready");
			}

			break;
		case "h":
			if (me.classid === 4) {
				Skill.cast(130);
			}

			break;
		case "bo":
			if (me.classid === 4) {
				me.overhead("ÿc2BO");
				Precast.doPrecast(true);
			}

			break;
		case "b": // buff all followers
			me.overhead("ÿc2refresh buff");
			delay(rand(100, 200));
			Precast.doPrecast(true);

			break;
		case "a2":
		case "a3":
		case "a4":
		case "a5":
			this.changeAct(parseInt(action[1], 10));

			break;
		case me.name + " tp":
			unit = me.findItem("tbk", 0, 3);

			if (unit && unit.getStat(70)) {
				unit.interact();

				break;
			}

			unit = me.findItem("tsc", 0, 3);

			if (unit) {
				unit.interact();

				break;
			}

			me.overhead("ÿc1No TP scrolls or tomes.");

			break;
		}

		if (action && action.split(" ")[0] === "area:") { // leader should set a key in ToolsThread.js, like case 111: say("area: " + me.area + " x: " + me.x + " y: " + me.y);
			var la = parseInt(action.split(" ")[1], 10),
				lx = parseInt(action.split(" ")[3], 10),
				ly = parseInt(action.split(" ")[5], 10);

			if (me.area === la) {
				me.overhead("ÿc8moving to leader, area: ÿc0" + la + "ÿc8 x: ÿc0" + lx + "ÿc8 y: ÿc0" + ly);
				Pather.moveTo(lx, ly, 3, true);
			} else {
				if (me.inTown) {
					say("ÿc1I'm in town ÿc0- " + me.area);
				} else {
					say("ÿc1different area, ÿc0cannot get leader position");
				}

				action = "";
			}
		}

		if (action && action.split(":")[0] === "dist") { // used in getCloser function
			dist = (parseInt(action.split(":")[1], 10) > 6 && parseInt(action.split(":")[1], 10) <= 30) ? parseInt(action.split(":")[1], 10) : 6;
			me.overhead("ÿc4distance to leader ÿc0= " + dist);
		}

		if (action.indexOf("talk") > -1) {
			this.talk(action.split(" ")[1]);
		}

		action = "";

		delay(100);
	}

	return true;
}