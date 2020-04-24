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
describe('Route /wol test::', function() {
  it ('Should return plugin message', function(done) {
    supertest(sails.hooks.http.app)
    .get('/wol')
    .expect(200)
    .expect('{\n  "message": "FOG WOL Plugin"\n}', done);
  });
});
describe('Route /wol/send/:mac test::', function() {
  it ('Should return emit message', function(done) {
    supertest(sails.hooks.http.app)
    .get('/wol/send/01:02:03:04:05:06')
    .expect(200, done);
  });
})
