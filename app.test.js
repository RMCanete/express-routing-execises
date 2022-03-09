const { findMean, findMedian, findMode } = require('./app');

describe("findMean", function() {
    it("finds the mean of an array of numbers", function() {
        expect(findMean([1,2,3])).toEqual(2)
    })
})

describe("findMedian", function() {
    it("finds the median of an array of numbers", function() {
        expect(findMedian([1,2,3])).toEqual(2)
    })
})

describe("findMode", function() {
    it("finds the mode of an array of numbers", function() {
        expect(findMode([1,2,2])).toEqual(2)
    })
})