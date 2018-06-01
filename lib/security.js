var crypto = require('crypto');

var decrypt = function(string, key) {
  if (!string || !key) return null;
  var decipher = crypto.createDecipher('aes-256-cbc', key);
  var decrypted = Buffer.concat([
    decipher.update(new Buffer(string, 'base64')),
    decipher.final(),
  ]);
  return JSON.parse(decrypted.toString());
};

var encrypt = function(data, key) {
  if (!data || !key) return null;
  var cipher = crypto.createCipher('aes-256-cbc', key);
  var encrypted = Buffer.concat([
    cipher.update(new Buffer(JSON.stringify(data)), 'utf8'),
    cipher.final(),
  ]);
  return encrypted.toString('base64');
};

var generateKey = function() {
  var random = new Buffer(crypto.randomBytes(16));
  return random.toString('base64');
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  generateKey: generateKey,
};

// run a test
if (!module.parent) {
  var test = function() {
    var key = generateKey();
    console.log('key       =', key);
    var data = 'some really long bits of data';
    console.log('data      =', data);
    var encrypted = encrypt(data, key);
    console.log('encrypted =', encrypted);
    var decrypted = decrypt(encrypted, key);
    console.log('decrypted =', decrypted);
  };
  test();
}
