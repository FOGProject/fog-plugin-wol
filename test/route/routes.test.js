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
  describe('/wol/send/host/:id test Helper::', function() {
    let host = {
      name: 'Test Host',
      macs: [
        '02:03:04:05:06:07',
        '00:01:02:03:04:05'
      ]
    };
    it ('Should return host wake message', function(done) {
      sails.helpers.wol.wakeHost(host).switch({
        error: (err) => {
          return done(err);
        },
        success: () => {
          return done();
        }
      });
    });
  });
  describe('/wol/send/group/:id test Helper::', function() {
    let group = {
      name: 'Test Group',
      hosts: [
        {
          name: 'Test Group Host',
          macs: [
            'FF:FF:FF:FF:FF:FF',
            'AF:AE:AD:AC:AB:AA'
          ]
        },
        {
          name: 'Test Group Host 2',
          macs: [
            'ab:cd:ef:01:23:45',
            '54:32:10:fe:dc:ba'
          ]
        }
      ]
    };
    it ('Should return group wake message', function(done) {
      sails.helpers.wol.wakeGroup(group).switch({
        error: (err) => {
          return done(err);
        },
        success: () => {
          return done();
        }
      });
    });
  })
});
