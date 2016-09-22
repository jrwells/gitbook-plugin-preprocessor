var scriptdir = './scripts';

function hook(config, scriptsarray, log, logmessage) {
    if (config && scriptsarray) {
        log.debug.ln(logmessage);
        for (var i = 0; i < scriptsarray.length; i++) {
            var s = scriptsarray[i];
            require(this.book.resolve(scriptdir + s));
        }
    }
}

function pageHook(page, config, scriptsarray, log, logmessage) {
    if (config && scriptsarray) {
        log.debug.ln(logmessage, page);
        for (var i = 0; i < scriptsarray.length; i++) {
            var s = scriptsarray[i];
            require(this.book.resolve(scriptdir + s));
        }
    }
}

module.exports = {
    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called after parsing the book, before generating output and pages.
        "init": function() {
            scriptdir = (this.options.pluginsConfig.scriptDir || scriptdir) + '/';
            hook(   this.options.pluginsConfig,
                    this.options.pluginsConfig.scripts.init,
                    this.log,
                    'Running init scripts'  );
        },

        // This is called before running the templating engine on the page.
        "page:before": function(page) {
            pageHook(   page,
                        this.options.pluginsConfig,
                        this.options.pluginsConfig.scripts.pageBefore,
                        this.log,
                        'Running page:before scripts for: '  );
            return page;
        },

        // This is called before outputting and indexing the page.
        "page": function(page) {
            pageHook(   page,
                        this.options.pluginsConfig,
                        this.options.pluginsConfig.scripts.page,
                        this.log,
                        'Running page scripts for: '  );
            return page;
        },

        // This is called after generating the pages, before copying assets, cover, ...
        "finish:before": function() {
            hook(   this.options.pluginsConfig,
                    this.options.pluginsConfig.scripts.finishBefore,
                    this.log,
                    'Running finish:before scripts...'  );
        },

        // This is called after everything else.
        "finish": function() {
            hook(   this.options.pluginsConfig,
                    this.options.pluginsConfig.scripts.finish,
                    this.log,
                    'Running finish scripts...'  );
        }
    }
};