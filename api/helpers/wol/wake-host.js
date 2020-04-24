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
    macs.forEach((mac) => {
      sails.helpers.wol.emit(mac, ip).switch({
        error: (err) => {
          return exits.error(err);
        },
        success: (info) => {
          messages.push(info);
        }
      });
    });
    messages.push({message: `WOL Packet sent to host: ${host.name}`});
    return exits.success({messages});
  }
};
