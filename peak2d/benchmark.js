'use strict';

var Benchmark = require('benchmark');
var Peak2D = require('./peak2d.js');

var suite = new Benchmark.Suite;

var dataset = [
  [1, 1, 1, 1, 1],
  [2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3],
  [4, 4, 4, 4, 4],
  [5, 6, 7, 8, 7]
];

suite
  .add('Peak2D#naive', function() {
    Peak2D.naive(dataset);
  })
  .add('Peak2D#halfBinary', function() {
    Peak2D.halfBinary(dataset);
  })
  .on('cycle', function(event) {
    console.log(String(event.target) + ' ' + event.target.stats.mean);
  })
  .run({ 'async': true });
