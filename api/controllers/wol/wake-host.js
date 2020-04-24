module.exports = {
  friendlyName: 'Wake Host',
  description: 'Send host WOL packet',
  fn: async function (inputs, exits) {
    let req = this.req,
      res = this.res,
      params = req.allParams(),
      id = params.id;
    await Host.findOne({id}, async (err, host) => {
      if (err) return exits.error(err);
      await sails.helpers.wol.wakeHost(host).switch({
        error: (err) => {
          return exits.error(err);
        },
        success: (info) => {
          return exits.success(info);
        }
      });
    });
  }
};
