GitBook Script Preprocessor Plugin
==============

This a very simple GitBook Plugin that runs a set of scripts during the building of the GitBook.

## How to use

To add the preprocessor plugin in your book, add the `preprocessor` to the `book.json` for your book, and add the scripts you wish to run as configs in the `book.json` file.

Then install your plugins using `gitbook install`.

```
{
    "plugins": [
    	"preprocessor@git+https://github.com/jrwells/gitbook-plugin-preprocessor.git"
    ],
    "pluginsConfig": {
        "scripts": {
            "init": [
                "myinitscript.js"
            ],
            "pageBefore": [
            	"mypagebeforescript.js"
            ],
            "page": [
            	"mypagescript.js"
            ],
            "finishBefore": [
            	"myfinishbeforescript.js"
            ],
            "finish": [
            	"myfinishscript.js"
            ]
        },
        "scriptDir": "./aNewScriptsDir"
    }
}
```

If `scriptDir` is not set, the plugin looks in the `./scripts` directory by default.