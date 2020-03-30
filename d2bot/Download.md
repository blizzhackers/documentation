[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[d2bot table of content](https://github.com/blizzhackers/documentation/tree/master/d2bot/#d2bot)

---

# Download

---

* [requirements](#requirements)
* [download with tortoiseSVN](#download-with-tortoiseSVN)
* [compatibility](#compatibility)
* [keep bot files updated](#keep-bot-files-updated)

---

### requirements

you need these to be installed:

* [Microsoft Visual C++ 2010 Redistributable Package (x86)](https://www.microsoft.com/en-us/download/details.aspx?id=5555)
* [Microsoft .NET Framework 4.0 (or higher)](https://dotnet.microsoft.com/download/dotnet-framework)

### download with tortoiseSVN

* install [Tortoise SVN](https://tortoisesvn.net/downloads.html)

* on your local hard drive, create a folder for D2BS and name it whatever you want.

* R-click that folder 

![tortoise1](assets/d2bot-tortoise1.png)

 and use SVN Checkout... 
 
 ![tortoise2](assets/d2bot-tortoise2.png)
 
 at <https://github.com/blizzhackers/kolbot/trunk> (! use this link only for Tortoise SVN, for browser it become https://github.com/blizzhackers/kolbot/tree/master)
 - using <https://github.com/blizzhackers/kolbot/> will have the result of downloading the whole tree of repository.

* let the default option for Checkout Depth drop down list = Fully recursive

* press "OK".

![tortoise3](assets/d2bot-tortoise3.png): finishing download 1

![tortoise4](assets/d2bot-tortoise4.png): finishing download 2

* after download is finished, open that folder and R-click D2Bot.exe and click Send to > Desktop (create shortcut)

![tortoise5](assets/d2bot-tortoise5.png)

### compatibility

* R-click the D2Bot.exe shortcut and choose Properties. follow the 4th steps

* ![d2bot compatibility](assets/d2bot-compatibility.png)

* for Win 8 if you get issues, choose either "Run this program in compatibility mode for Windows 7"


### keep bot files updated

* download the d2bot-with-kolbot files using [tortoiseSVN](#download-with-tortoiseSVN)
* use SVN Update option when R-click the d2bs(d2bot-with-kolbot) folder
* use TortoiseSVN [project monitor](https://github.com/blizzhackers/documentation/blob/master/d2bot/Autoupdate.md/#tortoisesvn-project-monitor)

* if you downloaded the bot files from older repository <https://github.com/kolton/d2bot-with-kolbot/> and you wanna switch to the newer repository <https://github.com/blizzhackers/kolbot>
	* delete the hidden .svn folder, the newer repository is a stand alone one, with its origin from a fork of an older repo.
	* then you can use tortoiseSVN Checkout from a new url <https://github.com/blizzhackers/kolbot/trunk>.
	* before proceeding check the paths and correct them.
	* here you'll get a warning for checkout in a non-empty folder. bypass it and it will be ok.
