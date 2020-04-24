const supertest = require('supertest');
describe('Route tests::', function() {
  describe('/wol test::', function() {
    it ('Should return plugin message', function(done) {
      supertest(sails.hooks.http.app)
        .get('/wol')
        .expect(200)
        .expect('{\n  "message": "FOG WOL Plugin"\n}', done);
    });
  });
  describe('/wol/send/:mac test::', function() {
    it ('Should return emit message', function(done) {
      supertest(sails.hooks.http.app)
        .get('/wol/send/01:02:03:04:05:06')
        .expect(200)
        .expect('{\n  "message": "WOL request sent to MAC: 01:02:03:04:05:06"\n}', done);
    });
  });
  describe('/wol/send/host/:id test::', function() {
    it ('Should return host wake message', function(done) {
      return done();
    });
  });
  describe('/wol/send/group/:id test::', function() {
    it ('Should return group wake message', function(done) {
      return done();
    });
  })
});
