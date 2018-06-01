var request = require('request');

var ipfsUrl = 'https://ipfs.infura.io';

var disseminate = function(data, cb) {
  if (!data || typeof cb !== 'function') return;

  request.post(
    {
      url: ipfsUrl + ':5001/api/v0/add',
      formData: {
        file: new Buffer(data),
      },
    },
    function(err, resp) {
      if (err) cb(err);
      else
        try {
          cb(null, JSON.parse(resp.body).Hash);
        } catch (e) {
          cb(e);
        }
    },
  );
};

var retrieve = function(hash, cb) {
  if (!hash || typeof cb !== 'function') return;

  request.get(
    {
      url: ipfsUrl + '/ipfs/' + hash,
    },
    function(err, resp) {
      if (err) cb(err);
      else cb(null, resp.body);
    },
  );
};

module.exports = {
  disseminate,
  retrieve,
};

if (!module.parent) {
  var test = function() {
    var data = 'some bits of data to disseminate';
    console.log('data      =', data);
    disseminate(data, function(e, hash) {
      console.log('hash      =', hash);
      retrieve(hash, function(e2, retrieved) {
        console.log('retrieved =', retrieved);
      });
    });
  };
  test();
}
