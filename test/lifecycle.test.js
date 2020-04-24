const sails = require('sails'),
  supertest = require('supertest');

before(function(done) {
  this.timeout(11000);
  sails.lift({
    appPath: '../..',
    hooks: {
      'fog-plugin-wol': require('../'),
      grunt: false
    },
    log: {level: 'error'}
  }, function(err) {
    if (err) return done(err);
    done();
  });
});
after(function(done) {
  sails.lower(done);
});
