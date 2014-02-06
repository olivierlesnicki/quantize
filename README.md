quantize
========

Node.js module for color quantization, based on Leptonica.

Install
-------

	npm install quantize

Quick Overview
--------------

The function returns a color map you can use to map original pixels to the reduced palette.

###Example

`````javascript

var quantize = require('quantize');

// array of pixels as [R,G,B] arrays
var arrayOfPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]];
var maximumColorCount = 4;

var colorMap = quantize(arrayOfPixels, maximumColorCount);

colorMap.palette();
// [[204, 204, 204], [208,212,212], [188,196,188], [212,204,196]]

var arrayOfReducedPixels = myPixels.map(function(p) {
	return cmap.map(p);
});

arrayOfReducedPixels;
// [[188,196,188], [204,204,204], [208,212,212], [208,212,212], [204,204,204]]


colorMap.map();

`````

Author
------

* [Olivier Lesnicki](https://github.com/olivierlesnicki)

Contributors
------------

* [Nick Rabinowitz](https://github.com/nrabinowitz)
* [Mike Bostock] (https://github.com/mbostock)

License
-------

Licensed under the MIT License.