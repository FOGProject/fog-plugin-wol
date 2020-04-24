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
      macs = host.macs;
    await macs.forEach(async (mac) => {
      await sails.helpers.wol.emit(mac, (err, info) => {
        if (err) throw {error: err};
      });
    });
    return exits.success(null, {message: `WOL Packet sent to host: ${host.name}`});
  }
};
