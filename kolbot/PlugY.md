[General Table of Contents](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[Kolbot Table of Contents](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# PlugY Setup for Single Player botting

---

* [Installing PlugY](#installing-plugy)

* [Configuring D2BS and kolbot for PlugY](#configuring-d2bs-and-kolbot-for-plugy-single-player)

---

## Installing PlugY

1. Download PlugY the ZIP version not the recommended installer version from the [official website](http://plugy.free.fr/PlugY_The_Survival_Kit_v14.03.zip)

2. Download the [PlugY D2FilePatcher](http://plugy.free.fr/PlugY_The_Survival_Kit_v14.03_D2FilePatcher.zip)

3. Extract both ZIP files to your Diablo II folder.

4. Run the PatchD2File.exe and select Yes.

---

## Configuring D2BS and Kolbot for PlugY single player.

1. If want to play only Single Player and set PlugY stash enabled for all your characters and profiles:

    a) Go to \d2bs\kolbot\libs\core and open Config.js

    b) Find and set the line PlugYStash: true,

2. To set PlugY stash to enabled only for a certain character:

    a) Go to \d2bs\kolbot\libs\config\yourcharacterconfig.js

    b) Add after line18 - Config.SortSettings.PlugYStash = true;

4. In D2Bot.exe make sure the path is set to Game.exe and not PlugY.exe!

5. In-game make sure the first 2 pages of your PlugY stash are empty.
