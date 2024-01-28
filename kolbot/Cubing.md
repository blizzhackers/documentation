[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Cubing

You should enable the cubing. If your toon hasn't the horadric cube, at the game's beginning he will travel to act 2 to get it.
```javascript
  /* 
   * All recipe names are available in Templates/Cubing.txt. For item names/classids check core/GameData/NTItemAlias.js
   * The format is Config.Recipes.push([recipe_name, item_name_or_classid, etherealness]).
   * Etherealness is optional and only applies to some recipes.
   */
  Config.Cubing = true; // Set to true to enable cubing.
```
---

### gems

- for cubing the gems with lower quality than flawless, check https://github.com/blizzhackers/documentation/blob/master/kolbot/MiscellaneousOptions.md/#cubing-all-kind-of-gems
```javascript
  // Ingredients for the following recipes will be auto-picked, for classids check libs/core/GameData/NTItemAlias.js

  // Config.Recipes.push([Recipe.Gem, "Flawed Amethyst"]); // make Flawed Amethyst
  // Config.Recipes.push([Recipe.Gem, "Flawed Topaz"]); // make Flawed Topaz
  // Config.Recipes.push([Recipe.Gem, "Flawed Sapphire"]); // make Flawed Sapphire
  // Config.Recipes.push([Recipe.Gem, "Flawed Emerald"]); // make Flawed Emerald
  // Config.Recipes.push([Recipe.Gem, "Flawed Ruby"]); // make Flawed Ruby
  // Config.Recipes.push([Recipe.Gem, "Flawed Diamond"]); // make Flawed Diamond
  // Config.Recipes.push([Recipe.Gem, "Flawed Skull"]); // make Flawed Skull

  // Config.Recipes.push([Recipe.Gem, "Amethyst"]); // make Amethyst
  // Config.Recipes.push([Recipe.Gem, "Topaz"]); // make Topaz
  // Config.Recipes.push([Recipe.Gem, "Sapphire"]); // make Sapphire
  // Config.Recipes.push([Recipe.Gem, "Emerald"]); // make Emerald
  // Config.Recipes.push([Recipe.Gem, "Ruby"]); // make Ruby
  // Config.Recipes.push([Recipe.Gem, "Diamond"]); // make Diamond
  // Config.Recipes.push([Recipe.Gem, "Skull"]); // make Skull

  // Config.Recipes.push([Recipe.Gem, "Flawless Amethyst"]); // make Flawless Amethyst
  // Config.Recipes.push([Recipe.Gem, "Flawless Topaz"]); // make Flawless Topaz
  // Config.Recipes.push([Recipe.Gem, "Flawless Sapphire"]); // make Flawless Sapphire
  // Config.Recipes.push([Recipe.Gem, "Flawless Emerald"]); // make Flawless Emerald
  // Config.Recipes.push([Recipe.Gem, "Flawless Ruby"]); // make Flawless Ruby
  // Config.Recipes.push([Recipe.Gem, "Flawless Diamond"]); // make Flawless Diamond
  // Config.Recipes.push([Recipe.Gem, "Flawless Skull"]); // make Flawless Skull

  Config.Recipes.push([Recipe.Gem, "Perfect Amethyst"]); // Make Perfect Amethyst
  Config.Recipes.push([Recipe.Gem, "Perfect Topaz"]); // Make Perfect Topaz
  Config.Recipes.push([Recipe.Gem, "Perfect Sapphire"]); // Make Perfect Sapphire
  Config.Recipes.push([Recipe.Gem, "Perfect Emerald"]); // Make Perfect Emerald
  Config.Recipes.push([Recipe.Gem, "Perfect Ruby"]); // Make Perfect Ruby
  Config.Recipes.push([Recipe.Gem, "Perfect Diamond"]); // Make Perfect Diamond
  Config.Recipes.push([Recipe.Gem, "Perfect Skull"]); // Make Perfect Skull
```

### essences
```javascript
  // Ingredients for the following recipes will be auto-picked, for classids check libs/core/GameData/NTItemAlias.js

  // Config.Recipes.push([Recipe.Token]); // Make Token of Absolution
```

### runes

```javascript
  // Ingredients for the following recipes will be auto-picked, for classids check libs/core/GameData/NTItemAlias.js

  // Config.Recipes.push([Recipe.Rune, "Eld Rune"]); // Upgrade El to Eld
  // Config.Recipes.push([Recipe.Rune, "Tir Rune"]); // Upgrade Eld to Tir
  // Config.Recipes.push([Recipe.Rune, "Nef Rune"]); // Upgrade Tir to Nef
  // Config.Recipes.push([Recipe.Rune, "Eth Rune"]); // Upgrade Nef to Eth
  // Config.Recipes.push([Recipe.Rune, "Ith Rune"]); // Upgrade Eth to Ith
  // Config.Recipes.push([Recipe.Rune, "Tal Rune"]); // Upgrade Ith to Tal
  // Config.Recipes.push([Recipe.Rune, "Ral Rune"]); // Upgrade Tal to Ral
  // Config.Recipes.push([Recipe.Rune, "Ort Rune"]); // Upgrade Ral to Ort

  // Config.Recipes.push([Recipe.Rune, "Thul Rune"]); // Upgrade Ort to Thul
  // Config.Recipes.push([Recipe.Rune, "Amn Rune"]); // Upgrade Thul to Amn
  // Config.Recipes.push([Recipe.Rune, "Sol Rune"]); // Upgrade Amn to Sol
  // Config.Recipes.push([Recipe.Rune, "Shael Rune"]); // Upgrade Sol to Shael
  // Config.Recipes.push([Recipe.Rune, "Dol Rune"]); // Upgrade Shael to Dol
  // Config.Recipes.push([Recipe.Rune, "Hel Rune"]); // Upgrade Dol to Hel
  // Config.Recipes.push([Recipe.Rune, "Io Rune"]); // Upgrade Hel to Io
  // Config.Recipes.push([Recipe.Rune, "Lum Rune"]); // Upgrade Io to Lum
  // Config.Recipes.push([Recipe.Rune, "Ko Rune"]); // Upgrade Lum to Ko
  // Config.Recipes.push([Recipe.Rune, "Fal Rune"]); // Upgrade Ko to Fal
  // Config.Recipes.push([Recipe.Rune, "Lem Rune"]); // Upgrade Fal to Lem

  Config.Recipes.push([Recipe.Rune, "Pul Rune"]); // Upgrade Lem to Pul
  Config.Recipes.push([Recipe.Rune, "Um Rune"]); // Upgrade Pul to Um
  Config.Recipes.push([Recipe.Rune, "Mal Rune"]); // Upgrade Um to Mal
  Config.Recipes.push([Recipe.Rune, "Ist Rune"]); // Upgrade Mal to Ist
  Config.Recipes.push([Recipe.Rune, "Gul Rune"]); // Upgrade Ist to Gul
  Config.Recipes.push([Recipe.Rune, "Vex Rune"]); // Upgrade Gul to Vex
```

### crafting

In your pickit file you may specify the level for the base items:
```javascript
// Crafting gear
[name] == vampirebonegloves && [quality] == magic && [level] >= 94 # // Diablo/Baal
[name] == mithrilcoil && [quality] == magic && [level] >= 94 # // Diablo/Baal
[type] == ring && [quality] == magic && [level] >= 94 # // Diablo/Baal
[type] == amulet && [quality] == magic && [level] >= 94 # // Diablo/Baal
```
Blood - Caster - Hit Power - Safety   Recipes
```javascript
	// Ingredients for the following recipes will be auto-picked, for classids check libs/core/GameData/NTItemAlias.js

	//Config.Recipes.push([Recipe.Blood.Helm, "Armet"]); // Craft Blood Helm
	//Config.Recipes.push([Recipe.Blood.Boots, "Mirrored Boots"]); // Craft Blood Boots
	//Config.Recipes.push([Recipe.Blood.Gloves, "Vampirebone Gloves"]); // Craft Blood Gloves
	//Config.Recipes.push([Recipe.Blood.Belt, "Mithril Coil"]); // Craft Blood Belt
	//Config.Recipes.push([Recipe.Blood.Shield, "Blade Barrier"]); // Craft Blood Shield
	//Config.Recipes.push([Recipe.Blood.Body, "Hellforge Plate"]); // Craft Blood Armor
	//Config.Recipes.push([Recipe.Blood.Amulet]); // Craft Blood Amulet
	//Config.Recipes.push([Recipe.Blood.Ring]); // Craft Blood Ring
	//Config.Recipes.push([Recipe.Blood.Weapon, "Berserker Axe"]); // Craft Blood Weapon

	//Config.Recipes.push([Recipe.Caster.Helm, "Demonhead Mask"]); // Craft Caster Helm
	//Config.Recipes.push([Recipe.Caster.Boots, "Wyrmhide Boots"]); // Craft Caster Boots
	//Config.Recipes.push([Recipe.Caster.Gloves, "Bramble Mitts"]); // Craft Caster Gloves
	//Config.Recipes.push([Recipe.Caster.Belt, "Vampirefang Belt"]); // Craft Caster Belt
	//Config.Recipes.push([Recipe.Caster.Shield, "Luna"]); // Craft Caster Shield
	//Config.Recipes.push([Recipe.Caster.Body, "Archon Plate"]); // Craft Caster Armor
	//Config.Recipes.push([Recipe.Caster.Amulet]); // Craft Caster Amulet
	//Config.Recipes.push([Recipe.Caster.Ring]); // Craft Caster Ring
	//Config.Recipes.push([Recipe.Caster.Weapon, "Seraph Rod"]); // Craft Caster  Weapon

	//Config.Recipes.push([Recipe.HitPower.Helm, "Giant Conch"]); // Craft Hit Power Helm
	//Config.Recipes.push([Recipe.HitPower.Boots, "Boneweave Boots"]); // Craft Hit Power Boots
	//Config.Recipes.push([Recipe.HitPower.Gloves, "Vambraces"]); // Craft Hit Power Gloves
	//Config.Recipes.push([Recipe.HitPower.Belt, "Troll Belt"]); // Craft Hit Power Belt
	//Config.Recipes.push([Recipe.HitPower.Shield, "Ward"]); // Craft Hit Power Shield
	//Config.Recipes.push([Recipe.HitPower.Body, "Kraken Shell"]); // Craft Hit Power Armor
	//Config.Recipes.push([Recipe.HitPower.Amulet]); // Craft Hit Power Amulet
	//Config.Recipes.push([Recipe.HitPower.Ring]); // Craft Hit Power Ring
	//Config.Recipes.push([Recipe.HitPower.Weapon, "Scourge"]); // Craft Hit Power Weapon | "Blunt" = All maces, rods (+50% Undead), excepting orbs

	//Config.Recipes.push([Recipe.Safety.Helm, "Corona"]); // Craft Safety Helm
	//Config.Recipes.push([Recipe.Safety.Boots, "Myrmidon Boots"]); // Craft Safety Boots
	//Config.Recipes.push([Recipe.Safety.Gloves, "Ogre Gauntlets"]); // Craft Safety Gloves
	//Config.Recipes.push([Recipe.Safety.Belt, "Spiderweb Sash"]); // Craft Safety Belt
	//Config.Recipes.push([Recipe.Safety.Shield, "Monarch"]); // Craft Safety Shield
	//Config.Recipes.push([Recipe.Safety.Body, "Great Hauberk"]); // Craft Safety Armor
	//Config.Recipes.push([Recipe.Safety.Amulet]); // Craft Safety Amulet
	//Config.Recipes.push([Recipe.Safety.Ring]); // Craft Safety Ring
	//Config.Recipes.push([Recipe.Safety.Weapon, "Matriarchal Javelin"]); // Craft Safety Weapon
	//Config.Recipes.push([Recipe.Safety.Weapon, "Matriarchal Spear"]); // Craft Safety Weapon

```
The required status for crafted items should also be added in the pickit, like in [default lines 741-771 of kolton.nip](https://github.com/blizzhackers/kolbot/blob/master/d2bs/kolbot/pickit/kolton.nip#L741-L771)

If you wanna sell the crafted items, instead default dropping, check https://github.com/blizzhackers/documentation/blob/master/kolbot/MiscellaneousOptions.md/#sell-cubing-items

### reroll magic/rare items

```javascript
	// The gems not used by other recipes will be used for magic item rerolling.

	//Config.Recipes.push([Recipe.Reroll.Magic, "Diadem"]); // Reroll magic Diadem
	//Config.Recipes.push([Recipe.Reroll.Magic, "Grand Charm"]); // Reroll magic Grand Charm (ilvl 91+)


	// the cubing formula: 6 Perfect Skulls + 1 Rare Item = 1 random low quality rare item of the same type
	//Config.Recipes.push([Recipe.Reroll.Rare, "Diadem"]); // Reroll rare Diadem


	// the cubing formula: 1 Perfect Skull + 1 Rare Item + Stone of Jordan = 1 high quality new rare item of the same type
	//Config.Recipes.push([Recipe.Reroll.HighRare, "Diadem"]); // Reroll high rare Diadem
```

### socketing

```javascript
	/* Base item for the following recipes must be in pickit. The rest of the ingredients will be auto-picked.
	 * Use Roll.Eth, Roll.NonEth or Roll.All to determine what kind of base item to roll - ethereal, non-ethereal or all.
	 */
	//Config.Recipes.push([Recipe.Socket.Weapon, "Thresher", Roll.Eth]); // Socket ethereal Thresher
	//Config.Recipes.push([Recipe.Socket.Weapon, "Cryptic Axe", Roll.Eth]); // Socket ethereal Cryptic Axe
	//Config.Recipes.push([Recipe.Socket.Armor, "Sacred Armor", Roll.Eth]); // Socket ethereal Sacred Armor
	//Config.Recipes.push([Recipe.Socket.Armor, "Archon Plate", Roll.Eth]); // Socket ethereal Archon Plate
```

### unique upgrades

```javascript
	/* Base item for the following recipes must be in pickit. The rest of the ingredients will be auto-picked.
	 * Use Roll.Eth, Roll.NonEth or Roll.All to determine what kind of base item to roll - ethereal, non-ethereal or all.
	 */

	//Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Heavy Gloves", Roll.NonEth]); // Upgrade Bloodfist to Exceptional
	//Config.Recipes.push([Recipe.Unique.Armor.ToExceptional, "Light Gauntlets", Roll.NonEth]); // Upgrade Magefist to Exceptional
	//Config.Recipes.push([Recipe.Unique.Armor.ToElite, "Sharkskin Gloves", Roll.NonEth]); // Upgrade Bloodfist or Grave Palm to Elite (ladder)
	//Config.Recipes.push([Recipe.Unique.Armor.ToElite, "Battle Gauntlets", Roll.NonEth]); // Upgrade Magefist or Lavagout to Elite (ladder)
	//Config.Recipes.push([Recipe.Unique.Armor.ToElite, "War Boots", Roll.NonEth]); // Upgrade Gore Rider to Elite (ladder)
```

---

## runeword
You should enable the making of runewords.

```javascript
	/* Runeword config. All recipes are available in Templates/Runewords.txt
	 * Keep lines follow pickit format and any given runeword is tested vs ALL lines so you don't need to repeat them
	 */
	Config.MakeRunewords = true; // Set to true to enable runeword making/rerolling

	Config.Runewords.push([Runeword.Insight, "Thresher", Roll.Eth]); // Make ethereal Insight Thresher
	Config.Runewords.push([Runeword.Insight, "Cryptic Axe", Roll.Eth]); // Make ethereal Insight Cryptic Axe
	//Config.Runewords.push([Runeword.Insight, "Great Poleaxe"]); // Make Insight Great Poleaxe
	//Config.Runewords.push([Runeword.Insight, "Giant Thresher"]); // Make Insight Giant Thresher
	Config.Runewords.push([Runeword.Insight, "Colossus Voulge"]); // Make Insight Colossus Voulge
	Config.KeepRunewords.push("[type] == polearm # [meditationaura] == 17"); // medium Insight
	//Config.KeepRunewords.push("[type] == polearm # [meditationaura] == 17 && [enhanceddamage] >= 260 && [attackrate] >= 250"); // perfect Insight

	Config.Runewords.push([Runeword.Grief, "Phase Blade"]); // Make Grief Phase Blade	
	//Config.Runewords.push([Runeword.Grief, "Berserker Axe"]); // Make Grief Berserker Axe	
	Config.KeepRunewords.push("([type] == sword || [type] == axe) # [plusmaxdamage] >= 390"); // medium Grief
	//Config.KeepRunewords.push("([type] == sword || [type] == axe) # [itemfasterattackrate] >= 40 && [plusmaxdamage] >= 400"); // perfect Grief  and *optional [itempiercepois] >= 25

	Config.Runewords.push([Runeword.CallToArms, "Crystal Sword"]); // Make CTA Crystal Sword
	Config.Runewords.push([Runeword.CallToArms, "Phase Blade"]); // Make CTA Phase Blade
	//Config.Runewords.push([Runeword.CallToArms, "Flail"]); // Make CTA Flail
	//Config.KeepRunewords.push("[name] == crystalsword || [name] == phaseblade || [name] == flail # [plusskillbattlecommand] >= 3 && [plusskillbattleorders] >=3");
	Config.KeepRunewords.push("[name] == crystalsword || [name] == phaseblade || [name] == flail # [plusskillbattlecommand] >= 6 && [plusskillbattleorders] >=6 && ["plusskillbattlecry"] >= 4"); // perfect CTA and *optional [enhanceddamage] = 290%

	Config.Runewords.push([Runeword.Spirit, "Crystal Sword"]); // Make Spirit Crystal Sword
	Config.Runewords.push([Runeword.Spirit, "Broad Sword"]); // Make Spirit Broad Sword
	//Config.Runewords.push([Runeword.Spirit, "Battle Sword"]); // Make Spirit Battle Sword
	//Config.Runewords.push([Runeword.Spirit, "Phase Blade"]); // Make Spirit Phase Blade	
	Config.Runewords.push([Runeword.Spirit, "Monarch", Roll.NonEth]); // Make Spirit Monarch
	Config.Runewords.push([Runeword.Spirit, "Sacred Targe", Roll.NonEth]); // Make Spirit Sacred Targe
	Config.Runewords.push([Runeword.Spirit, "Kurast Shield"]); // Make Spirit Kurast Shield
	//Config.Runewords.push([Runeword.Spirit, "Vortex Shield"]); // Make Spirit Vortex Shield
	Config.KeepRunewords.push("[type] == sword || [type] == shield || [type] == auricshields # [fcr] == 35"); // middle spirit
	//Config.KeepRunewords.push("[type] == sword || [type] == shield || [type] == auricshields # [fcr] == 35") && [maxmana] >= 112 && [itemabsorbmagic] >=8; // perfect spirit

	//Config.Runewords.push([Runeword.Prudence, "Sacred Armor", Roll.Eth]); // Make ethereal Prudence Sacred Armor
	//Config.KeepRunewords.push("[type] == Armor # [enhanceddefense] == 170 && [fireresist] == 35");
```