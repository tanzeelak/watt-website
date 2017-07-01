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

  ms = metalsmith(__dirname) // the working directory
    .clean(true)            // clean the build directory
    .source('src/html/')    // the page source directory
    .destination('build/')  // the destination directory
    .use(markdown())        // convert markdown to HTML
    .use(debug(true))
    .build(function(err) {  // build the site
      if (err) throw err;   // and throw errors
    });
