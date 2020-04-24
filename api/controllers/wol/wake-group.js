module.exports = {
  friendlyName: 'Wake group',
  description: 'Send hosts in group WOL packet',
  fn: async function () {
    let req = this.req,
      res = this.res,
      params = req.allParams(),
      id = params.id;
    await Group.findOne({id}, async (err, group) => {
      if (err) throw {error: err};
      await sails.helpers.wol.wakeGroup(group).switch({
        error: (err) => {
          throw {error: err};
        },
        success: (info) => {
          return info;
        }
      });
    });
  }
};
