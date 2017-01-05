module.exports = function(sails) {
    var loader = require('sails-util-mvcsloader')(sails);
    // Load policies under ./api/policies and config under ./config
    loader.configure();

    return {
        initialize: function (next) {
            /*
                Load models under ./api/models
                Load controllers under ./api/controllers
                Load services under ./api/services
            */
            loader.inject(function (err) {
                return next(err);
            });
        }
    };
};