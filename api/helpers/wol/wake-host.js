module.exports = {
  friendlyName: 'Wake host',
  description: '',
  inputs: {
    host: {
      friendlyName: 'Host',
      description: 'The host we are trying to wake up',
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
    let host = inputs.host;
    for (var i = 0; i < host.macs.length; i++) {
      await sails.helpers.wol.emit(host.macs[i]);
    }
    return exits.success();
  }
};
