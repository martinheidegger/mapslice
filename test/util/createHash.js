var test = require('tap').test
var createHash = require('../../lib/util/createHash')
var pairs = {
  'a': '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8',
  'b': 'e9d71f5ee7c92d6dc9e92ffdad17b8bd49418f98'
}

Object.keys(pairs).forEach(function (key) {
  test('createHash should return ' + pairs[key] + ' for ' + key, function (t) {
    t.equals(createHash(key), pairs[key])
    t.end()
  })
})
