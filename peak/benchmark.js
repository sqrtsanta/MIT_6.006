'use strict';

var Benchmark = require('benchmark');
var Peak = require('./peak.js');

var suite = new Benchmark.Suite;

var dataset = [1, 2, 3, 4, 5, 6, 7, 8, 7, 6, 5, -1, -2 ,-3 ,-4 ,-5 ,-6 ,-7 ,-8, -9, -10];

suite
  .add('Peak#naive', function() {
    Peak.naive(dataset);
  })
  .add('Peak#binary', function() {
    Peak.binary(dataset);
  })
  .on('cycle', function(event) {
    console.log(String(event.target) + ' ' + event.target.stats.mean);
  })
  .run({ 'async': true });
