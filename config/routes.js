module.exports.routes = {
  '/wol': async (req, res, next) => {
    res.json('FOG WOL Plugin')
  },
  '/wol/send/:mac/:ip?': async (req, res, next) => {
    let params = req.allParams(),
      mac = params.mac;
    await sails.helpers.wol.emit(mac);
  },
  '/wol/host/:id': async (req, res, next) => {
    let params = req.allParams(),
      id = params.id,
      host = await Host.findOne({id}).populateAll();
    await sails.helpers.wol.wakeHost(host);
  },
  '/wol/group/:id': async (req, res, next) => {
    let params = req.allParams(),
      id = params.id,
      group = await Host.findOne({id}).populateAll();
    await sails.helpers.wol.wakeGroup(group);
  }
};
