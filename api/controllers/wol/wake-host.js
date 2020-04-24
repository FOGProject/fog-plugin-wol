module.exports = {
  friendlyName: 'Wake Host',
  description: 'Send host WOL packet',
  fn: async function () {
    let req = this.req,
      res = this.res,
      params = req.allParams(),
      id = params.id;
    await Host.findOne({id}, async (err, host) => {
      if (err) throw {error: err};
      await sails.helpers.wol.wakeHost(host, (err, info) => {
        if (err) throw {error: err};
        return info;
      });
    });
  }
};
