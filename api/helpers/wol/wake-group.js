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
    let group = inputs.group;
    for (var i = 0; i < group.hosts.length; i++) {
      await sails.helpers.wol.emit(group.hosts.mac[i]);
    }
    return exits.success();
  }
};
