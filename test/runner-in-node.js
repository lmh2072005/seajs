
// Usage:
//  snode runner-in-node.js

/**
 * @fileoverview Run test cases in node environment.
 * @author lifesinger@gmail.com (Frank Wang)
 */

define(function(require) {

  var test  =require('./test');

  var testCases = require('./config').testCases;
  var excludes = [
    'modules/alias'
    ,'modules/load'
    ,'modules/metadata'
    ,'modules/checkPotentialErrors'
  ];

  var currentTest = 0;

  // override for node
  test.next = function() {
    var testCase = testCases[currentTest++];

    if (excludes.indexOf(testCase) === -1 &&
        testCase.indexOf('modules/') === 0) {

      require('./' + testCase + '/program.js');

    } else {
      test.next();
    }
  };

  // start first
  test.next();

});
