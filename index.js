var scriptdir = './scripts/';

module.exports = {
    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called after parsing the book, before generating output and pages.
        "init": function() {
            this.log.debug.ln('Running init scripts...');
            scriptdir = this.options.pluginsConfig.scriptDir || scriptdir;
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.init) {
                var initscripts = this.options.pluginsConfig.scripts.init;
                for (var i = 0; i < initscripts.length; i++) {
                    var s = initscripts[i];
                    require(this.book.resolve(scriptdir + s));
                }
            }
        },

        // This is called before running the templating engine on the page.
        "page:before": function(page) {
            this.log.debug.ln('Running page:before script...' , page);
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.pageBefore) {
                var pagebeforescripts = this.options.pluginsConfig.scripts.pageBefore;
                for (var i = 0; i < pagebeforescripts.length; i++) {
                    var s = pagebeforescripts[i];
                    require(this.book.resolve(scriptdir + s));
                }
            }
        },

        // This is called before outputting and indexing the page.
        "page": function(page) {
            this.log.debug.ln('Running page script...' , page);
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.page) {
                var pagescripts = this.options.pluginsConfig.scripts.page;
                for (var i = 0; i < pagescripts.length; i++) {
                    var s = pagescripts[i];
                    require(this.book.resolve(scriptdir + s));
                }
            }
        },

        // This is called after generating the pages, before copying assets, cover, ...
        "finish:before": function() {
            this.log.debug.ln('Running finish:before script...');
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.finishBefore) {
                var finishbeforescripts = this.options.pluginsConfig.scripts.finishBefore;
                for (var i = 0; i < finishbeforescripts.length; i++) {
                    var s = finishbeforescripts[i];
                    require(this.book.resolve(scriptdir + s));
                }
            }
        },

        // This is called after everything else.
        "finish": function() {
            this.log.debug.ln('Running finish script...');
            if (this.options.pluginsConfig && this.options.pluginsConfig.scripts.finish) {
                var finishscripts = this.options.pluginsConfig.scripts.finish;
                for (var i = 0; i < finishscripts.length; i++) {
                    var s = finishscripts[i];
                    require(this.book.resolve(scriptdir + s));
                }
            }
        }
    }
};
