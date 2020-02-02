[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Perming Options

---

* [Perming with D2BotMuleLog](#perming-with-d2botmulelog)
* [D2BotTimerRefresh](#d2bottimerrefresh)


---

### Perming with D2BotMuleLog

For perming the chars with staying 2h in game, you should use the starter script [D2BotMuleLog](D2BotMuleLog.md/#d2botmulelog) like for muling purpose.

Edit the MuleLogger.js with required info and set the value:

```javascript
	IngameTime: rand(7230, 7290),
```


### D2BotTimerRefresh

If you need only to refresh the countdown timer for your chars, a better choice can be [D2BotTimerRefresh.dbj on github](https://raw.githubusercontent.com/blizzhackers/documentation/master/kolbot/custom-scripts/D2BotTimerRefresh.dbj) saved as D2BotTimerRefresh.dbj in your ...\kolbot\ folder.

This will log on accounts/chars and will keep every char for random 15-25 seconds (line 185) in the lobby, without creating games.

Edit the lines 27-29 with the required info
```javascript
		"account1/password/realm": ["all"],
		"account2/password/realm": ["all"],
		"account3/password/realm": ["all"]
```