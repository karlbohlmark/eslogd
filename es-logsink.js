var elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

module.exports = function index(obj) {
    return client.index({
      index: 'logs',
      type: 'entry',
      body: obj
    })
}