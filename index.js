var disseminate = require('./lib/disseminate');
var operator = require('./lib/operator');
var security = require('./lib/security');

var getSecurityKey = security.generateKey;

var securelyDisseminateData = function(data, key, cb) {
  if (!data || !key || typeof cb !== 'function') return;
  var encrypted = security.encrypt(data, key);
  disseminate.disseminate(encrypted, function(err, hash) {
    if (err) return cb(err);
    operator.setLink(key, hash);
    cb(null, hash);
  });
};

var securelyRetrieveData = function(key, cb) {
  if (!key || typeof cb !== 'function') return;
  var hash = operator.getLink(key);
  if (!hash) return cb('No link found for key');

  disseminate.retrieve(hash, function(err, data) {
    if (err) return cb(err);
    var decrypted = security.decrypt(data, key);
    cb(null, decrypted);
  });
};

module.exports = {
  getSecurityKey: getSecurityKey,
  securelyDisseminateData: securelyDisseminateData,
  securelyRetrieveData: securelyRetrieveData,
};

if (!module.parent) {
  var test = function() {
    var opts = {};
    for (var i = 2; i < process.argv.length; i += 2) {
      opts[process.argv[i].slice(2)] = process.argv[i + 1];
    }

    if (!opts.data && !opts.key) {
      opts.data = Math.random() + ' some random bits of data';
      console.log('new data = ', opts.data);
    }

    if (!opts.key) {
      opts.key = getSecurityKey();
      console.log('new key =', opts.key);
    } else {
      console.log('using key =', opts.key);
    }

    if (opts.data) {
      securelyDisseminateData(opts.data, opts.key, function(err, hash) {
        console.log('securely disseminated to =', hash);
      });
    } else {
      securelyRetrieveData(opts.key, function(err, data) {
        console.log('securely retrieved data =', JSON.stringify(data));
      });
    }
  };
  test();
}
