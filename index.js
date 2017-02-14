var scriptsdir = './scripts';

function hook(book, config, scriptsarray, log, logmessage) {
    if (config && scriptsarray) {
        log.debug.ln(logmessage);
        for (var i = 0; i < scriptsarray.length; i++) {
            var s = scriptsarray[i];
            delete require.cache[book.resolve(scriptsdir + s)];
            require(book.resolve(scriptsdir + s)).run(book);
        }
    }
}

function pageHook(book, page, config, scriptsarray, log, logmessage) {
    if (config && scriptsarray) {
        log.debug.ln(logmessage, page);
        for (var i = 0; i < scriptsarray.length; i++) {
            var s = scriptsarray[i];
            delete require.cache[book.resolve(scriptsdir + s)];
            require(book.resolve(scriptsdir + s)).run(book, page);
        }
    }
}

module.exports = {
    // Hook process during build
    hooks: {
        // For all the hooks, this represent the current generator

        // This is called after parsing the book, before generating output and pages.
        "init": function() {
            scriptsdir = (this.options.pluginsConfig.scriptsDir || scriptsdir) + '/';
            hook(   this.book,
                    this.options.pluginsConfig,
                    this.options.pluginsConfig.scripts.init,
                    this.log,
                    'Running init scripts'  );
        },

        // This is called before running the templating engine on the page.
        "page:before": function(page) {
            pageHook(   this.book,
                        page,
                        this.options.pluginsConfig,
                        this.options.pluginsConfig.scripts.pageBefore,
                        this.log,
                        'Running page:before scripts for: '  );
            return page;
        },

        // This is called before outputting and indexing the page.
        "page": function(page) {
            pageHook(   this.book,
                        page,
                        this.options.pluginsConfig,
                        this.options.pluginsConfig.scripts.page,
                        this.log,
                        'Running page scripts for: '  );
            return page;
        },

        // This is called after generating the pages, before copying assets, cover, ...
        "finish:before": function() {
            hook(   this.book,
                    this.options.pluginsConfig,
                    this.options.pluginsConfig.scripts.finishBefore,
                    this.log,
                    'Running finish:before scripts'  );
        },

        // This is called after everything else.
        "finish": function() {
            hook(   this.book,
                    this.options.pluginsConfig,
                    this.options.pluginsConfig.scripts.finish,
                    this.log,
                    'Running finish scripts'  );
        }
    }
};
