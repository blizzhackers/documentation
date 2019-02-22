# Limedrop Guide

* [About](#about-limedrop)
* [Setup](#setup-limedrop)
* [Usage](#using-limedrop)
* [FAQ](#frequently-asked-questions)

-----

### About Limedrop
##### What is it?
Limedrop is a web-based item **dropper**; it is a program that will manage joining games and dropping specific items.

##### How do I install it?
Limedrop is an API added to D2Bot # and a web-based frontend. The d2bot-with-kolbot [kolbot](https://github.com/kolton/d2bot-with-kolbot) has Limedrop built in.

##### How does it work?
There are two parts to Limedrop. One part is the API, and one part is a web page that calls the API. The web page is can be accessed at www.limedrop.org

When the web page requests an item, Limedrop will launch the configured profile, join the game specified, and drop the item(s) selected.

##### Self-hosting
If you want to access the latest version, use www.limedrop.org, if you would like to host the static front-end yourself, you can download it [here](https://github.com/noah-/Limedrop) and copy it to the "Limedrop" folder of your d2bot-with-kolbot download.

If you're using Git to clone d2bot-with-kolbot it will ask you if you want to automatically download the sub-repository.

##### Hosted (recommended)
You can also use the externally hosted version here: [http://www.limedrop.org](http://www.Limedrop.org)

The benefit of this version is that it is always up-to-date

**Note:** If you want to access Limedrop from an external network you will need to open router ports. The frontend only delivers the static site, it uses your instance of D2Bot to power the API. Note, the Limedrop API has not been security tested so if you choose to open your network externally, you need to assume all risks associated with that.

### Setup Limedrop
1. Download the Limedrop version from [here](https://github.com/kolton/d2bot-with-kolbot/archive/master.zip) or clone from: _https://github.com/kolton/d2bot-with-kolbot.git_

1. Extract to a folder:
	![Extracted Files](assets/limedrop-extract.png)

1. Edit the server.json config file:
	* ![Server Config File](assets/limedrop-serverconfigfile.png)
	* ![Server Config Edit](assets/limedrop-serverconfigedit.png)
	* This default config says to:
		* Use the D2BS profile called "GameAction"
		* Create a user with the name "public", password "public" who **is not** able to drop items
		* Create a user with the name "test", password "test" who **is** able to drop items
		* The path to the web page files are in the "\limedrop" folder underneath the D2BS directory
		* The IP we will respond on is "localhost" (also known as 127.0.0.1)
			* If you want to access from another computer, you will need to use your real local IP like 192.168.1.100
        * The Port we will listen on is 8080
	
1. Turn on D2Bot and enable the Limedrop API by going to "Settings" and clicking the enable API option.

1. Follow the standard setup guide for adding cdkeys.

1. Create a new profile, we will use GameAction for an example - this needs to match what is in server.json
	* Make sure you set your own game name to avoid conflicts with other people
		* ![Add Profile](assets/limedrop-addprofile.png)
    * Make sure you use the D2BotGameAction.dbj as the Entry Script

		
### Using Limedrop
To start Limedrop, just open D2BS.exe . You DO NOT have to launch the profile manually.
Limedrop will launch the profile on its own when it needs to do something.

#### Logging In
* To login, either go to [http://www.limedrop.org](http://www.Limedrop.org) or your self-hosted page
* At the upper right, click the profile icon to log in:
	* ![Login](assets/limedrop-login.png)
	* Enter your server address (including port) according to your server config
	* Enter your username
	* Enter your password
	* **Click Login**
		* Right now you have to manually click Login. You cannot just press enter.

#### Muling Options
* You can create a profile using the standard MuleLogger profile
	* All mules logged this way will appear in the Limedrop web page

* You can use the Web Interface to manually add a whole profile, or a single character:
	* ![AddAccount1](assets/limedrop-addaccount1.png)
	* ![AddAccount2](assets/limedrop-addaccount2.png)

  A - Select the realm for the account

	B - Diablo Account

	C - Diablo Account password

	D - Type specific character names, or leave it empty to log all

	E - Click "Add Row" if you want to add more than one account at a time

	F - Limedrop account password

	G - Click to begin logging accounts

**Note:** It is safe to log the same account by "adding" it through this interface. It will just update the files.

**Note:** Currently you _can not_ use Numpad 5 to manually log a character with Limedrop

#### Emergency Stop
You may notice that if you "stop" the GameAction profile that it immediately starts up again.

If you need to force the profile to stop you need to open the profile and erase the "tag" information. 

* Edit Profile
* Erase information in Tag
* Click Apply
* Stop the profile

**Note:** If you have queued many drops, you will need to clear it for each drop, or you will need to restart D2BSharp.

### Frequently Asked Questions
#### Will Limedrop steal my information?
No. The web page part of Limedrop only makes calls to the API running on your D2BS. Your account passwords are not stored directly in the web page. Also, it's open source so if you don't trust it you can always take a look at the code yourself!

#### Can it run side-by-side with my existing bots?
Yes. If you want to quickly try Limedrop you can copy it to a separate folder and configure it

#### Can I use my existing mule logs with Limedrop?
No. You will have to re-scan your existing mules in order to add them to the Limedrop Inventory

#### Will Limedrop automatically update my inventory after dropping items?
Yes.
