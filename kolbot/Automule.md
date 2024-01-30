[General Table of Contents](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[Kolbot Table of Contents](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

# Automule

---

* [Step-by-Step Guide to Muling in Kolbot](#step-by-step-guide-to-muling-in-kolbot)
* [Multiple Mules and Multiple Realm Muling](#multiple-mules-and-multiple-realm-muling)
* [Torch & Anni Muling](#torch-anni-muling)

---

## Step-by-Step Guide to Muling in Kolbot

1. Open and configure MuleConfig.js found in kolbot/libs/systems/automule/config folder
   **These are examples corresponding to the manger image below.  Your settings should be different.**

![image](https://github.com/magace/documentation/assets/7795098/3e3afe6f-997f-4953-a8fb-fd4ff7bd51bb)

2. Open D2Bot# and click Add Profile icon

3. Input Profile Name, Diablo Path and use D2BotMule.dbj as Entry Script.  Profile Name should match muleProfile in MuleConfig.js

	Click OK. You're done.
![image](https://github.com/magace/documentation/assets/7795098/d9c97db9-6120-43b7-be07-24e5f941d4b5)

**Notes:**

You must have at least 2 CD Keys to use kolbot AutoMule.

The mule profile is automatically started and stopped so you don't need to do that yourself.

You can test muling by running one of the enabledProfiles and pressing Numpad 5 when in a game or right-clicking on a profile and select "mule profile".


## Multiple Mules and Multiple Realm Muling

The Mules object can take multiple sub-entries which are separated by a comma.

This makes it possible to use AutoMule on multiple realms or create custom muling rules (ie. which profile will use which mule).

Example config for muling on two realms: 

![image](https://github.com/magace/documentation/assets/7795098/e2f6a76d-9987-4e6d-b759-8d77853266a7)


The names of each sub-entry, must be different ("Mule1" and "Mule2" in the example).  

The settings for each sub-entry should use differnt names if they are on the running on the same same realm, muleProfile, accountPrefix, charPrfix.



## Torch Anni Muling

TorchAnniMule is used in conjunction with a profile running OrgTorch or CloneKilla script to exclusively mule Hellfire or Annihilius unique charms.

![image](https://github.com/magace/documentation/assets/7795098/85e146bf-df17-460c-9508-180f6a5760aa)


Configuration is the same as standard automule.
TorchAnniMules.js can be found in kolbot/libs/systems/automule/config folder.

## Final Notes
It is not recommended to mix torch mule accounts with regular automule accounts. For best results use a separate profile.

Continuous mule will greatly reduce the times the mule logs in reducing the chance of realm down.

