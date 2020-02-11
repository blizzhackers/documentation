/**
*	@filename	CowOpen.js
*	@author		part of Cows.js by kolton
*	@desc		open cows portal
*/

function CowOpen() {
	this.getLeg = function () {
		var i, portal, wirt, leg, gid;

		if (me.getItem(88)) {
			return me.getItem(88);
		}

		Pather.useWaypoint(4);
		Precast.doPrecast(true);
		Pather.moveToPreset(me.area, 1, 737, 8, 8);

		for (i = 0; i < 6; i += 1) {
			portal = Pather.getPortal(38);

			if (portal) {
				Pather.usePortal(null, null, portal);

				break;
			}

			delay(500);
		}

		if (!portal) {
			throw new Error("Tristram portal not found");
		}

		Pather.moveTo(25048, 5177);

		wirt = getUnit(2, 268);

		for (i = 0; i < 8; i += 1) {
			wirt.interact();
			delay(500);

			leg = getUnit(4, 88);

			if (leg) {
				gid = leg.gid;

				Pickit.pickItem(leg);
				Town.goToTown();

				return me.getItem(-1, -1, gid);
			}
		}

		throw new Error("Failed to get the leg");
	};

	this.getTome = function () {
		var tome,
			myTome = me.findItem("tbk", 0, 3),
			akara = Town.initNPC("Shop", "buy tome");

		tome = me.getItem("tbk");

		if (tome) {
			do {
				if (!myTome || tome.gid !== myTome.gid) {
					return copyUnit(tome);
				}
			} while (tome.getNext());
		}

		if (!akara) {
			throw new Error("Failed to buy tome");
		}

		tome = akara.getItem("tbk");

		if (tome.buy()) {
			tome = me.getItem("tbk");

			if (tome) {
				do {
					if (!myTome || tome.gid !== myTome.gid) {
						return copyUnit(tome);
					}
				} while (tome.getNext());
			}
		}

		throw new Error("Failed to buy tome");
	};

	this.openPortal = function (leg, tome) {
		var i;

		if (!Town.openStash()) {
			throw new Error("Failed to open stash");
		}

		if (!Cubing.emptyCube()) {
			throw new Error("Failed to empty cube");
		}

		if (!Storage.Cube.MoveTo(leg) || !Storage.Cube.MoveTo(tome) || !Cubing.openCube()) {
			throw new Error("Failed to cube leg and tome");
		}

		transmute();
		delay(500);

		for (i = 0; i < 10; i += 1) {
			if (Pather.getPortal(39)) {
				return true;
			}

			delay(200);
		}

		throw new Error("Portal not found");
	};

	var leg, tome;

	// start
	if (me.getQuest(4, 10)) { // already killed the cow king
		throw new Error("Already killed the Cow King.");
	}

	if (!me.getQuest(4, 0)) {
		throw new Error("Cain quest incomplete");
	}

	switch (me.gametype) {
	case 0: // classic
		if (!me.getQuest(26, 0)) { // diablo not completed
			throw new Error("Diablo quest incomplete.");
		}

		break;
	case 1: // expansion
		if (!me.getQuest(40, 0)) { // baal not completed
			throw new Error("Baal quest incomplete.");
		}

		break;
	}

	Town.goToTown(1);
	Town.doChores();

	leg = this.getLeg();
	tome = this.getTome();

	this.openPortal(leg, tome);

	return true;
}