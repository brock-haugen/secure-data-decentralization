var fs = require('fs');
var path = require('path');

var stateSaveFile = path.join(__dirname, '../', 'operator-state');
var state = {};

var setState = function() {
  try {
    var raw = fs.readFileSync(stateSaveFile);
    state = JSON.parse(raw);
  } catch (e) {
    state = {};
  }
};
var saveState = function() {
  fs.writeFileSync(stateSaveFile, JSON.stringify(state));
};

var getLink = function(key) {
  return state[key];
};

var setLink = function(key, hash) {
  state[key] = hash;
  saveState();
};

setState();

module.exports = {
  getLink: getLink,
  setLink: setLink,
};

if (!module.parent) {
  var test = function() {
    var key = 'some-private-key';
    var link = 'QmSomeHash';
    console.log('key       =', key);
    console.log('link      =', link);
    setLink(key, link);
    setState();
    console.log('retrieved =', getLink(key));
  };
  test();
}
