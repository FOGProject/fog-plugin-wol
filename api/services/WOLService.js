var wol = require('node-wol');

module.exports = {
  emit: function(mac, next) {
    wol.wake(mac, function(err) {
      if(err) throw err;
      next();
    });
  },
  emit: function(mac, ip, next) {
    if (ip === undefined) {
      WOLService.emit(mac, next);
      return;
    }
    
    wol.wake(mac, {address: ip}, function(err) {
      if(err) throw err;
      next();
    });    
  },
  wakeHost: function(host, next) {
    async.forEach(host.mac, function(item, cb) {
      WOLService.emit(item, cb);
    }, function (err) {
      if (err) throw err;
      next();
    });
  },
  wakeGroup: function(group, next) {
    async.forEach(group.host, function(item, cb) {
      WOLService.wakeHost(item, cb);
    }, function (err) {
      if (err) throw err;
      next();
    });
  },  
};