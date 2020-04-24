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
      hosts = group.hosts,
      messages = [];
    if (hosts === undefined || hosts.length < 1) return exits.success('Group has no hosts associated');
    hosts.forEach((host) => {
      sails.helpers.wol.wakeHost(host).switch({
        error: (err) => {
          return exits.error(err);
        },
        success: (info) => {
          messages.push(info);
        }
      });
    });
    messages.push({message: `WOL Packets sent to group: ${group.name}`});
    return exits.success({messages});
  }
};
