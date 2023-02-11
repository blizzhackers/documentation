[general table of content](https://github.com/blizzhackers/documentation/#diablo-2-botting-system)

[kolbot table of content](https://github.com/blizzhackers/documentation/tree/master/kolbot/#kolbot)

---

## Code Editors (IDEs)

* [VSCode](https://code.visualstudio.com/)
* [Sublime Text](https://www.sublimetext.com/download)

---

## Syntax highlighting in VSCode (recommended)
 - By default .js files are recognized and have syntax highlighting.
 - Enable syntax highlighting for .dbj files:
   1) Open settings
   2) Search `Files: Associations`
   3) Click `Add Item`
   4) Enter `*.dbj` for the key and `javascript` for the value
   5) Click `OK`

  - Also highly recommended to install [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
---

## Syntax highlighting in Sublime Text
 - By default .js files are recognized and have syntax highlighting.
 - Enable syntax highlighting for .dbj files:
   1) Open one of the .dbj files
   2) Selecte `View` from the tabs
   3) Go down to `Syntax`
   4) Select `Open all with current extension as` then select `Javascript`
---

## Syntax highlighting in np++ (Not recommended)

Kolbot scripts are written in Javascript language. **.js** files are automatically highlighted for easier editing in [Notepad++](https://notepad-plus-plus.org/downloads/).
Specific kolbot .dbj and .dbl files have to be added to javascript style

* press **Settings** in Notepad++ toolbar and select **Style Configurator...**

* find Javascript in Language column

* add **dbl dbj nip** in User ext. field

* press **Save & Close** button

* restart Notepad++


![np++](assets/kolbot-np++styleconfigurator.png)