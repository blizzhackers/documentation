/**
*	@filename	BattleOrders.js
*	@author		nag0k
*	@desc		give Battle Orders buff modded for hardcore, with barbarian waiting whole game on Catacombs 2 wp
*				- the values in lines 12-14 are customizable. 
*				- in barbarian config file you should have Scripts.BattleOrders = true; and Config.QuitList = ["..."]; should be completed.
*				- other chars should have in the running area scripts the lines to get the wp where Boer is
*				- check https://github.com/blizzhackers/documentation/blob/master/kolbot/MiscellaneousOptions.md/#modded-battleordersjs
*/

const BattleOrders = () => {
	const BO_WP = 35; // area to buff - 35 is catacombs level 2
	const TOWN_NEARBY_MONSTER = true; // go to town if monsters nearby
	const TOWN_MANA = 20; // go refill mana if mana drops below this percent

	const shouldHealMana = amount => me.mp < Math.floor(me.mpmax * amount / 100)

	const healMana = () => {
		Pather.useWaypoint(1);
		Town.initNPC("Heal", "heal");
		Pather.useWaypoint(BO_WP);
	};

	const shouldBuff = unit => (
		Misc.inMyParty(unit) &&
		getDistance(me, unit) < 10 &&
		unit.name !== me.name &&
		!unit.dead &&
		!unit.inTown
	)	

	const giveBuff = () => {
		const unit = getUnit(0);

		do {
			if (shouldBuff(unit)) {
				Precast.doPrecast(true);
			}
		} while(unit.getNext());
	};

	const monsterNear = () => {
		const unit = getUnit(1);

		if (unit) {
			do {
				if (Attack.checkMonster(unit) && getDistance(me, unit) < 20) {
					return true;
				}
			} while(unit.getNext());
		}

		return false;
	};

	if (!Config.QuitList) {
		showConsole();
		print('Set Config.QuitList in character settings');
		print('If you don\'t I will idle indefinitely');
	}

	if (me.playertype && Config.LifeChicken <= 0) {
		showConsole();
		print('ON HARDCORE');
		print('YOU SHOULD SET CHICKEN LIFE');
		print('MONSTERS CAN FIND THEIR WAY TO WPS..');
	}

	if (shouldHealMana(TOWN_MANA)) {
		Town.initNPC("Heal", "heal");
	}

	Town.heal(); // incase our life is low as well
	
	try {
		Pather.useWaypoint(BO_WP);
	} catch (e) {
		showConsole();
		print('Failed to move to BO WP');
		print('Make sure I have ' + Pather.getAreaName(BO_WP) + ' waypoint');
		delay(20000);

		return true;
	}

	Pather.moveTo(me.x + 4, me.y + 4);

	while (true) {
		giveBuff();

		if (TOWN_NEARBY_MONSTER && monsterNear()) {
			if (!Pather.useWaypoint(1)) {
				break;
			}
		}

		if (shouldHealMana(TOWN_MANA)) {
			healMana();
		}

		delay(25);
	}

	return true;
}