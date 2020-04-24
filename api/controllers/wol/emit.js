module.exports = {
  friendlyName: 'Emit',
  description: 'Emit wol.',
  fn: async function () {
    let req = this.req,
      res = this.res,
      params = req.allParams(),
      mac = params.mac,
      ip = params.ip;
    await sails.helpers.wol.emit(mac, (err, info) => {
      if (err) throw {error: err};
      return info;
    });
  }
};
