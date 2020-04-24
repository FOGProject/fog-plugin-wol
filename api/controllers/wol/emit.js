module.exports = {
  friendlyName: 'Emit',
  description: 'Emit wol.',
  fn: async function () {
    let req = this.req,
      res = this.res,
      params = req.allParams(),
      mac = params.mac,
      ip = params.ip || undefined;
    await sails.helpers.wol.emit(mac, ip).switch({
      error: (err) => {
        throw {error: err};
      },
      success: (info) => {
        return info;
      }
    });
  }
};
