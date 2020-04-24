module.exports.routes = {
  '/wol':                              {action: 'wol'},
  '/wol/send/:mac/:ip?': async (req, res, next) => {
    let params = req.allParams(),
      mac = params.mac,
      ip = params.ip;
    sails.log.error(sails);
    return res.json(await sails.helpers.wol.emit(mac, ip));
  },
  '/wol/host/:id': async (req, res, next) => {
    let params = req.allParams(),
      id = params.id,
      host = await Host.findOne({id}).populateAll();
    await sails.helpers.wakeHost(host);
  },
  '/wol/group/:id': async (req, res, next) => {
    let params = req.allParams(),
      id = params.id,
      group = await Host.findOne({id}).populateAll();
    await sails.helpers.wakeGroup(group);
  }
};
