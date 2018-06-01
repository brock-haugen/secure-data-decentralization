# Secure Data Decentralization

A proof of concept project for securely decentralizing data on IPFS

### Examples

To get started, try:

```bash
node index.js
```

That will generate a new key for you as well as desseminate a test string. Expected output:

```bash
new data =  0.43943891505546606 some random bits of data
new key = 82FazjAWS/QUJAuXOzaHuQ==
securely disseminated to = QmbqsT1zJE6AW5tGjeAULrW67BjzQ3xtoxUbpc8vbjto2D
```

That `key` can then be used to retrieve the data like so:

```bash
node index.js --key 82FazjAWS/QUJAuXOzaHuQ==
```

Which will output something like:

```bash
using key = 82FazjAWS/QUJAuXOzaHuQ==
securely retrieved data = "0.43943891505546606 some random bits of data"
```

To upload new data for your key, use:

```bash
node index.js --key 82FazjAWS/QUJAuXOzaHuQ== --data "some new data string"
```

NOTE: there is only ever _one_ link per `key` so uploading new data will overwrite the record for any previous data.
