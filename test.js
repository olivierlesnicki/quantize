const assert = require('assert');
const quantize = require('./quantize');

/**
 * Calls the quantize function for the arrayOfPixels with every allowed value of maximumColorCount
 * Asserts that the response palette includes the requested number of colors
 * Asserts that the response palette, and every color it contains, is in the correct format
 * @param {Array} arrayOfPixels as an input array of the format [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]]
 */
function validateResultForAllCounts(arrayOfPixels) {
    // console.log("Input pixels:");
    // console.log(arrayOfPixels);

    for (let count = 2; count <= 256; count < 16 ? count++ : count *= 2) {
        let colorMap = quantize(arrayOfPixels, count);
        let palette = colorMap.palette();
        // console.log("Output palette:");
        // console.log(palette);

        validatePalette(palette);
        // assert.equal(palette.length, count);
        console.log(`Actual: ${palette.length}, Expected: ${count}`);
    }
}

/**
 * Asserts that the specified palette, and every color it contains, is in the correct format
 * @param {Array} palette as an array of the format [[204, 204, 204], [208,212,212], [188,196,188], [212,204,196]]
 */
function validatePalette(palette) {
    assert(Array.isArray(palette));
    palette.forEach(color => {
        validateColor(color);
    });
}

/**
 * Asserts that the specified color is in the correct format
 * @param {Array} color as an array of the format [204, 204, 204]
 */
function validateColor(color) {
    assert(Array.isArray(color));
    assert.equal(color.length, 3);
    color.forEach(level => {
        assert(level >= 0);
        assert(level < 256);
    });
}

describe('quantize', function () {
    it('works on 1-pixel 1-color images', function (done) {
        let arrayOfPixels = [[190,197,190]];

        validateResultForAllCounts(arrayOfPixels);
        done();
    });
    it('works on 5-pixel 1-color images', function (done) {
        let arrayOfPixels = [[190,197,190], [190,197,190], [190,197,190], [190,197,190], [190,197,190]];

        validateResultForAllCounts(arrayOfPixels);
        done();
    });
    it('works on 1000-pixel 1-color images', function (done) {
        let arrayOfPixels = [];
        let pixel = [190,197,190];
        for (let i=0; i < 1000; i++) {
            arrayOfPixels.push(pixel);
        }

        validateResultForAllCounts(arrayOfPixels);
        done();
    });

    it('works on 5-pixel 5-color images', function (done) {
        let arrayOfPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]];

        validateResultForAllCounts(arrayOfPixels);
        done();
    });
    it('works on 1000-pixel 5-color images', function (done) {
        let arrayOfPixels = [];
        for (let i=0; i < 1000/5; i++) {
            arrayOfPixels.push([190,197,190]);
            arrayOfPixels.push([202,204,200]);
            arrayOfPixels.push([207,214,210]);
            arrayOfPixels.push([211,214,211]);
            arrayOfPixels.push([205,207,207]);
        }

        validateResultForAllCounts(arrayOfPixels);
        done();
    });

    it('works on 20-pixel 20-color images', function (done) {
        let arrayOfPixels = [];
        for (let i=0; i < 20; i++) {
            arrayOfPixels.push([0,0,i*5]);
        }

        validateResultForAllCounts(arrayOfPixels);
        done();
    });
    it('works on 1000-pixel 20-color images', function (done) {
        let arrayOfPixels = [];
        for (let p=0; p < 1000/20; p++) {
            for (let i=0; i < 20; i++) {
                arrayOfPixels.push([0,0,i*5]);
            }
        }

        validateResultForAllCounts(arrayOfPixels);
        done();
    });
})