module.exports = {
  friendlyName: 'Wake group',
  description: 'Send hosts in group WOL packet',
  fn: async function (inputs, exits) {
    let req = this.req,
      res = this.res,
      params = req.allParams(),
      id = params.id;
    await Group.findOne({id}, async (err, group) => {
      if (err) return exits.error(err);
      await sails.helpers.wol.wakeGroup(group).switch({
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
