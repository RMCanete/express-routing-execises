const express = require('express');
const ExpressError = require('./expressError')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* routes */


function findMean(nums){
    let num = 0
    let acc = 0
    for (let n of nums) {
        n = Number(n)
        num = num + n
        acc = acc + 1
    };
    mean = num / acc;
    
    return mean
}

app.get('/mean', function(req, res) {  
    if (!req.query.nums) {
        throw new ExpressError('You must pass a list of numbers separated by a comma!', 400)
      }
    let nums = req.query.nums.split(',');

    let result = {
        operation: "mean",
        result: findMean(nums)
      }
    
    return res.send(result);
});

function findMedian(nums){
    nums.sort(function (a, b) {return a - b});
    let median;
    let middle = Math.floor(nums.length/2);
    let first;
    let second;
    let total;

    if (nums.length % 2 === 0) {
        first = Number(nums[middle]);
        second = Number(nums[middle-1]);
        total = (first + second);
        median = total/2;
    } else {
        median = nums[middle];
    }
    return median
}

app.get('/median', function(req, res) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a list of numbers separated by a comma!', 400)
      }
    let nums = req.query.nums.split(',');
    nums = nums.sort(function (a, b) {return a - b});

    let result = {
        operation: "median",
        result: findMedian(nums)
    }
    
      return res.send(result);
  });

function findMode(nums){
    let counter = {};
    let mode;
    let total = [];

    for (let n of nums) {
        n = Number(n);
        total.push(n);
        counter[n] ++;
        };
    total.sort(function (a, b) {return a - b});
    mode = total.pop();
    
    return mode
}

app.get('/mode', function(req, res) {
    if (!req.query.nums) {
        throw new ExpressError('You must pass a list of numbers separated by a comma!', 400)
      }
    let nums = req.query.nums.split(',')

    let result = {
        operation: "mode",
        result: findMode(nums)
    }
    
    return res.send(result);
    
  });


// If no other route matches, respond with a 404
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404)
    return next(e)
  })
  
  
  // Error handler
app.use(function (err, req, res, next) { 
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;
  
    // set the status and alert the user
    return res.status(status).json({
      error: { message, status }
    });
  });
 
module.exports = {
    findMean,
    findMedian,
    findMode
};  

app.listen(3000, () => {
    console.log("Server running on port 3000")
  });
  