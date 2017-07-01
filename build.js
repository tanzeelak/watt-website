// basic build

'use strict';


function debug(logToConsole) {
    return function(files, metalsmith, done) {
        if (logToConsole) {
            console.log('\nMETADATA:');
            console.log(metalsmith.metadata());

            for (var f in files) {
                console.log('\nFILE:');
                console.log(files[f]);
            }
        }

        done();
    };
};


var
metalsmith = require('metalsmith'),
markdown   = require('metalsmith-markdown'),
layouts = require('metalsmith-layouts'),
handlebars = require('handlebars'),

ms = metalsmith(__dirname) // the working directory
.metadata({
    site: {
        name: 'Electroniq',
        description: "Electroniq is astrophysicist (and retro music enthusiast) Tara Himmels' blog."
    }
})
.clean(true)            // clean the build directory
.source('src/html/')    // the page source directory
.destination('build/')  // the destination directory
.use(markdown())        // convert markdown to HTML
.use(debug(true))
.use(layouts({
    engine: 'handlebars',
    directory: './layouts',
    default: 'article.html',
    pattern: ["*/*/*html","*/*html","*html"]
}))
.build(function(err) {  // build the site
    if (err) console.log(err);   // and throw errors
    else {console.log("Electroniq built!")}
});
