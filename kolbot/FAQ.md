[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# FAQ

---

* [how to avoid "checking versions"?](#how-to-avoid-checking-versions)
* [how to avoid "connecting to the fastest server"?](#how-to-avoid-connecting-to-the-fastest-server)
* [how much I have to wait for an answer?](#how-much-i-have-to-wait-for-an-answer)
* [I have an issue with my bot](#i-have-an-issue-with-my-bot)
* [best version of d2bs](#best-version-of-d2bs)
* [how to change the pause button?](#how-to-change-the-pause-button)
* [pickit issue](#pickit-issue)
* [using d2bs only multiloader](#using-d2bs-only-multiloader)
* [win 8 crash](#win-8-crash)
* [leeching from the same account](#leeching-from-the-same-account)
* [how to add own script](#how-to-add-own-script)
* [mpq or raw keys?](#mpq-or-raw-keys)
* [how many bots in one game](#how-many-bots-in-one-game)
* [fastmod config](#fastmod-config)
* [d2bs sandboxed](#d2bs-sandboxed)
* [D2BS is not responding ... starting profile](#d2bs-is-not-responding--starting-profile)
* [window has unexpectedly exited... starting profile](#window-has-unexpectedly-exited-starting-profile)
* [you were disconnected from d2 server](#you-were-disconnected-from-d2-server)
* [game with that name already exists](#game-with-that-name-already-exists)
* [how can I stop the bot in game, in case of error](#how-can-i-stop-the-bot-in-game-in-case-of-error)
* [the login button is gray](#the-login-button-is-gray)
* [I cannot change account](#I-cannot-change-account)
* [how can I reset the game counter](#how-can-I-reset-the-game-counter)
* [how do I stop hidden d2 windows?](#how-do-I-stop-hidden-d2-windows)

---

## Q / A

### how to avoid "checking versions"?
1. **Q:** Diablo II  login screen is showing "Checking versions..." on every try
2. **A:** you have to add some extra lines in windows hosts file:
* run notepad in admin mode.
* click Open and browse to C:\Windows\System32\drivers\etc\
* choose to see All files in the drop-down list
* open hosts file
* add the line corresponding to your d2 server
```
	34.223.227.224 uswest.battle.net
	44.194.80.159 useast.battle.net
	13.124.4.20 asia.battle.net
	3.66.69.82 europe.battle.net
```
* [@Darkvigilante video guide](https://www.youtube.com/watch?v=vK3jaNttWAU)
* [additional guide](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/)
* in case of servers changes, use the [sysinternal tool](https://docs.microsoft.com/en-us/sysinternals/downloads/tcpview) and search inside this app for **Game** 

### how to avoid "connecting to the fastest server"?
1. **Q:** Diablo II  login screen is showing "Connecting to the fastest server" on every try
2. **A:** check your extra lines in windows C:\Windows\System32\drivers\etc\hosts file, see [previous issue](#how-to-avoid-checking-versions)
* use the [sysinternal tool](https://docs.microsoft.com/en-us/sysinternals/downloads/tcpview) and with Diablo II running, search inside TCPview app for **Game**, and write down the Remote Adress of Game.exe, coresponding to the server you have connected.
* if you wanna play d2 only directly, without d2bs, you could also delete those extra lines from C:\Windows\System32\drivers\etc\hosts file

### how much I have to wait for an answer?
1. **Q:** I've posted a question on forum 5 minutes ago and I still haven't got any answer!!!
2. **A:** remember that we spend our precious time to help you and it's very often impossible to do it immediately. Please try to use the search button and check if your question hasn't been answered before. If not, please wait patiently.

### I have an issue with my bot
1. **Q:** I have a problem with my bot. What should i do??
2. **A:** please [pastebin](https://pastebin.com/) your config and write your current bot version. Explain all issues carefully. It's important to keep your bot up to date using latest version (every update fixes a lot of bugs).
Here you can find [latest kolbot](https://github.com/blizzhackers/kolbot/). Learn [how to keep it updated](https://github.com/blizzhackers/documentation/blob/master/d2bot/Download.md#keep-bot-files-updated).

### best version of d2bs
1. **Q:** which version of D2BS should i use ??
2. **A:** trunk is the latest **stable** version.
* you can use [TortoiseSVN](https://tortoisesvn.net/downloads.html) on <https://github.com/blizzhackers/kolbot/trunk/>
check [download guide](https://github.com/blizzhackers/documentation/tree/master/d2bot/Download.md)

### how to change the pause button?
1. **Q:** I don't have numeric keyboard. Where can I change my pause button ??
2. **A:** you can use this site for new [keys](http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes). Now edit tools/toolsthread.js and find this.keyEvent function.
* check [Hotkeys guide](https://github.com/blizzhackers/documentation/tree/master/kolbot/Hotkeys.md#changing-the-default-keys)

### pickit issue
1. **Q:** I have a problem with my pickit.
2. **A:** please check this page about - <https://github.com/blizzhackers/pickits>

### using d2bs only multiloader
1. **Q:** How I can use the dbs only as multiloader, without loading any scripts?
2. **A:** use the **-L -w** parameters in the profile.

### win 8 crash
1. **Q:** win8 crash issue
2. **A:** you need to run d2bot# manager as admin and in compatibility mode. Windows 7 compatibility mode is tested and works. Try to either start hidden (tools menu) or start without minimizing (visible tick in profile editor). The win8 issue is with how the window is minimized.

### leeching from the same account
1. **Q:** leeching from the same account.
2. **A:** leeching from same account isn't supported, and it's a bad idea. You cannot have in the same time 2 characters from the same account on d2 server lobby screen.

### how to add own script
1. **Q:** I want to run my own script.
2. **A:** you need 3 things to match in order for script to work:
* Myownscript.js in bots folder
* function Myownscript() in the script
* Scripts.Myownscript = true; in char config

### mpq or raw keys?
1. **Q:** can I use mpq or raw keys in profle manager?
2. **A:** you can use them both i.e raw keys and mpq for the same list or profile. - see [d2bs Keylist](https://github.com/blizzhackers/documentation/tree/master/d2bot/Keylist.md)

### how many bots in one game
1. **Q:** is it possible to run more than 4 bots in one game?
2. **A:** yes it is. Even on d2 main server, since 1st June 2017 are allowed 8 players in the same game, with same IP.

### fastmod config
1. **Q:** fastmod config or packet casting.
2. **A:** read carefully explanations in [Character config](https://github.com/blizzhackers/documentation/blob/master/kolbot/CharacterConfig.md/#fastmod-config)

### d2bs sandboxed
1. **Q:** Sandboxie
2. **A:** it's not working with d2bs manager anymore.

### D2BS is not responding ... starting profile
1. **Q:** I get all the time "D2BS is not responding... starting profile"
2. **A:** update D2BS to latest version.

* check if you run the 1.14d patch of Diablo II. Try to run D2LoD directly, using a Diablo II shortcut with windowed (-w) parameter.
* check the installed MS dependencies (VC++ 2005, 2008, 2010 and .NET Framework 3.5, 4 or higher installed). try to re-install those MS dependencies https://github.com/blizzhackers/documentation/blob/master/d2bot/ManagerSetup.md/#install-dependencies
* you can get this error and several crashes when there are differences between ...\d2bs\d2bs.ini and ...\data\profile.json. When the manager correct the errors that profile will start just fine.

* previous versions of d2bs released before the current with utf-8 encoding had other issues like:
	* if you have TeamViewer installed and you have **<->** icon. click ok it and disable.
	* check if the parent folders of D2BS should not have special character like accents in their names (if d2bs folder it's located on Desktop, maybe the username have them). Move the d2bs folder to root of drive C:\, D:\ . Place on desktop only the shortcut to D2Bot.exe.

### window has unexpectedly exited... starting profile
1. **Q:** I see on d2bs console "Window has unexpectedly exited... starting profile" when I start a profile
2. **A:** you must run Diablo II windowed (-w parameter) on windows 8 or 10, otherwise the d2 game will crash.

* check your Diablo II folder. It should have the 1.14d patch, Try to connect directly on d2 server using a shortcut to Diablo.exe with -w parameter. If your d2 folder it's ok, you should have no issues to connect manually on the d2 server.
* remove the "-3dfx" parameter from the profile, maybe it's causing the d2 crash (the crash is when enter in the game with glide activated).
* recheck your starter script, use [Esprima: Syntax Validator](http://esprima.org/demo/validate.html) if you edited that.
* if it's the first run and you get this issue, you can try to move your Diablo II folder, and update the d2bs profile with that path
```
	D2BS is not responding... starting profile
	Crash Info: Script: none Area: out of game
	Window has unexpectedly exited... starting profile
	Crash Info: Script: none Area: out of game
```
* check ...\d2bs\d2bs.log file to find the error
* check ...\d2bs\kolbot\logs\ScriptErrorLog.txt if any
* check windows Event Viewer > Windows Logs > Application and filter it for critical and error events. look for game.exe error events. you can find some descriptions of error like:
* Exception code: 0xc0000005 (Access Violation error)
* Exception code: 0xc000000d
* increase the value of this variable from starter script
```
	CrashDelay: 5, // Seconds to wait after a d2 window crash
```
* run D2Maintenance - CCleaner or batch file. use CCleaner registry tool.
* for **Exception code: 0xc0000005**, see some guides (or use google to find):
* https://compfreakstars.blogspot.com/2011/11/0xc0000005-error-every-day-many.html
* https://stackoverflow.com/questions/14949904/what-do-i-do-when-my-program-crashes-with-exception-0xc0000005-at-address-0
* http://www.errorlive.com/exception-code-0xc0000005

### you were disconnected from d2 server
1. **Q:** I get all the time d2 error when it's opened by D2BS: "You were disconnected from d2 server. Please reconnect" 
2. **A:** clone your profile, and in the Key List field of cloned profile set none, and the default (installation) keyset will be loaded. Set properly your [d2bs Keylist](https://github.com/blizzhackers/documentation/tree/master/d2bot/Keylist.md).

### game with that name already exists
1. **Q:** The leader get "Game With That Name Already Exists" on d2 server, but all followers get "the game does not exist" message when they attempt to join.
2. **A:** Remove the spaces from the name of the game on leader's profile. 

### how can I stop the bot in game, in case of error
1. **Q:** the bot enters in the game and I saw some lines indicating errors on the white console layer
2. **A:** press < HOME > or < ESC > to cancel the console, then press Pause/Break key.

* Press in-game command < M > to see messages
* check your scripts related to the errors, recheck the data fields you have entered on last untested edit.
* when you finished the editing, type .reload , and the scripts will be stopped then reloaded. this command will also look for the configuration file, and cannot be used in mule logging games, by example.

### the login button is gray
1. **Q:** I got it to start but when it types in user and password fields it wont login. The login button is gray.
2. **A:** it's something wrong in your accountname/password fields. Maybe the password is too long, or the account name isn't spelled correctly, case sensitive.

### I cannot change account
1. **Q:** I'm playing manually and I cannot change the first account with I did the first log in. Even I enter other account the character screen will be for the first account, or in the worst case an empty character selection screen with Connecting ... 
2. **A:** Uncheck the "RD Blocker" box, because that is causing it. In the [guide](https://github.com/blizzhackers/documentation/blob/master/d2bot/ManagerSetup.md/#create-a-profile) is written:
> 19. Enables RD Block (**don't enable unless you know what you are doing**)
* it does nothing useful for most people

### how can I reset the game counter
1. **Q:** the auto reset is set to 999 (ResetCount: 999) in the starter script (D2BotLead.dbj), but how I can reset this manually to start again with 1
2. **A:** select that profile and R-click it. Choose "Reset Stats". If this isn't working, you can try other method: stop bots and close the manager. edit in np++ the profile.json file, changing the values for a several fields with 0

### how do I stop hidden d2 windows?
1. **Q:** bot crashed but I think that the d2 is still running in the background
2. **A:** on the manager click Settings > Close Game.exe. You'll get a confirmation message. Other method is to use windows task manager, and if you are seeing Game.exe, R-click and choose End task

## support
* https://github.com/blizzhackers/kolbot/issues
* [discord #support](https://discordapp.com/channels/430522386253611018/430522508026839051)
* [blizzhackers.discourse.group #support](https://blizzhackers.discourse.group/c/support/14)
