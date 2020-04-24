module.exports = {
  friendlyName: 'Emit',
  description: 'Emit wol.',
  fn: async function (inputs, exits) {
    let req = this.req,
      res = this.res,
      params = req.allParams(),
      mac = params.mac,
      ip = params.ip || undefined;
    await sails.helpers.wol.emit(mac, ip).switch({
      error: (err) => {
        return exits.error(err);
      },
      success: (info) => {
        return exits.success(info);
      }
    });
  }
};
