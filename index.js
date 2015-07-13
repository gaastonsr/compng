#! /usr/bin/env node

var fs = require('fs');
var path = require('path');
var glob = require('glob');
var PngQuant = require('pngquant');
var mkdirp = require('mkdirp');

var userArgs = process.argv.slice(2);
var directoryPath = userArgs[0];

try {
    var stats = fs.lstatSync(directoryPath);

    if (!stats.isDirectory()) {
        console.log('File is not a directory.');
        process.exit(1);
    }
}
catch (error) {
    console.log('Directory not found.');
    process.exit(1);
}

var absolutePath = getAbsolutePath(directoryPath);
var destinationDirectory = path.join(absolutePath, 'compressed');

try {
    mkdirp.sync(destinationDirectory);
} catch(error) {
    console.log('A directory with name "compressed" should exist in ' + absolutePath);
    process.exit(1);
}

glob(absolutePath + '/*.png', function(error, files) {
    compressFiles(files, process.exit);
});

function compressFiles(files, callback) {
        var filesQueue = files.slice(0); // clone array

        (function compressNext() {
            var file = filesQueue.splice(0, 1)[0]; // get first element and reduce queue by 1
            var writableStream = fs.createWriteStream(path.join(destinationDirectory, path.basename(file)));

            fs.createReadStream(file).pipe(new PngQuant([256, '--ext=.png'])).pipe(writableStream);

            writableStream.on('finish', function() {
                if (files.length === 0) {
                    callback();
                } else {
                    compressNext();
                }
            });
        })();
}

function getAbsolutePath(directoryPath) {
    var absolutePath = path.isAbsolute(directoryPath) ? directoryPath : path.join(process.cwd(), directoryPath);
    return path.normalize(absolutePath);
}
