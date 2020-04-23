var Sails = require('sails').Sails;

describe('Basic tests ::', function() {

  // Var to hold a running sails app instance
  var sails;

  // Before running any tests, attempt to lift Sails
  before((done) => {
    // Hook timeout in 10 seconds
    this.timeout(11000);
    // Attempt to lift sails.
    Sails().lift({
      hooks: {
        'fog-plugin-wol': require('../'),
        grunt: false
      },
      log: {level: 'error'}
    }, function(err, _sails) {
      if (err) return done(err);
      sails = _sails;
      return done();
    });
  });
  after((done) => {
    if (sails) return sails.lower(done);
    return done();
  });

  it('sails does not crash', function() {
    return true;
  });
})
