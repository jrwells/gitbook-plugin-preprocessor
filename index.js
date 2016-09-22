var scriptdir = './scripts/';
var filetype = '.js';

module.exports = {
    book : {

    },
    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called after parsing the book, before generating output and pages.
        "init": function() {
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.init) {
                var initscripts = this.options.pluginsConfig.scripts.init;
                for (s in initscripts) {
                    require(this.book.resolve(scriptdir + s + filetype));
                }
            }
        },

        // This is called before running the templating engine on the page.
        "page:before": function(page) {
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.pageBefore) {
                var pagebeforescripts = this.options.pluginsConfig.scripts.pageBefore;
                for (s in pagebeforescripts) {
                    require(this.book.resolve(scriptdir + s + filetype));
                }
            }
        },

        // This is called before outputting and indexing the page.
        "page": function(page) {
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.page) {
                var pagescripts = this.options.pluginsConfig.scripts.page;
                for (s in pagescripts) {
                    require(this.book.resolve(scriptdir + s + filetype));
                }
            }
        },

        // This is called after generating the pages, before copying assets, cover, ...
        "finish:before": function() {
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.finishBefore) {
                var finishbeforescripts = this.options.pluginsConfig.scripts.finishBefore;
                for (s in finishbeforescripts) {
                    require(this.book.resolve(scriptdir + s + filetype));
                }
            }
        },

        // This is called after everything else.
        "finish": function() {
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.finish) {
                var finishscripts = this.options.pluginsConfig.scripts.finish;
                for (s in finishscripts) {
                    require(this.book.resolve(scriptdir + s + filetype));
                }
            }
        }
    }
};
