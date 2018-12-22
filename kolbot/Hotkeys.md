[general table of content](https://github.com/blizzhackers/documentation/README.md)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot#README.rst)

# Hotkeys
---
* [default keys](#default-keys)
* [changing the default keys](#changing-the-default-keys)
* [d2bs core commands](#d2bs-core-commands)
	* [chat commands](#chat-commands)
	* [white console(layer)](#white-console(layer))
---

## default keys
Here is just a quick run through of what each current key is, and what it will do for bot
<table>
	<tr>
		<th rowspan="2"><b>Javacode - Key</b></th>
		<th colspan="2"><b>ToolsThread.js</b></th>
		<th colspan="2"><b>other scripts</b></th>
	</tr>
	<tr>
		<th><b>variable</b></th>
		<th><b>action</b></th>
		<th><b>variable</b></th>
		<th><b>action</b></th>
	</tr>
	<tr>
  	  	<td>17 - Ctrl</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>19 - Pause/Break</td>
  	  	<td>togglePause()</td>
  	  	<td>Pause/Resume bot</td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>32 - Space</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>FileTools.copy (UserAddon.js)</td>
  	  	<td>copy the charconfig with name of char included </td>
	</tr>
	<tr>
  	  	<td>33 - Page Up</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>34 - Page Down</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>36 - Home</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>45 - Insert</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>c (Test.js)</td>
  	  	<td>print ... </td>
	</tr>
	<tr>
  	  	<td>46 - Delete</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>96 - Num 0</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>getHook("Next Area") (MapThread.js)</td>
  	  	<td>move to next area</td>
	</tr>
	<tr>
  	  	<td>97 - Num 1</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>getHook("Previous Area") (MapThread.js)</td>
  	  	<td>move to previous area</td>
	</tr>
	<tr>
  	  	<td>98 - Num 2</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>getHook("Waypoint") (MapThread.js)</td>
  	  	<td>move to wp</td>
	</tr>
	<tr>
  	  	<td>99 - Num 3</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>getHook("POI") (MapThread.js)</td>
  	  	<td>move to Point of Interest</td>
	</tr>
	<tr>
  	  	<td>100 - Num 4</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>getHook("Side Area") (MapThread.js)</td>
  	  	<td>move to side area</td>
	</tr>
	<tr>
  	  	<td>101 - Num 5</td>
  	  	<td>scriptBroadcast("mule")</td>
  	  	<td>Automuling</td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>102 - Num 6</td>
  	  	<td>MuleLogger.logChar()</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>103 - Num 7</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>Hooks.monsters.enabled (MapThread.js)</td>
  	  	<td>show/hide monsters</td>
	</tr>
	<tr>
  	  	<td>104 - Num 8</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td>Hooks.vector.enabled (MapThread.js)</td>
  	  	<td>show/hide vectors</td>
	</tr>
	<tr>
  	  	<td>105 - Num 9</td>
  	  	<td>print(this.getNearestPreset())</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>106 - Num *</td>
  	  	<td>Precast.doPrecast(true)</td>
  	  	<td>activate the precast/buff</td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>107 - Num +</td>
  	  	<td>showConsole() ...</td>
  	  	<td>print real FCR IAS FBR FHR</td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>109 - Num -</td>
  	  	<td>Misc.spy(me.name)</td>
  	  	<td>Log someone's gear</td>
  	  	<td>go (CrushTele.js)</td>
  	  	<td>autoteleport in strategic areas</td>
	</tr>
	<tr>
  	  	<td>110 - Num decimal .</td>
  	  	<td>say("/fps")</td>
  	  	<td>shows frames/sec</td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>111 - Num /</td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
  	  	<td></td>
	</tr>
	<tr>
  	  	<td>123 - F12</td>
  	  	<td>revealLevel(true)</td>
  	  	<td>show/hide map</td>
  	  	<td></td>
  	  	<td></td>
	</tr>
</table>

## changing the default keys

If you need to change these keys, look to:

* ...\d2bs\kolbot\tools\ToolsThread.js check \\Event functions section lines 342-409

* pause/resume key is also defined in line 37 of ...\d2bs\kolbot\tools\Heartbeat.js for pausing the starter script (before entering in a game)

* ...\d2bs\kolbot\tools\MapThread.js lines 721-724


For a reference on what these can be changed to, visit [javascriptkeycode.com](http://www.javascriptkeycode.com/) or [keycode.info](http://keycode.info/) webpages. Those are all the possible keycodes.

This is just a simple run through, to truly know what each key does, you'll need to test each one out in game.

## d2bs core commands

### chat commands
press <Enter> and type:
* .start -
* .stop - will stop the current scripts. the profile will crash and it will be restarted in few seconds
* .reload - will stop and reload the scripts. you are able to change config while in game.
* .flushcache -
* .load -

### white console(layer)
display status messages out of game as well as in game:
* < HOME > to show/hide console just for viewing
* < ALT >+< HOME > to open the console for input, allows you to type commands into it
* < Page up >/< Page down > scrolls console text when it's open for input.
* the same chat commands without . prefix:
* start -
* stop - will stop the current scripts. the profile will crash and it will be restarted in few seconds
* reload - will stop and reload the scripts. you are able to change config while in game.
* flushcache -
* load
* include - other scripts can be loaded: include("common/prototypes.js");
* any other command is interpreted as a javascript string and will be executed (as per the old .exec).
* all output is directed to the console instead of to the screen.
* < Up arrow > will show the latest command that you typed in the console. Up/Down arrows will show different commands entered in the console
* you can type on the console different javascript lines:
```
	var ip = Number(me.gameserverip.split(".")[3]);
	print("IP of the game: " + ip);
``` 
	and the result will be:
```
	IP of the game: ... (the last part of the IP)
```
* one defined variable (like ip) remains defined in that game, even you type reload in the meantime.
* to find the mouse coordinates type:
```
	getMouseCoords(1);
```
	and you'll get the X, Y coordinates. 
