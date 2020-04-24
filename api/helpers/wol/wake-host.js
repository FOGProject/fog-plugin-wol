module.exports = {
  friendlyName: 'Wake host',
  description: 'Perform wake host',
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
    let host = inputs.host,
      macs = host.macs,
      ip = host.ip || false,
      messages = [];
    if (macs === undefined || macs.length < 1) return exits.success('Host has no macs associated');
    for (var i = 0; i < macs.length; i++) {
      let mac = macs[i];
      await sails.helpers.wol.emit(mac, ip).intercept('error', (err) => {
        return exits.error(err);
      }).then((info) => {
        messages.push(info);
      });
    }
    messages.push({message: `WOL Packet sent to host: ${host.name}`});
    return exits.success({messages});
  }
};
