module.exports = function(sails) {
  var loader = require('sails-util-mvcsloader')(sails);
  // Load policies under ./api/policies and config under ./config
  loader.configure({
    config: __dirname + '/config'
  });

  return {
    initialize: function (next) {
      /**
       * Load helpers under ./api/helpers
       */
      loader.inject(
        {
          helpers: __dirname + '/api/helpers'
        },
        (err) => {
          return next(err);
        }
      );
    }
  };
};
