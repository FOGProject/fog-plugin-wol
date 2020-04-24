module.exports = {
  friendlyName: 'Wake group',
  description: '',
  inputs: {
    group: {
      friendlyName: 'Group',
      description: 'The group we are trying to wake up',
      required: true,
      type: 'json'
    }
  },
  exits: {
    success: {
      description: 'All done.',
    }
  },
  fn:  async function (inputs, exits) {
    let group = inputs.group,
      hosts = group.hosts;
    await hosts.forEach(async (host) => {
      await sails.helpers.wol.wakeHost(host, async (err, info) => {
        if (err) throw {error: err};
      });
    });
    return exits.success(null, {message: `WOL Packets sent to group: ${group.name}`});
  }
};
